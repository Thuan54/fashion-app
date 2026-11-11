create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9_]{3,30}$'),
  display_name text not null,
  bio text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null constraint posts_author_id_fkey references public.profiles (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 90),
  description text not null default '',
  image_url text,
  tags text[] not null default '{}',
  category text not null default 'Style inspiration',
  comments_enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.post_likes (
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  author_id uuid not null constraint comments_author_id_fkey references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists comments_post_created_at_idx on public.comments (post_id, created_at);

grant all on public.profiles, public.posts, public.post_likes, public.comments to service_role;

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.post_likes enable row level security;
alter table public.comments enable row level security;

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  initial_name text;
begin
  initial_name := coalesce(
    nullif(new.raw_user_meta_data ->> 'display_name', ''),
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    nullif(new.raw_user_meta_data ->> 'name', ''),
    split_part(coalesce(new.email, 'creator'), '@', 1)
  );
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    left(lower(regexp_replace(initial_name, '[^a-zA-Z0-9]+', '_', 'g')), 21) || '_' || left(new.id::text, 8),
    initial_name
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute procedure public.create_profile_for_new_user();
