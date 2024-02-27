## Prerequisites

- Node.js (version specified in engines if applicable)
- npm (comes with Node.js)

## Setting Up the Development Environment

1. **Environment Variables**

   - Create a file named `.env` in the root of the server folder and update the variables to match your local environment settings.

   ```bash
   DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE?schema=public"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Database Setup**

   - Once the containers are running, you can set up the database schema and seed data using the Prisma CLI:

   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

4. **Running the Application**
   - Start the application in development mode by running:
   ```bash
   npm run start
   ```
   This command uses nodemon to automatically reload the server on code changes.

## Accessing the Application

- The application will be available at `http://localhost:8000`

## Additional Commands

- **Building the Project**

  ```bash
  npm run build
  ```

  Compiles TypeScript files to JavaScript in the `dist` directory.

- **Running Migrations**
  ```bash
  npm run prisma:migrate
  ```
  Applies database migrations to update the database schema.
