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
# Docs : http://localhost:3000/docs
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

## Accès

```bash
# API
http://localhost:3000/api

# Documentation Swagger
http://localhost:3000/docs
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
