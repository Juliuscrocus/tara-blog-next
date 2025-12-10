# Session Notes - Blog "Entre Deux"

## Date : 28 novembre 2025

---

## RÉSUMÉ DU PROJET

**Blog art de vivre franco-irlandais** pour Tara
- Thématiques : Café, Champagne & Vin, Gastronomie
- Villes couvertes : Paris, Dublin, London, Osaka
- Bilingue FR/EN avec dark mode

---

## CE QUI A ÉTÉ FAIT CETTE SESSION

### 1. Corrections esthétiques (sur l'ancien projet Vite)

| Modification | Fichier | Statut |
|--------------|---------|--------|
| Supprimer effet "allumage" images Hero au hover | Hero.css | ✅ |
| Séparer l'image de derrière (accent) | Hero.css | ✅ |
| Animation scroll indicator pulsation | Hero.css | ✅ |
| Correction conflit parallax/hover (variable CSS) | Hero.jsx + Hero.css | ✅ |
| Grossir trait losanges (1.5px → 2.5px) | Articles.css | ✅ |
| Icône centrée en absolute dans losanges | Articles.css | ✅ |
| Texte en bas au hover des losanges | Articles.css | ✅ |
| Décaler trait BrushStroke (+8px) | Cafes.css | ✅ |
| Points blancs en dark mode sur cartes | Cafes.jsx | ✅ |
| Tooltip hover only (pas de Popup au clic) | Cafes.jsx | ✅ |
| Enlever attribution Leaflet | Cafes.jsx | ✅ |
| Ajouter zoom +/- carte gourmande | Cafes.jsx | ✅ |
| Clic sur point → ouvre Google Maps | Cafes.jsx | ✅ |
| Encadré élégant "Me contacter" | Social.css | ✅ |
| Grain/texture fond subtil | index.css | ✅ |
| Style tooltip dark mode | Cafes.css | ✅ |

### 2. Ajout Osaka
- 15 nouveaux lieux ajoutés (5 cafés, 5 restaurants, 5 bars à vin)
- Coordonnées carte ajustées
- Texte changé : "Europe" → "monde"

### 3. Migration React (Vite) → Next.js

**Nouveau projet créé :** `/Users/juliendebuttet/tara-blog-next/`

| Tâche | Statut |
|-------|--------|
| Création projet Next.js 16 | ✅ |
| Copie des composants | ✅ |
| Ajout 'use client' aux composants | ✅ |
| Configuration next/font (Cormorant + Outfit) | ✅ |
| Meta tags SEO dans layout.jsx | ✅ |
| CafesWrapper pour Leaflet (SSR fix) | ✅ |
| Test fonctionnel | ✅ |

---

## STRUCTURE ACTUELLE

```
/Users/juliendebuttet/
├── tara-blog/              ← ANCIEN (React + Vite) - port 5173
└── tara-blog-next/         ← NOUVEAU (Next.js) - port 3003
    ├── app/
    │   ├── layout.jsx      (providers, fonts, meta)
    │   ├── page.jsx        (page accueil)
    │   └── globals.css
    ├── components/
    │   ├── Header.jsx/css
    │   ├── Hero.jsx/css
    │   ├── About.jsx/css
    │   ├── Articles.jsx/css
    │   ├── Cafes.jsx/css
    │   ├── CafesWrapper.jsx  ← NOUVEAU (fix SSR Leaflet)
    │   ├── Social.jsx/css
    │   ├── Footer.jsx/css
    │   └── BrushStroke.jsx
    ├── context/
    │   ├── ThemeContext.jsx
    │   └── LanguageContext.jsx
    ├── hooks/
    │   └── useScrollReveal.js
    ├── package.json
    ├── next.config.js
    └── jsconfig.json
```

---

## CE QU'IL RESTE À FAIRE

### Priorité haute
1. **Intégration Notion API** pour les articles
   - Créer base de données Notion "Articles"
   - Installer @notionhq/client
   - Créer route API `/api/articles`
   - Créer page dynamique `/articles/[slug]`
   - Implémenter ISR (Incremental Static Regeneration)

2. **Newsletter**
   - Ajouter section newsletter dans Social.jsx
   - Intégrer service (Buttondown, ConvertKit, ou Mailchimp)
   - Formulaire avec validation

3. **Formulaire contact fonctionnel**
   - Backend (Formspree ou API route Next.js)

### Priorité moyenne
4. **Analytics**
   - Umami (gratuit, self-hosted) ou Plausible

5. **Section Articles sur landing page**
   - Actuellement les catégories sont vides
   - Afficher les 3 derniers articles de chaque catégorie

6. **Images personnelles**
   - Remplacer images Unsplash par vraies photos

### Priorité basse
7. **Optimisations SEO**
   - Sitemap
   - robots.txt
   - Schema.org markup

8. **PWA** (optionnel)
   - Service worker
   - Manifest

---

## COMMANDES UTILES

```bash
# Ancien site (Vite)
cd /Users/juliendebuttet/tara-blog
npm run dev

# Nouveau site (Next.js)
cd /Users/juliendebuttet/tara-blog-next
npm run dev -- -p 3003
```

---

## POINTS D'ATTENTION

1. **Leaflet + SSR** : Le composant Cafes utilise un wrapper (`CafesWrapper.jsx`) car Leaflet accède à `window` qui n'existe pas côté serveur. Ne pas importer Cafes.jsx directement dans un composant serveur.

2. **Fonts** : Les fonts sont chargées via `next/font` dans `layout.jsx`, pas via Google Fonts CSS. Les variables CSS `--font-serif` et `--font-sans` sont définies dans le HTML.

3. **Dark mode** : Géré via `data-theme="dark"` sur `<html>`. Le ThemeContext persiste dans localStorage.

4. **Traductions** : Toutes dans `LanguageContext.jsx`. Structure : `translations[lang][section][key]`

5. **Données statiques** : Les 60 lieux (cafés, restaurants, bars) sont en dur dans `Cafes.jsx`. À migrer vers Notion ou Supabase plus tard si besoin.

---

## DÉCISIONS TECHNIQUES PRISES

| Question | Décision | Raison |
|----------|----------|--------|
| CMS | Notion API | Gratuit, l'utilisateur utilise déjà Notion |
| Framework | Next.js 16 (App Router) | SEO, ISR, meta tags |
| Styling | CSS pur (pas Tailwind) | Design custom existant |
| Cartes | Leaflet + react-leaflet | Déjà en place, gratuit |
| Fonts | Cormorant Garamond + Outfit | Design éditorial |

---

## CONTACT

Projet pour : Tara (blog art de vivre)
Développeur initial : Julien
