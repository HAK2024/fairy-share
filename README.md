# share-house-management

# share-house-management

## Prerequisites

- Docker
- Docker Compose

## Setting Up the Development Environment

1. **Clone the Repository**

   - Clone this repository to your local machine using Git.

2. **Environment Variables**

   - Create a file named `.env` in the root directory of the project and update the variables to match your local environment settings.

   ```bash
   POSTGRES_USER=YOUR_USERNAME
   POSTGRES_PASSWORD=YOUR_PASSWORD
   POSTGRES_DB=YOUR_DATABASE
   ```

3. **Start the Docker Containers**

   - Run the following command in the root directory of the project to start all services defined in the `docker-compose.yml` file:

   ```bash
   docker-compose up -d
   ```

   This command will start the PostgreSQL database container as specified in the Docker Compose file.
