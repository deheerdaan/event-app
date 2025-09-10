# Event App

A React-based event management application that allows users to create, view, edit, and delete events with categories and user management.

## Problem Statement & Solution

### The ID Type Consistency Problem

This application faced a critical data consistency issue with JSON Server's default behavior:

**The Problem:**

- JSON Server auto-generates **string IDs** for new entities (e.g., `"abc123"`, `"e9f3"`)
- When JSON Server writes data back to the file, it **converts ALL existing numeric IDs to strings** for type consistency
- This created a mixed data type scenario where the database contained both strings and numbers as IDs
- The React application expects **numeric IDs** for comparisons, filtering, and data relationships
- Result: Broken functionality for event filtering, user lookups, and category management

**Example of the Problem:**

```json
// Before creating a new category
{
  "categories": [
    { "id": 1, "name": "sports" },
    { "id": 2, "name": "games" }
  ]
}

// After creating a new category with enforced numeric ID
{
  "categories": [
    { "id": "1", "name": "sports" },    // ❌ Converted to string
    { "id": "2", "name": "games" },     // ❌ Converted to string
    { "id": 3, "name": "music" }        // ✅ Your numeric ID preserved
  ]
}
```

### The Solution: Custom JSON Server Middleware

Custom middleware server (`server.cjs`) that:

1. **Intercepts all write operations** (POST, PUT, PATCH, DELETE)
2. **Preserves the original data type structure** by storing a reference to the initial state
3. **Automatically fixes ID type conversions** after JSON Server processes requests
4. **Maintains consistent numeric IDs** throughout the entire database
5. **Works transparently** with the existing React application

The middleware ensures that:

- ✅ All entity IDs remain as numbers
- ✅ Foreign key relationships (createdBy, categoryIds) stay numeric
- ✅ No mixed data types in the database
- ✅ React app filtering and comparisons work correctly

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd event-app
```

2. Install dependencies:

```bash
npm install
```

### Running the Application

#### Option 1: Run Backend and Frontend Separately

1. **Start the custom JSON Server** (with ID preservation):

```bash
npm run server
```

This starts the backend on `http://localhost:3000` with the custom middleware that prevents ID type conversion.

2. **Start the React development server** (in a new terminal):

```bash
npm run dev
```

This starts the frontend on `http://localhost:5173`

#### Option 2: Run Both Servers Simultaneously

```bash
npm run dev:full
```

This command uses `concurrently` to run both the custom backend and frontend servers at once.

### Available Scripts

- `npm run dev` - Start Vite development server (frontend only)
- `npm run server` - Start custom JSON Server with ID preservation middleware
- `npm run server:original` - Start original JSON Server (for comparison/debugging)
- `npm run dev:full` - Start both backend and frontend simultaneously
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix