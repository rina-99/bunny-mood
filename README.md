# Mood Bunny 🐰

Une application moderne de suivi d'humeur avec authentification et synchronisation cloud.

## Fonctionnalités

- Suivi quotidien de l'humeur avec 6 états émotionnels
- Personnage animé réagissant à votre humeur
- Conseils de bien-être personnalisés
- Historique avec graphiques
- Notes personnelles
- Authentification utilisateur
- Synchronisation cloud avec Supabase
- Panneau d'administration
- Interface responsive

## Technologies

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Supabase (auth + database)
- Shadcn UI

## Installation

```bash
npm install
```

## Configuration

Créez un fichier `.env.local` :

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

Voir `SUPABASE_SETUP.md` pour la configuration complète.

## Développement

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Licence

MIT

