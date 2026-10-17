# Mieux-Être et Harmonie — site de Béatrice Desies

Site vitrine statique (HTML + CSS, sans framework) de Béatrice Desies, praticienne bien-être
à Saint-Étienne-de-Crossey (Isère) : réflexologie plantaire, shiatsu, bioénergétique Acmos,
nettoyage énergétique, sophrologie, élixirs floraux.

## Structure
- `index.html` — accueil : soins et tarifs, qui suis-je, infos pratiques, réservation, FAQ, contact
- `philosophie.html` — l'approche et la présentation des pratiques
- `assets/style.css` — styles communs (thème clair et sombre)
- `assets/main.js` — menu mobile et maquette de réservation (à remplacer par l'intégration Cal.com)
- `mentions-legales.html` — mentions légales (SIRET à compléter)
- `404.html` — page « introuvable »
- `assets/fonts/` — polices hébergées sur le site (aucun appel à Google)
- `_redirects` — redirections 301 des anciennes URL Wix (Cloudflare Pages)
- `_headers` — en-têtes de sécurité (CSP prête pour l'agenda Cal.com)
- `docs/` — notes de projet : SEO, hébergement, informations à demander à Béatrice

Les passages surlignés en doré (classe `.todo`) sont à confirmer avec Béatrice.

## Voir le site en local
Lancer `python3 -m http.server` puis aller sur http://localhost:8000.

## Mise en ligne
Cloudflare Pages, connecté à ce dépôt privé (voir `docs/hebergement.md`).
