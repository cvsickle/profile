const ICONS = {
  github: `<svg viewBox="0 0 24 24"><path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.87 3.16 9 7.55 10.46.55.1.75-.24.75-.53
    0-.26-.01-.94-.02-1.85-3.07.67-3.72-1.48-3.72-1.48-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.68.08-.68
    1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.69-1.48-2.45-.28-5.03-1.23-5.03-5.46
    0-1.2.43-2.19 1.13-2.96-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13a10.4 10.4 0 0 1 5.5 0c2.1-1.43
    3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.71.77 1.13 1.76 1.13 2.96 0 4.24-2.59 5.17-5.05 5.44.39.34.74
    1.01.74 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53A10.52 10.52 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5z"/></svg>`,
  codeberg: `<svg viewBox="0 0 24 24"><path d="M12 1 1 8.27l4.2 12.9h13.6L23 8.27 12 1zm0 2.38 8.66 5.64-1.53 4.7H4.87
    l-1.53-4.7L12 3.38zm-3.9 8.79 3.9 4.99 3.9-4.99H8.1z"/></svg>`,
  forgejo: `<svg viewBox="0 0 24 24"><path d="M12 1C6.48 1 2 5.48 2 11c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48
    0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53
    1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98
    1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55
    1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01
    2.75 0 .26.18.58.69.48A9.99 9.99 0 0 0 22 11c0-5.52-4.48-10-10-10z"/></svg>`,
  email: `<svg viewBox="0 0 24 24"><path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z
    m1.5 2.5V17h17V6.5l-8.5 6.5-8.5-6.5zm.7-1L12 11l7.8-5.5H4.2z"/></svg>`
};

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
      a.innerHTML = `
        <span class="icon">${ICONS[link.icon] || ''}</span>
        <span class="label">${link.label}</span>
        <span class="arrow">&#8594;</span>
      `;
      container.appendChild(a);
    });
  } catch (err) {
    document.getElementById('tagline').textContent =
      'Engineer | Homelabber | Wannabe Developer | DevOps Enthusiast | Standard Nerd';
    console.error('Failed to load links.json', err);
  }
}

init();