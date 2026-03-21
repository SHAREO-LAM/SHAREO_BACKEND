# projet_annuel_poc

Ce projet est une API backend développée avec NestJS, qui met en place une gestion d'utilisateurs avec une mise à jour partielle des données en utilisant TypeORM (natif nestJS) et PostgreSQL.

## Technologies utilisées

- **NestJS** : Framework backend Node.js progressif
- **TypeORM** : ORM pour TypeScript et JavaScript
- **PostgreSQL** : Base de données relationnelle
- **Docker** : Conteneurisation de l'application et de la base de données
- **Swagger** : Documentation d'API interactive

## Fonctionnalités

- Création d'utilisateurs
- Consultation de tous les utilisateurs ou d'un utilisateur spécifique
- Mise à jour d'utilisateurs
- Mise à jour partielle d'utilisateurs
- Suppression d'utilisateurs

## Sécuriser un endpoint (JWT)

Pour vérifier que l'utilisateur est connecté et que son JWT n'a pas expiré, ajouter le guard sur l'endpoint :

```ts
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@CurrentUser() user: User) {
	return user;
}
```

## Installation et utilisation

### Local (avec PostgreSQL dans un container)

```bash
# Démarrage avec le postgres du container
docker-compose up --build

# API : http://localhost:3000/api
# Docs : http://localhost:3000/api/docs
# MinIO Console : http://localhost:9001
```

### Production / Sandbox (sur VM avec PostgreSQL existant)

```bash
# Définir les variables d'environnement
export DB_HOST=127.0.0.1
export DB_PASSWORD=<mot_de_passe>
export DB_NAME=shareo        # ou shareo_sb pour sandbox
export JWT_SECRET=<secret>

# Déployer juste le backend (sans postgres)
docker-compose -f docker-compose-backend.yml up -d
```

Le backend se connectera au PostgreSQL existant sur la machine hôte.

## Configuration S3 (images)

Le backend stocke maintenant les images sur un stockage S3-compatible pour :

- `domain.imageUrl`
- `company.logoUrl`

### Variables d'environnement S3

```bash
S3_BUCKET_NAME=shareo-media
S3_REGION=eu-west-3
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...

# Optionnel (laisser vide pour AWS S3)
S3_ENDPOINT=

# URL publique utilisée pour construire les URLs retournées en DB
S3_PUBLIC_BASE_URL=

# true pour MinIO/localstack, false pour AWS S3
S3_FORCE_PATH_STYLE=false

# Préfixes d'objets
S3_DOMAIN_IMAGES_PREFIX=domains
S3_COMPANY_LOGOS_PREFIX=companies
```

### Environnement Local (S3 local)

Le `docker-compose.yml` démarre :

- `minio` (S3 local)
- `minio-init` (création du bucket `shareo-media`)

Commande :

```bash
docker-compose up --build
```

Accès MinIO :

- API S3 : `http://localhost:9000`
- Console : `http://localhost:9001`
- Identifiants : `shareo / shareo123`

### Environnement Sandbox

Utilise un bucket dédié (ex: `shareo-media-sandbox`) et des credentials dédiés.

Exemple :

```bash
S3_BUCKET_NAME=shareo-media-sandbox
S3_REGION=eu-west-3
S3_ACCESS_KEY_ID=<sandbox_access_key>
S3_SECRET_ACCESS_KEY=<sandbox_secret_key>
S3_PUBLIC_BASE_URL=https://shareo-media-sandbox.s3.eu-west-3.amazonaws.com
S3_FORCE_PATH_STYLE=false
```

Si vous utilisez un provider S3-compatible (hors AWS), renseignez `S3_ENDPOINT`.

### Environnement Production

Même principe que sandbox, avec un bucket/credentials prod séparés.

Exemple :

```bash
S3_BUCKET_NAME=shareo-media-prod
S3_REGION=eu-west-3
S3_ACCESS_KEY_ID=<prod_access_key>
S3_SECRET_ACCESS_KEY=<prod_secret_key>
S3_PUBLIC_BASE_URL=https://shareo-media-prod.s3.eu-west-3.amazonaws.com
S3_FORCE_PATH_STYLE=false
```

## Endpoints upload images

### Domaine

- `POST /api/domain/:id/image` (multipart form-data, champ `file`)
- `DELETE /api/domain/:id/image`

### Entreprise

- `POST /api/company/:id/logo` (multipart form-data, champ `file`)
- `DELETE /api/company/:id/logo`

Contraintes upload :

- Types acceptés : `image/*`
- Taille max : `5MB`

## Accès

```bash
# API
http://localhost:3000/api

# Documentation Swagger
http://localhost:3000/api/docs
```

## Migrations

```bash
docker exec -it shareo_postgres psql -U postgres -d shareo
```

## Migrations

Les migrations TypeORM se lancent **automatiquement** au démarrage de l'application.

### Commandes

```bash
npm run migration:run      # Exécuter les migrations
npm run migration:generate -- <name>
npm run migration:revert   # Revert la dernière migration
```

## Persistance des données

Avec Docker Compose, les données PostgreSQL sont stockées dans un volume nommé `postgres_data` qui persiste même après `docker-compose down`. Elles sont restaurées automatiquement au prochain démarrage avec `docker-compose up`.
