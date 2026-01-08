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

## Installation et utilisation

### Option 1 : Avec Docker (recommandé)

#### Prérequis

- Docker et Docker Compose installés

#### Démarrage

```bash
git clone https://github.com/Zastial/PA_POC_Backend
cd PA_POC_Backend

# Lancer l'application et la base de données
docker-compose up --build
```

#### Arrêt

```bash
docker-compose down
```

#### Variables d'environnement

Créer un fichier `.env` (optionnel, utilise les valeurs par défaut si absent) :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=shareo
NODE_ENV=development
```

## Accès

```bash
# API
http://localhost:3000/api

# Documentation Swagger
http://localhost:3000/docs
```

## Accès à la base de données

```bash
docker exec -it shareo_postgres psql -U postgres -d shareo
```

## Persistance des données

Avec Docker Compose, les données PostgreSQL sont stockées dans un volume nommé `postgres_data` qui persiste même après `docker-compose down`. Elles sont restaurées automatiquement au prochain démarrage avec `docker-compose up`.
