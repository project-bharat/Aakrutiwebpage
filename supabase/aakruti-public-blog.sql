begin;

alter table public.blog_posts enable row level security;
grant select (title, slug, excerpt, content, featured_image, status, published_at)
on public.blog_posts to anon;

drop policy if exists "Aakruti public blog" on public.blog_posts;
drop policy if exists "Aakruti public blog published only" on public.blog_posts;
create policy "Aakruti public blog" on public.blog_posts
for select to anon using (status = 'published' and published_at <= now());
create policy "Aakruti public blog published only" on public.blog_posts
as restrictive for select to anon using (status = 'published' and published_at <= now());

commit;
