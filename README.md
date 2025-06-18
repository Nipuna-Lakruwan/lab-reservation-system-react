# BCI Campus Lab Reservation System

A comprehensive system for managing laboratory reservations at BCI Campus. This web application allows students, lecturers, and administrators to efficiently schedule and manage lab resources across the campus.

![BCI Campus Lab Reservation System](/lab-management-system/public/login-page.png)

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Features and User Roles](#features-and-user-roles)
- [Development Guidelines](#development-guidelines)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

The BCI Campus Lab Reservation System is designed to streamline the process of reserving laboratory resources across all departments. The system serves three primary user roles: administrators, lecturers, and students, each with specific permissions and features tailored to their needs.

### Key Features

- **Role-based access control** for administrators, lecturers, and students
- **Interactive lab reservation calendar** with real-time availability tracking
- **Approval workflow** for reservation requests with notifications
- **Lab equipment inventory management** for each laboratory
- **Reporting and analytics** for tracking lab utilization rates
- **Mobile responsive design** for access on any device

## System Architecture

The BCI Campus Lab Reservation System follows a modern client-server architecture:

- **Frontend**: React single-page application built with Vite
- **UI Components**: Custom components styled with Tailwind CSS
- **State Management**: React hooks and context API
- **Routing**: React Router for navigation
- **API Communication**: Fetch API/Axios for backend communication

## Technology Stack

### Frontend

- **React 18+**: UI library
- **Vite**: Build tool and development server
- **React Router 6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library
- **ESLint/Prettier**: Code quality and formatting

### Development Tools

- **Git**: Version control
- **npm/yarn**: Package management
- **VS Code**: Recommended editor with extensions for React and Tailwind

## Getting Started

### Prerequisites

- Node.js (v16.0 or higher)
- npm (v7.0 or higher) or yarn (v1.22 or higher)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nipuna-Lakruwan/lab-reservation-system-react.git
   cd lab-system/lab-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file to configure your development environment.

### Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

This will launch the application in development mode, accessible at [http://localhost:5173](http://localhost:5173).

### Building for Production

Create a production build:

```bash
npm run build
# or
yarn build
```

Preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
lab-management-system/
├── public/               # Static assets including BCI Campus logo
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── admin/        # Admin-specific components
│   │   ├── lecturer/     # Lecturer-specific components
│   │   ├── student/      # Student-specific components
│   │   └── shared/       # Shared components across roles
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin pages
│   │   ├── lecturer/     # Lecturer pages
│   │   ├── student/      # Student pages
│   │   └── auth/         # Authentication pages
│   ├── contexts/         # React contexts for state management
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

## Features and User Roles

### Admin Features

- **Dashboard**: Overview of lab usage and pending requests across BCI Campus
- **User Management**: Add, edit, and manage all user accounts
- **Lab Management**: Configure all campus labs, equipment, and availability
- **Request Management**: Approve or reject reservation requests
- **Settings**: Configure system settings and access control
- **Audit Logs**: Track all system activities for accountability

### Lecturer Features

- **Dashboard**: Overview of upcoming reservations and recent activities
- **Request Reservations**: Book labs for teaching sessions
- **View Reservations**: Track status of reservation requests
- **Approved Sessions**: View all approved lab sessions

### Student Features

- **Dashboard**: Overview of personal bookings and available labs
- **View Labs**: Browse available laboratory spaces at BCI Campus
- **Book Lab**: Request lab reservations for student projects
- **My Bookings**: Track personal reservation status
- **Reservation History**: View past reservations

## Development Guidelines

### Code Style

- Follow the ESLint and Prettier configurations provided in the project
- Use functional components with hooks
- Implement proper error handling
- Write meaningful component and function names
- Add JSDoc comments for complex functions

### Component Structure

- Keep components focused on a single responsibility
- Extract reusable logic into custom hooks
- Use the following component template:

```jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component description
 */
const ComponentName = ({ prop1, prop2 }) => {
  // State and hooks

  // Event handlers

  // Rendering
  return (
    <div>
      {/* JSX content */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

### State Management

- Use React's Context API for global state
- Use local component state for UI-specific state
- Consider using reducers for complex state logic

## API Integration

The frontend communicates with a RESTful API server (to be implemented). During development, mock data is used to simulate API responses.

For API integration, use the `services` directory to organize API calls by feature:

```javascript
// Example API service
const fetchLabs = async () => {
  try {
    const response = await fetch('/api/labs');
    if (!response.ok) {
      throw new Error('Failed to fetch labs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching labs:', error);
    throw error;
  }
};
```

## Testing

The project uses Jest and React Testing Library for testing:

```bash
npm run test
# or
yarn test
```

Guidelines for writing tests:

- Test component rendering
- Test user interactions
- Test state changes
- Mock API calls

### Server Deployment

1. Build the application
2. Transfer the contents of the `dist` directory to the web server
3. Configure the web server (Apache/Nginx) to serve the app

### CI/CD Pipeline (Future Plan)

- Automated testing on commit
- Automated building and deployment to staging
- Manual promotion to production

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `test:` - Adding or updating tests
- `chore:` - Changes to the build process or auxiliary tools

## License

This project is proprietary and owned by BCI Coding Club. All rights reserved.

---

© 2025 BCI Coding Club. All rights reserved.
© 2025 Lab Reservation System. All rights reserved.
