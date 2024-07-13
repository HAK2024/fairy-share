# Fairy Share App

## Introduction

This application is designed to facilitate the management of daily tasks and financial responsibilities within a shared housing environment. It helps prevent conflicts by allowing roommates to share and allocate chores such as cleaning and trash disposal. Additionally, the app provides a visual means to split expenses incurred from shopping trips among roommates, ensuring fair distribution of tasks and costs.

## Features

### Sign-In Page

- **Access:** Users with an account can log in, while new users can create an account using a standard email or Google authentication.

<img src="./images/sign-in-page.png" alt="Sign-In Page" title="Sign-In Page" width="400" />

### Create House Page

- **Set Up:** Users can create a new house if they are not part of one. Includes setting up the house name, rules, and how expenses are displayed.
- **Single Membership:** Users can be part of only one house at a time.

<img src="./images/create-house-page.png" alt="Create House Page" title="Create House Page" width="400" />

### Overview Page

- **Today's Tasks & Weekly Tasks:** View tasks for the day and the upcoming week in a glance. Tasks can be checked off upon completion to update their status.
- **Reminders:** Past dues to roommates within the last three months are displayed as reminders.

<img src="./images/overview-page.png" alt="Overview Page" title="Overview Page" width="400" />

### Calendar Page

- **Task Registration:** Tasks are visible in the calendar, showing who is responsible and when. Users can add, edit, or delete tasks through modals which provide details about each task. Tasks are color-coded for quick identification.

<img src="./images/calendar-page.png" alt="Calendar Page" title="Calendar Page" width="400" />

### Expense Page

- **Expense Tracking:** View expenses from the past three months and register new expenses. Automatically calculates how much each roommate owes to another.
- **Expense Management:** Edit or delete expenses. Completed payments can be marked off. Choose between summarizing expenses at month's end or tracking them individually from the House Settings page.

<img src="./images/expense-page.png" alt="Expense Page" title="Expense Page" width="400" />

### House Info Page

- **House Rules & Roommate Info:** View and update house rules and roommate information.
- **Leave House:** Option available for users to exit the house.

<img src="./images/house-Info-page.png" alt="House Info Page" title="House Info Page" width="400" />

### Account Page

- **User Profile Management:** Users can view and update their personal information including avatar color, name, email, and password.

<img src="./images/account-page.png" alt="Account Page" title="Account Page" width="400" />

### House Settings Page

- **Admin Controls:** Accessible only by admins to add or edit house rules.
- **Display Settings for Expenses:** Toggle between summarizing expenses monthly or tracking them on a per-transaction basis.
- **Manage Members:** Add or remove members, grant or revoke admin rights. New members can join via a shared link.

<img src="./images/house-settings-page.png" alt="House Settings Page" title="House Settings Page" width="400" />

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
