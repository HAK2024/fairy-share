# Fairy Share App

## Setup

### Server

1. **Clone the Repository**

   - Clone this repository to your local machine using Git.

2. **Create a file named `.env` in the root of the server folder**

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

- When you want to down the container.

  ```bash
   docker-compose down
  ```

- Install all dependencies
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

## Running with dev mode

### Server

```bash
# development
npm run start
```

#### Test
- If you need migration

```bash
npm run prisma:migrate-test
```

```bash
# e2e tests
npm run test:e2e

# e2e tests watch mode
npm run test:e2e:watch

# e2e test only 1 file
npm run test:e2e src/user/test/user.e2e-spec.ts
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

```
cd client
npm run dev
```
URL: http://localhost:3000/

```
npm run sb:
```
Storybook: http://localhost:6006/

Lint

```
npm run lint
npm run lint:fix
```

Format

```
npm format
```
