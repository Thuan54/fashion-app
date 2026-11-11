export interface Profile {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  created_at: string;
}

export interface ApiComment {
  id: string;
  body: string;
  created_at: string;
  author: { display_name: string; username: string };
}

export interface ApiPost {
  id: string;
  author_id: string;
  title: string;
  description: string;
  image_url: string | null;
  tags: string[];
  category: string;
  comments_enabled: boolean;
  created_at: string;
  author: { display_name: string; username: string };
  like_count: number;
  liked_by_me: boolean;
  comments: ApiComment[];
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
}

export class ApiError extends Error {
  public readonly status: number;

  constructor(
    message: string,
    status: number,
  ) {
    super(message);
    this.status = status;
  }
}

export async function apiRequest<T>(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    accessToken?: string | null;
  } = {},
): Promise<T> {
  const headers = new Headers();
  if (options.body !== undefined) headers.set('Content-Type', 'application/json');
  if (options.accessToken) headers.set('Authorization', `Bearer ${options.accessToken}`);

  const response = await fetch(`/api${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  const responseText = await response.text();
  const responsePreview = responseText.replace(/\s+/g, ' ').trim().slice(0, 180);
  let result: ({ error?: string } & T) | null = null;
  if (responseText.trim()) {
    try {
      result = JSON.parse(responseText) as { error?: string } & T;
    } catch {
      const looksLikeHtml = /<!doctype html|<html[\s>]/i.test(responseText.slice(0, 500));
      throw new ApiError(
        looksLikeHtml
          ? `API request ${path} returned HTML instead of API data (HTTP ${response.status}). ${responsePreview}`
          : `API request ${path} returned an invalid response (HTTP ${response.status}). ${responsePreview}`,
        response.status,
      );
    }
  }
  if (!result) {
    throw new ApiError(
      `API request ${path} returned an empty response (HTTP ${response.status}). ${responsePreview}`,
      response.status,
    );
  }
  if (!response.ok) {
    throw new ApiError(result.error ?? 'The request could not be completed.', response.status);
  }
  return result;
}
