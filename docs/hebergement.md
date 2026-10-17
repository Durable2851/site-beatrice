# Hébergement et coûts

## Recommandation : environ 10 à 15 € par an au total

| Poste | Solution | Coût annuel |
|---|---|---|
| Hébergement du site | **Cloudflare Pages**, offre gratuite | 0 € |
| Code source | GitHub, dépôt privé | 0 € |
| Nom de domaine `mieux-etreetharmonie.com` | Cloudflare Registrar (prix coûtant) ou OVH | ≈ 10 à 15 € |
| Certificat HTTPS | Inclus chez Cloudflare | 0 € |
| Prise de rendez-vous | **Cal.com**, offre « Individuals » gratuite | 0 € |
| Adresse `contact@mieux-etreetharmonie.com` (facultatif) | Cloudflare Email Routing, qui renvoie vers Gmail | 0 € |
| Fiche Google (Google Business Profile) | Gratuit | 0 € |

Pour comparer : Wix impose un forfait payant pour utiliser son propre nom de domaine. Selon la formule,
cela fait en général entre 100 et 250 € par an.

## Pourquoi Cloudflare Pages plutôt que GitHub Pages
- GitHub Pages ne publie un dépôt **privé** qu'avec un abonnement payant, et ses conditions
  déconseillent un usage commercial.
- Cloudflare Pages se connecte à un dépôt GitHub privé, accepte un site professionnel, n'a pas
  de limite de bande passante sur l'offre gratuite et fournit le HTTPS.
- Chaque modification poussée sur GitHub met le site à jour automatiquement en environ une minute.
- Netlify et Vercel sont possibles, mais l'offre gratuite de Vercel est réservée à un usage non
  commercial, et Netlify compte désormais l'usage en crédits.

## Garder le nom de domaine actuel (important pour le référencement)
1. Retrouver chez qui le domaine est enregistré : Wix ou un autre registraire. Il faut les identifiants du compte Wix.
2. Si c'est Wix : déverrouiller le domaine et demander le code de transfert (« auth code »), puis le
   transférer vers Cloudflare Registrar. Le transfert ajoute un an de renouvellement, ce qui est normal.
3. Brancher le domaine sur Cloudflare Pages, vérifier le site, **puis seulement** résilier l'abonnement Wix.
4. Le fichier `_redirects` renvoie les anciennes adresses Wix (`/quisuije`, `/mecontacter`…)
   vers les nouvelles pages, pour que Google conserve l'historique du site.

## Réservation : Cal.com
- Gratuit pour une personne, avec autant de types de rendez-vous qu'on veut (un par soin,
  chacun avec sa durée), des rappels automatiques par e-mail et une synchronisation avec Google Agenda.
- Le paiement en ligne n'est pas activé : le client règle sur place.
- Le calendrier s'intègre directement dans la section « Rendez-vous » de la page d'accueil.
- Autre option : la page de réservation de Google Agenda est gratuite avec le Gmail de Béatrice, mais
  limitée à une seule page, et les rappels par e-mail sont payants.
