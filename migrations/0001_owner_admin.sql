-- Aakruti owner dashboard schema. Apply with: npx wrangler d1 migrations apply aakruti-content --remote
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Living', description TEXT NOT NULL DEFAULT '',
  material TEXT NOT NULL DEFAULT '', dimensions TEXT NOT NULL DEFAULT '',
  images TEXT NOT NULL DEFAULT '[]', featured INTEGER NOT NULL DEFAULT 0 CHECK(featured IN (0,1)),
  published INTEGER NOT NULL DEFAULT 0 CHECK(published IN (0,1)), sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_products_public ON products(published,featured,sort_order);
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY, customer_name TEXT NOT NULL, review TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK(rating BETWEEN 1 AND 5), photo_url TEXT NOT NULL DEFAULT '',
  approved INTEGER NOT NULL DEFAULT 0 CHECK(approved IN (0,1)), featured INTEGER NOT NULL DEFAULT 0 CHECK(featured IN (0,1)),
  sort_order INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_reviews_public ON reviews(approved,featured,sort_order);
CREATE TABLE IF NOT EXISTS site_content (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL DEFAULT '',
  interest TEXT NOT NULL, details TEXT NOT NULL DEFAULT '', product TEXT NOT NULL DEFAULT '',
  page TEXT NOT NULL DEFAULT '/', source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','contacted','closed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status,created_at);
