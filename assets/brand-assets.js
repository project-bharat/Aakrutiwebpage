(function () {
  const config = window.AAKRUTI_SUPABASE_CONFIG;
  if (!config?.url) return;
  const base = config.url.replace(/\/$/, '') + '/storage/v1/object/public/brand-assets/website/';
  const imagesByFile = new Map();
  document.querySelectorAll('[data-brand-asset]').forEach(img => {
    const file = img.dataset.brandAsset;
    if (!imagesByFile.has(file)) imagesByFile.set(file, []);
    imagesByFile.get(file).push(img);
  });
  imagesByFile.forEach((images, file) => {
    const replacement = new Image();
    replacement.onload = () => {
      images.forEach(element => {
        element.setAttribute(element.tagName === 'LINK' ? 'href' : 'src', replacement.src);
      });
    };
    replacement.src = base + encodeURIComponent(file);
  });
})();
