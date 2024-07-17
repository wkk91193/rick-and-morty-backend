# Rick and Morty Character Service

This project is a Node.js application built with TypeScript, Express, and Apollo Server to handle GraphQL requests. It integrates with the Rick and Morty API to fetch and manipulate character data. The application includes controllers, services, schema definitions, resolvers, validation middleware, and logging for monitoring.

## Features

- Fetch characters from the Rick and Morty API
- Fetch details of a specific character by ID
- Pagination support for character listing
- Sorting characters by name
- Filtering characters by species and status (alive, dead, unknown)
- Validation of incoming request parameters
- Comprehensive logging for monitoring and debugging

## Getting Started

### Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/rick-and-morty-character-service.git
   cd rick-and-morty-character-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

### Running Tests

To run the unit and integration tests:

```bash
npm test
```
