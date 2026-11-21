(async function () {
  const section = document.getElementById('blog');
  const list = document.getElementById('blog-articles');
  const config = window.AAKRUTI_SUPABASE_CONFIG;
  if (!section || !config?.url || !window.supabase) return;
  const client = window.supabase.createClient(config.url, config.publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
  try {
    const {data, error} = await client.from('blog_posts')
      .select('title,slug,excerpt,content,featured_image,published_at')
      .eq('status', 'published').lte('published_at', new Date().toISOString())
      .order('published_at', {ascending: false});
    if (error) throw error;
    if (!data?.length) return;

    for (const post of data) {
      const article = document.createElement('article');
      article.className = 'bg-charcoal rounded-xl border border-white/10 p-5 sm:p-7';
      if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) article.id = 'article-' + post.slug;
      if (typeof post.featured_image === 'string' && /^https:\/\//i.test(post.featured_image)) {
        const image = document.createElement('img');
        image.src = post.featured_image;
        image.alt = '';
        image.loading = 'lazy';
        image.className = 'w-full max-h-80 object-cover rounded-lg mb-5';
        image.addEventListener('error', () => image.remove(), {once:true});
        article.append(image);
      }
      const heading = document.createElement('h3');
      heading.className = 'font-serif text-2xl sm:text-3xl';
      heading.textContent = post.title;
      const date = document.createElement('time');
      date.dateTime = post.published_at;
      date.className = 'block text-sm text-gray-500 mb-2';
      date.textContent = new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium', timeZone: 'Asia/Kolkata'
      }).format(new Date(post.published_at));
      article.append(date, heading);
      if (post.excerpt) {
        const excerpt = document.createElement('p');
        excerpt.className = 'mt-2 text-sm text-gray-400';
        excerpt.textContent = post.excerpt;
        article.append(excerpt);
      }
      const details = document.createElement('details');
      details.className = 'mt-4';
      const summary = document.createElement('summary');
      summary.className = 'cursor-pointer font-semibold';
      summary.textContent = 'Read article';
      summary.setAttribute('aria-label', 'Read ' + post.title);
      const content = document.createElement('p');
      content.className = 'whitespace-pre-wrap break-words mt-4 leading-7';
      content.textContent = post.content;
      details.append(summary, content);
      article.append(details);
      list.append(article);
    }
    section.hidden = false;
    document.querySelectorAll('[data-blog-nav]').forEach(link => { link.hidden = false; });
    const linked = document.getElementById(location.hash.slice(1));
    if (linked?.parentElement === list) {
      linked.querySelector('details').open = true;
      linked.scrollIntoView();
    }
  } catch (error) {
    console.warn('Could not load published articles:', error);
  }
})();
