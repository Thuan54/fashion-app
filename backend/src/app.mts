// Keep this entrypoint ESM on Vercel, whose function loader may ignore package type metadata.
// import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import { createClient } from '@supabase/supabase-js';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const requiredEnv = [
  'SUPABASE_URL',
  'SUPABASE_PUBLISHABLE_KEY',
  'SUPABASE_SECRET_KEY',
  'SUPABASE_JWKS_URL',
] as const;

const app = express();

class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

function getServices() {
  const missing = requiredEnv.filter((name) => !process.env[name]?.trim());
  if (missing.length) {
    throw new HttpError(
      503,
      `API is not configured. Set these Vercel environment variables: ${missing.join(', ')}.`,
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL!;
  try {
    new URL(supabaseUrl);
    new URL(process.env.SUPABASE_JWKS_URL!);
  } catch {
    throw new HttpError(503, 'SUPABASE_URL or SUPABASE_JWKS_URL is not a valid URL.');
  }

  return {
    createAuthClient: () => createClient(supabaseUrl, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      auth: { autoRefreshToken: false, persistSession: false },
    }),
    database: createClient(supabaseUrl, process.env.SUPABASE_SECRET_KEY!, {
      auth: { autoRefreshToken: false, persistSession: false },
    }),
    jwks: createRemoteJWKSet(new URL(process.env.SUPABASE_JWKS_URL!)),
    issuer: `${supabaseUrl.replace(/\/$/, '')}/auth/v1`,
  };
}

// app.use(cors({
//   origin: (process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173')
//     .split(',')
//     .map((origin) => origin.trim()),
// }));

app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    configured: requiredEnv.every((name) => Boolean(process.env[name]?.trim())),
  });
});

app.post('/api/auth/signup', async (req, res, next) => {
  try {
    const { email, password, displayName } = req.body ?? {};
    if (typeof email !== 'string' || !email.includes('@')) {
      throw new HttpError(400, 'Enter a valid email address.');
    }
    if (typeof password !== 'string' || password.length < 8) {
      throw new HttpError(400, 'Password must be at least 8 characters.');
    }
    if (typeof displayName !== 'string' || !displayName.trim() || displayName.length > 80) {
      throw new HttpError(400, 'Display name is required and must be 80 characters or fewer.');
    }

    const { data, error } = await getServices().createAuthClient().auth.signUp({
      email: email.trim(),
      password,
      options: { data: { display_name: displayName.trim() } },
    });
    if (error) throw new HttpError(400, error.message);
    res.status(201).json({
      session: data.session,
      user: data.user ? { id: data.user.id, email: data.user.email } : null,
      requiresEmailConfirmation: !data.session,
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};
    if (typeof email !== 'string' || typeof password !== 'string' || !password) {
      throw new HttpError(400, 'Email and password are required.');
    }
    const { data, error } = await getServices().createAuthClient().auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) throw new HttpError(401, error.message);
    res.json({
      session: data.session,
      user: { id: data.user.id, email: data.user.email },
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body ?? {};
    if (typeof refreshToken !== 'string' || !refreshToken) {
      throw new HttpError(400, 'A refresh token is required.');
    }
    const { data, error } = await getServices().createAuthClient().auth.refreshSession({
      refresh_token: refreshToken,
    });
    if (error || !data.session || !data.user) {
      throw new HttpError(401, error?.message ?? 'Your session has expired. Please sign in again.');
    }
    res.json({
      session: data.session,
      user: { id: data.user.id, email: data.user.email },
    });
  } catch (error) {
    next(error);
  }
});

const requireUser: express.RequestHandler = async (req, res, next) => {
  const authorization = req.header('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Sign in to continue.' });
    return;
  }

  try {
    const services = getServices();
    const { payload } = await jwtVerify(authorization.slice('Bearer '.length), services.jwks, {
      issuer: services.issuer,
      audience: 'authenticated',
    });
    if (typeof payload.sub !== 'string') {
      throw new HttpError(401, 'Invalid access token.');
    }
    res.locals.userId = payload.sub;
    res.locals.userClaims = payload;
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({ error: error.message });
      return;
    }
    console.error('Authentication token verification failed:', error);
    res.status(401).json({ error: 'Your session is invalid or expired. Please sign in again.' });
  }
};

async function optionalUserId(authorization: string | undefined) {
  if (!authorization) return null;
  if (!authorization.startsWith('Bearer ')) {
    throw new HttpError(401, 'Invalid authorization header.');
  }
  try {
    const services = getServices();
    const { payload } = await jwtVerify(authorization.slice('Bearer '.length), services.jwks, {
      issuer: services.issuer,
      audience: 'authenticated',
    });
    if (typeof payload.sub !== 'string') throw new HttpError(401, 'Invalid access token.');
    return payload.sub;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(401, 'Your session is invalid or expired. Please sign in again.');
  }
}

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
const parsePostId = (value: string | string[] | undefined) => {
  if (typeof value !== 'string' || !isUuid(value)) {
    throw new HttpError(400, 'Invalid post ID.');
  }
  return value;
};

app.get('/api/me', requireUser, async (_req, res, next) => {
  try {
    const database = getServices().database;
    
    
    const { data: existingProfile, error: lookupError } = await database
      .from('profiles')
      .select('id, username, display_name, bio, created_at')
      .eq('id', res.locals.userId)
      .maybeSingle();
    
    if (lookupError) {
      if (lookupError.code === 'PGRST205' || lookupError.code === '42P01') {
        throw new HttpError(
          503,
          'The Supabase profiles table is missing. Run backend/supabase/schema.sql in the Supabase SQL Editor.',
        );
      }
      throw lookupError;
    }
    if (existingProfile) {
      res.json(existingProfile);
      return;
    }

    const claims = res.locals.userClaims as Record<string, unknown>;
    const rawMetadata = claims.user_metadata;
    const metadata = rawMetadata && typeof rawMetadata === 'object'
      ? rawMetadata as Record<string, unknown>
      : {};
    const emailName = typeof claims.email === 'string' ? claims.email.split('@')[0] : '';
    const displayName = [
      metadata.display_name,
      metadata.full_name,
      metadata.name,
      emailName,
    ].find((value): value is string => typeof value === 'string' && value.trim().length > 0)
      ?.trim()
      .slice(0, 80) ?? 'Creator';
    const usernameBase = displayName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 21) || 'creator';
    const username = `${usernameBase}_${String(res.locals.userId).replace(/-/g, '').slice(0, 8)}`;

    const { data: createdProfile, error: insertError } = await database
      .from('profiles')
      .insert({
        id: res.locals.userId,
        username,
        display_name: displayName,
        bio: '',
      })
      .select('id, username, display_name, bio, created_at')
      .single();
    if (insertError) {
      if (insertError.code === 'PGRST205' || insertError.code === '42P01') {
        throw new HttpError(
          503,
          'The Supabase profiles table is missing. Run backend/supabase/schema.sql in the Supabase SQL Editor.',
        );
      }
      if (insertError.code === '23505') {
        const { data: concurrentProfile, error: retryError } = await database
          .from('profiles')
          .select('id, username, display_name, bio, created_at')
          .eq('id', res.locals.userId)
          .maybeSingle();
        if (retryError) throw retryError;
        if (concurrentProfile) {
          res.json(concurrentProfile);
          return;
        }
      }
      throw insertError;
    }
    res.status(200).json(createdProfile);
  } catch (error) {
    next(error);
  }
});

app.patch('/api/me', requireUser, async (req, res, next) => {
  try {
    const { displayName, username, bio } = req.body ?? {};
    if (typeof displayName !== 'string' || !displayName.trim() || displayName.length > 80) {
      throw new HttpError(400, 'Display name is required and must be 80 characters or fewer.');
    }
    if (typeof username !== 'string' || !/^[a-z0-9_]{3,30}$/.test(username)) {
      throw new HttpError(400, 'Username must be 3–30 characters using lowercase letters, numbers, or underscores.');
    }
    if (typeof bio !== 'string' || bio.length > 280) {
      throw new HttpError(400, 'Bio must be 280 characters or fewer.');
    }

    const { data, error } = await getServices().database
      .from('profiles')
      .update({
        display_name: displayName.trim(),
        username,
        bio: bio.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', res.locals.userId)
      .select('id, username, display_name, bio, created_at')
      .single();
    if (error) {
      if (error.code === '23505') throw new HttpError(409, 'That username is already taken.');
      throw error;
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

const postSelection = `
  id, author_id, title, description, image_url, tags, category, comments_enabled, created_at,
  author:profiles!posts_author_id_fkey(display_name, username),
  post_likes(user_id),
  comments(id, body, created_at, author:profiles!comments_author_id_fkey(display_name, username))
`;

app.get('/api/posts', async (req, res, next) => {
  try {
    const userId = await optionalUserId(req.header('authorization'));
    const { data, error } = await getServices().database
      .from('posts')
      .select(postSelection)
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    res.json((data ?? []).map((post) => {
      const likes = post.post_likes ?? [];
      return {
        ...post,
        post_likes: undefined,
        like_count: likes.length,
        liked_by_me: userId ? likes.some((like) => like.user_id === userId) : false,
      };
    }));
  } catch (error) {
    next(error);
  }
});

app.post('/api/posts', requireUser, async (req, res, next) => {
  try {
    const { title, description, imageUrl, tags, category, commentsEnabled } = req.body ?? {};
    if (typeof title !== 'string' || !title.trim() || title.length > 90) {
      throw new HttpError(400, 'A title of 1–90 characters is required.');
    }
    if (typeof description !== 'string' || description.length > 3000) {
      throw new HttpError(400, 'Description must be 3,000 characters or fewer.');
    }
    if (imageUrl !== undefined && imageUrl !== null && imageUrl !== '') {
      if (typeof imageUrl !== 'string') throw new HttpError(400, 'Image URL must be a URL.');
      try {
        const image = new URL(imageUrl);
        if (!['http:', 'https:'].includes(image.protocol)) throw new Error();
      } catch {
        throw new HttpError(400, 'Image URL must be a valid HTTP or HTTPS URL.');
      }
    }
    if (tags !== undefined && (!Array.isArray(tags) || tags.length > 12 ||
      tags.some((tag: unknown) => typeof tag !== 'string' || tag.length > 40))) {
      throw new HttpError(400, 'Tags must be a list of up to 12 short strings.');
    }
    if (commentsEnabled !== undefined && typeof commentsEnabled !== 'boolean') {
      throw new HttpError(400, 'commentsEnabled must be a boolean.');
    }

    const { data, error } = await getServices().database
      .from('posts')
      .insert({
        author_id: res.locals.userId,
        title: title.trim(),
        description: description.trim(),
        image_url: imageUrl || null,
        tags: (tags ?? []).map((tag: string) => tag.trim()).filter(Boolean),
        category: typeof category === 'string' ? category.trim().slice(0, 60) : 'Style inspiration',
        comments_enabled: commentsEnabled ?? true,
      })
      .select(postSelection)
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

app.put('/api/posts/:postId/like', requireUser, async (req, res, next) => {
  try {
    const postId = parsePostId(req.params.postId);
    const { data: post, error: postError } = await getServices().database
      .from('posts')
      .select('id')
      .eq('id', postId)
      .maybeSingle();
    if (postError) throw postError;
    if (!post) throw new HttpError(404, 'Post not found.');

    const { error } = await getServices().database.from('post_likes').upsert(
      { post_id: postId, user_id: res.locals.userId },
      { onConflict: 'post_id,user_id', ignoreDuplicates: true },
    );
    if (error) throw error;
    res.json({ liked: true });
  } catch (error) {
    next(error);
  }
});

app.delete('/api/posts/:postId/like', requireUser, async (req, res, next) => {
  try {
    const postId = parsePostId(req.params.postId);
    const { error } = await getServices().database
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', res.locals.userId);
    if (error) throw error;
    res.json({ liked: false });
  } catch (error) {
    next(error);
  }
});

app.post('/api/posts/:postId/comments', requireUser, async (req, res, next) => {
  try {
    const postId = parsePostId(req.params.postId);
    const { body } = req.body ?? {};
    if (typeof body !== 'string' || !body.trim() || body.length > 2000) {
      throw new HttpError(400, 'Comment must be 1–2,000 characters.');
    }
    const { data: post, error: postError } = await getServices().database
      .from('posts')
      .select('comments_enabled')
      .eq('id', postId)
      .maybeSingle();
    if (postError) throw postError;
    if (!post) throw new HttpError(404, 'Post not found.');
    if (!post.comments_enabled) throw new HttpError(403, 'Comments are disabled for this post.');

    const { data, error } = await getServices().database
      .from('comments')
      .insert({
        post_id: postId,
        author_id: res.locals.userId,
        body: body.trim(),
      })
      .select('id, body, created_at, author:profiles!comments_author_id_fkey(display_name, username)')
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'API endpoint not found.' });
});

app.use(((error: unknown, _req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message });
    return;
  }
  console.error('API request failed:', error);
  const message = process.env.NODE_ENV === 'production'
    ? 'The request could not be completed. Please try again.'
    : error instanceof Error
      ? error.message
      : 'Unexpected backend error. Check the API terminal for details.';
  res.status(500).json({ error: message });
}) satisfies ErrorRequestHandler);

export default app;
