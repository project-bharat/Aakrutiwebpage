begin;

-- Keep any existing category names, IDs, publication states and product links.
with additions (name, slug, description) as (
  values
    ('Modular Kitchens', 'modular-kitchens', 'Made-to-order kitchen cabinetry, drawers and storage.'),
    ('Puja Units', 'puja-units', 'Custom home mandirs and puja cabinets.'),
    ('Bathroom Vanities', 'bathroom-vanities', 'Made-to-order vanity cabinets and bathroom storage.')
), current_order as (
  select coalesce(max(sort_order), 0) as last_sort_order from public.categories
)
insert into public.categories (name, slug, description, sort_order, is_active)
select additions.name, additions.slug, additions.description,
       (current_order.last_sort_order + (row_number() over (order by additions.slug)) * 10)::integer, true
from additions cross join current_order
where not exists (
  select 1 from public.categories as existing
  where lower(existing.slug) = additions.slug or lower(existing.name) = lower(additions.name)
)
on conflict do nothing;

-- The public catalogue uses the anon role. Grant only the columns it reads
-- and keep draft records private even if older permissive policies exist.
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;

grant select (id, name, is_active, sort_order) on public.categories to anon;
grant select (id, name, category_id, short_description, description, featured_image, sort_order, is_active) on public.products to anon;
grant select (product_id, image_url, sort_order) on public.product_images to anon;

drop policy if exists "Aakruti public categories" on public.categories;
drop policy if exists "Aakruti public categories active only" on public.categories;
create policy "Aakruti public categories"
on public.categories for select to anon using (is_active);
create policy "Aakruti public categories active only"
on public.categories as restrictive for select to anon using (is_active);

drop policy if exists "Aakruti public products" on public.products;
drop policy if exists "Aakruti public products active only" on public.products;
create policy "Aakruti public products"
on public.products for select to anon using (is_active);
create policy "Aakruti public products active only"
on public.products as restrictive for select to anon using (is_active);

drop policy if exists "Aakruti public product photos" on public.product_images;
drop policy if exists "Aakruti public product photos active only" on public.product_images;
create policy "Aakruti public product photos"
on public.product_images for select to anon
using (exists (select 1 from public.products where id = product_id and is_active));
create policy "Aakruti public product photos active only"
on public.product_images as restrictive for select to anon
using (exists (select 1 from public.products where id = product_id and is_active));

-- The website/ folder is created when the first image is uploaded.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('brand-assets', 'brand-assets', true, 5242880, array['image/png'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Aakruti admins manage website brand assets" on storage.objects;
create policy "Aakruti admins manage website brand assets"
on storage.objects for all to authenticated
using (
  bucket_id = 'brand-assets'
  and (storage.foldername(name))[1] = 'website'
  and exists (
    select 1 from public.admin_profiles
    where id = (select auth.uid()) and is_admin = true
  )
)
with check (
  bucket_id = 'brand-assets'
  and (storage.foldername(name))[1] = 'website'
  and exists (
    select 1 from public.admin_profiles
    where id = (select auth.uid()) and is_admin = true
  )
);

commit;
