const ICONS = {
  github: `<svg viewBox="0 0 24 24"><path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.87 3.16 9 7.55 10.46.55.1.75-.24.75-.53
    0-.26-.01-.94-.02-1.85-3.07.67-3.72-1.48-3.72-1.48-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.68.08-.68
    1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.69-1.48-2.45-.28-5.03-1.23-5.03-5.46
    0-1.2.43-2.19 1.13-2.96-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13a10.4 10.4 0 0 1 5.5 0c2.1-1.43
    3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.71.77 1.13 1.76 1.13 2.96 0 4.24-2.59 5.17-5.05 5.44.39.34.74
    1.01.74 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53A10.52 10.52 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5z"/></svg>`,

  codeberg: `<svg viewBox="0 0 512 512">
    <circle cx="256" cy="256" r="256" fill="#2185d0"/>
    <defs>
      <linearGradient id="cbShard" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#eaf6ff" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#9fd3ff" stop-opacity="0.95"/>
      </linearGradient>
    </defs>
    <polygon points="270,120 40,430 400,430" fill="#ffffff"/>
    <polygon points="270,120 400,430 300,430" fill="url(#cbShard)"/>
  </svg>`,

  forgejo: `<svg viewBox="0 0 100 100">
    <defs>
      <linearGradient id="fjOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff9a1f"/>
        <stop offset="100%" stop-color="#f2600c"/>
      </linearGradient>
      <linearGradient id="fjRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#cf2b1e"/>
        <stop offset="100%" stop-color="#8f1414"/>
      </linearGradient>
    </defs>
    <path d="M70,20 C55,20 52,28 52,36" fill="none" stroke="url(#fjOrange)" stroke-width="9" stroke-linecap="round"/>
    <path d="M70,48 C55,48 52,55 52,63 C52,76 50,82 32,82" fill="none" stroke="url(#fjRed)" stroke-width="9" stroke-linecap="round"/>
    <circle cx="70" cy="18" r="9" fill="none" stroke="url(#fjOrange)" stroke-width="6"/>
    <circle cx="70" cy="48" r="9" fill="none" stroke="url(#fjRed)" stroke-width="6"/>
    <circle cx="30" cy="82" r="9" fill="none" stroke="url(#fjRed)" stroke-width="6"/>
  </svg>`,

  email: `<svg viewBox="0 0 24 24"><path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z
    m1.5 2.5V17h17V6.5l-8.5 6.5-8.5-6.5zm.7-1L12 11l7.8-5.5H4.2z"/></svg>`
};

// Icons that already carry their own brand colors (don't tint with --accent)
const MULTICOLOR_ICONS = new Set(['codeberg', 'forgejo']);

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
      if (MULTICOLOR_ICONS.has(link.icon)) a.classList.add('icon-multicolor');
      a.href = link.url;
      a.style.setProperty('--accent', link.color || '#89b4fa');
      if (link.url.startsWith('http')) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML = `
        <span class="icon">${ICONS[link.icon] || ''}</span>
        <span class="label">${link.label}</span>
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