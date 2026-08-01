async function init() {
  try {
    const res = await fetch('links.json', { cache: 'no-store' });
    const data = await res.json();

    document.getElementById('name').textContent = data.name || 'Corey Van Sickle';
    document.getElementById('tagline').textContent = data.tagline || '';
    document.getElementById('year').textContent = new Date().getFullYear();

    const container = document.getElementById('links');
    container.innerHTML = '';

    (data.links || []).forEach(link => {
      const a = document.createElement('a');
      a.className = 'link-btn';
      a.href = link.url;
      a.style.setProperty('--accent', link.color || '#89b4fa');
      if (link.url.startsWith('http')) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }

      const icon = document.createElement('img');
      icon.className = 'icon';
      icon.src = link.icon;
      icon.alt = '';
      icon.loading = 'lazy';
      icon.decoding = 'async';

      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = link.label;

      a.appendChild(icon);
      a.appendChild(label);
      container.appendChild(a);
    });
  } catch (err) {
    document.getElementById('tagline').textContent =
      'Engineer | Homelabber | Wannabe Developer | DevOps Enthusiast | Standard Nerd';
    console.error('Failed to load links.json', err);
  }
}

init();