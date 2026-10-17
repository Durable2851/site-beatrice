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
