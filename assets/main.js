const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// En-tête qui se resserre au défilement
const header = document.querySelector('.site-header');
const onScrollHeader = () => header && header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScrollHeader, { passive: true });
onScrollHeader();

// Apparition douce des blocs au défilement
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in'));
}

// Crêtes de la Chartreuse en parallaxe
const ridgeLayers = document.querySelectorAll('.ridges [data-depth]');
if (ridgeLayers.length && !reduceMotion) {
  let ticking = false;
  const move = () => {
    const y = Math.min(window.scrollY, 900);
    ridgeLayers.forEach(l => { l.style.transform = `translateY(${-y * Number(l.dataset.depth)}px)`; });
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true });
}

// Compteur « 23 ans » quand il apparaît
document.querySelectorAll('[data-count]').forEach(el => {
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const target = Number(el.dataset.count);
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const t0 = performance.now();
    const step = now => {
      const k = Math.min((now - t0) / 1600, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: 0.6 });
  io.observe(el);
});

// Poussières de lumière qui montent lentement dans le ciel du héros
const canvas = document.querySelector('.motes');
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  let w, h, motes = [], running = true;
  const color = () => getComputedStyle(document.documentElement).getPropertyValue('--gold').trim() || '#ad873a';
  let tint = color();
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(40, w / 30));
    motes = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: 0.8 + Math.random() * 2.2,
      vy: 0.12 + Math.random() * 0.3, sway: Math.random() * Math.PI * 2, a: 0.15 + Math.random() * 0.45,
    }));
  };
  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = tint;
    for (const m of motes) {
      m.y -= m.vy; m.sway += 0.01; m.x += Math.sin(m.sway) * 0.25;
      if (m.y < -10) { m.y = h + 10; m.x = Math.random() * w; }
      ctx.globalAlpha = m.a * Math.min(1, m.y / (h * 0.3));
      ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(draw);
  };
  resize(); draw();
  window.addEventListener('resize', resize);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { tint = color(); });
  new IntersectionObserver(([e]) => { const was = running; running = e.isIntersecting; if (running && !was) draw(); }).observe(hero);
}

// Menu mobile
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
}

// Maquette de réservation : sera remplacée par l'agenda Cal.com intégré
const booker = document.getElementById('booker');
if (booker) {
  const SOINS = [
    { id: 'reflexo', label: 'Réflexologie plantaire', prix: '55 €' },
    { id: 'shiatsu', label: 'Shiatsu', prix: '60 €' },
    { id: 'acmos', label: 'Bilan bioénergétique', prix: '110 €' },
    { id: 'nettoyage', label: 'Nettoyage énergétique', prix: '65 €' },
    { id: 'sophro', label: 'Sophrologie', prix: '50 €' },
  ];
  const HEURES = ['9 h 00', '10 h 30', '14 h 00', '15 h 30', '17 h 00'];
  const fmtJour = new Intl.DateTimeFormat('fr-FR', { weekday: 'short' });
  const fmtLong = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  const chip = (name, value, text, checked, disabled) =>
    `<label class="chip"><input type="radio" name="${name}" value="${value}"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''}><span>${text}</span></label>`;

  document.getElementById('soin-chips').innerHTML =
    SOINS.map((s, i) => chip('soin', s.id, s.label, i === 0)).join('');

  // 12 prochains jours ouvrés (dimanche fermé)
  const days = [];
  const d = new Date(); d.setHours(0, 0, 0, 0);
  while (days.length < 12) { d.setDate(d.getDate() + 1); if (d.getDay() !== 0) days.push(new Date(d)); }
  document.getElementById('days').innerHTML = days.map((day, i) =>
    `<label class="chip day"><input type="radio" name="day" value="${i}"${i === 1 ? ' checked' : ''}><span><small>${fmtJour.format(day).replace('.', '')}</small><b>${day.getDate()}</b></span></label>`
  ).join('');

  // Créneaux déjà pris : pseudo-aléatoire stable par jour
  const taken = (dayIdx, h) => ((days[dayIdx].getDate() * 7 + h * 3) % 5) === 0;
  const renderSlots = () => {
    const di = Number(booker.day.value);
    const html = HEURES.map((h, hi) => chip('slot', h, h, false, taken(di, hi))).join('');
    document.getElementById('slots').innerHTML = html;
    const first = booker.querySelector('input[name="slot"]:not(:disabled)');
    if (first) first.checked = true;
  };
  const renderSummary = () => {
    const s = SOINS.find(x => x.id === booker.soin.value);
    const slot = booker.querySelector('input[name="slot"]:checked');
    const day = days[Number(booker.day.value)];
    document.getElementById('summary-text').innerHTML = slot
      ? `<strong>${s.label}</strong> · ${fmtLong.format(day)} à ${slot.value}<br>${s.prix}, réglés sur place`
      : 'Choisissez un horaire.';
  };
  booker.addEventListener('change', e => {
    if (e.target.name === 'day') renderSlots();
    renderSummary();
    document.getElementById('confirm').hidden = true;
  });
  booker.addEventListener('submit', e => {
    e.preventDefault();
    const box = document.getElementById('confirm');
    box.textContent = "Ceci est une maquette : aucun rendez-vous n'a été pris. Dans la version en ligne, le créneau s'inscrira dans l'agenda de Béatrice et vous recevrez un e-mail de confirmation.";
    box.hidden = false;
  });
  renderSlots();
  renderSummary();
}
