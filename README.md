# Fairy Share App

## Setup

### Server

1. **Clone the Repository**

   - Clone this repository to your local machine using Git.

#### Environment Variables

- Create a file named `.env` in the root of the server folder and update the variables to match your local environment settings.

  ```bash
  DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE?schema=public"
  POSTGRES_USER=YOUR_USERNAME
  POSTGRES_PASSWORD=YOUR_PASSWORD
  POSTGRES_DB=YOUR_DATABASE
  ```

3. **Start the Docker Containers**

   - Run the following command in the server directory to start all services defined in the `docker-compose.yml` file:

   ```bash
   docker-compose up -d
   ```

   When you want to down the container.

```bash
 docker-compose down
```

This command will start the PostgreSQL database container as specified in the Docker Compose file.

```bash
$ npm install
```

- If you haven't install Nest CLI,

```bash
npm i -g @nestjs/cli
```

#### Database Setup

- Once the containers are running, you can set up the database schema and seed data using the Prisma CLI:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### Client

```
cd client
npm install
```

## Running

### Server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

#### Nest CLI command

```bash
# Generate a new CRUD resource
 nest g resource <name> [options]

# Generate a module declaration
 nest g module <name> [options]

 # Generate a module controller
 nest g controller <name> [options]

  # Generate a module service
 nest g service <name> [options]
```

### Client

Dev Mode: http://localhost:3000/

```
cd client
npm run dev
```

Storybook: http://localhost:6006/

```
npm run sb:
```

Lint

```
npm run lint
npm run lint:fix
```

Format

```
npm format
```
