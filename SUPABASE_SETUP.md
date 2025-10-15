<<<<<<< HEAD
# Configuration Supabase

## Étape 1 : Créer un projet Supabase

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez le mot de passe de la base de données

## Étape 2 : Récupérer les clés API

Dans Settings > API, copiez :
- Project URL
- anon public key

Ajoutez-les dans `.env.local` :

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Étape 3 : Créer les tables

Dans SQL Editor, exécutez :

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  mood TEXT NOT NULL CHECK (mood IN ('happy', 'sad', 'calm', 'anxious', 'excited', 'tired')),
  date DATE NOT NULL,
  timestamp BIGINT NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX idx_mood_entries_date ON mood_entries(date);
CREATE INDEX idx_mood_entries_timestamp ON mood_entries(timestamp DESC);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

git add .
git commit -m "Fix: installed Supabase client 🐰📦"
git push
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own moods"
  ON mood_entries FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own moods"
  ON mood_entries FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own moods"
  ON mood_entries FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own moods"
  ON mood_entries FOR DELETE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Étape 4 : Configurer l'authentification

Dans Authentication > Providers :
- Activez Email
- Désactivez "Confirm email" pour le développement

## Étape 5 : Installer et lancer

```bash
npm install @supabase/supabase-js
npm run dev
```
=======
# Configuration Supabase

## Étape 1 : Créer un projet Supabase

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez le mot de passe de la base de données

## Étape 2 : Récupérer les clés API

Dans Settings > API, copiez :
- Project URL
- anon public key

Ajoutez-les dans `.env.local` :

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Étape 3 : Créer les tables

Dans SQL Editor, exécutez :

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  mood TEXT NOT NULL CHECK (mood IN ('happy', 'sad', 'calm', 'anxious', 'excited', 'tired')),
  date DATE NOT NULL,
  timestamp BIGINT NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX idx_mood_entries_date ON mood_entries(date);
CREATE INDEX idx_mood_entries_timestamp ON mood_entries(timestamp DESC);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own moods"
  ON mood_entries FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own moods"
  ON mood_entries FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own moods"
  ON mood_entries FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own moods"
  ON mood_entries FOR DELETE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Étape 4 : Configurer l'authentification

Dans Authentication > Providers :
- Activez Email
- Désactivez "Confirm email" pour le développement

## Étape 5 : Installer et lancer

```bash
npm install @supabase/supabase-js
npm run dev
```
>>>>>>> 20b1089115b95b89fafe8a3615222f709771b270
