# BCI Campus Lab Management System Frontend

This repository contains the frontend code for the BCI Campus Lab Reservation System, built with React, Vite, and Tailwind CSS.

## Frontend Developer Guide

This guide provides detailed information for frontend developers working on the BCI Campus lab reservation project.

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Credentials

Use these credentials for testing during development:

| Role     | Email                    | Password |
|----------|--------------------------|----------|
| Admin    | <admin@bcicampus.edu>      | password |
| Lecturer | <lecturer@bcicampus.edu>   | password |
| Student  | <student@bcicampus.edu>    | password |

### Tech Stack Details

- **React 18**: Utilized for building the component-based UI
- **Vite**: Fast build tool and dev server
- **React Router 6**: For declarative routing
- **Tailwind CSS**: For utility-first styling
- **React Icons**: Icon library with multiple icon sets
- **Context API**: For state management across components

### Component Architecture

Components are organized by user role and follow a consistent pattern:

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminLayout.jsx      # Layout wrapper for admin pages
│   │   ├── Sidebar.jsx          # Admin sidebar navigation
│   │   └── AdminHeader.jsx      # Admin header with user profile
│   ├── lecturer/
│   │   ├── LecturerLayout.jsx   # Layout wrapper for lecturer pages
│   │   ├── LecturerSidebar.jsx  # Lecturer sidebar navigation
│   │   └── LecturerHeader.jsx   # Lecturer header with user profile
│   └── student/
│       ├── StudentLayout.jsx    # Layout wrapper for student pages
│       ├── StudentSidebar.jsx   # Student sidebar navigation
│       └── StudentHeader.jsx    # Student header with user profile
└── pages/                       # Page components by role
```

### BCI Campus Labs Structure

The system is designed to support all labs within the BCI Campus:

- **Computing Department**
  - Computer Lab 1
  - Computer Lab 2
  - Computer Lab 3
  - Computer Lab 4
  - Computer Lab 5

### Layout Structure

All user interfaces follow a consistent layout pattern:

```jsx
<Layout>
  <Sidebar /> {/* Navigation sidebar with links */}
  <MainContent>
    <Header /> {/* Page header with profile dropdown */}
    <main> {/* Main content area */}
      {children}
    </main>
  </MainContent>
</Layout>
```

### State Management

The application uses React's built-in state management solutions:

- **Local Component State**: For component-specific UI state
- **Context API**: For sharing data between components (auth, themes)
- **URL Parameters**: For page-specific state that should be bookmarkable

### Authentication Flow

1. User enters credentials on the Login page
2. Credentials are validated (currently mocked, will connect to BCI Campus API)
3. User role is determined and stored in localStorage
4. App redirects to the appropriate dashboard
5. Protected routes check authentication status and user role

### Responsive Design

The UI is fully responsive with these breakpoints:

- **Mobile**: < 640px
- **Small screens**: >= 640px
- **Medium screens**: >= 768px
- **Large screens**: >= 1024px
- **Extra large screens**: >= 1280px

Mobile-first approach is used throughout the application to ensure good experience on all devices used by BCI Campus students and staff.

### Form Handling

Forms follow these principles:

1. Form state is managed with React state
2. Validation is performed on submit and during typing
3. Error messages are displayed inline
4. Loading states show appropriate visual feedback

### Code Style and Best Practices

- Use functional components with hooks
- Add JSDoc comments for complex functions
- Follow component naming conventions:
  - PascalCase for components
  - camelCase for functions and variables
  - kebab-case for CSS classes
- Extract reusable logic to custom hooks
- Keep components focused on a single responsibility
- Use consistent spacing and indentation

### Working with Modals

Modals are implemented as conditionally rendered components with shared styling:

```jsx
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Modal Title</h2>
      {/* Modal content */}
      <div className="flex justify-end mt-6 gap-2">
        <button 
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
```

### Tailwind CSS Usage

All styling is done with Tailwind CSS utility classes:

- Use utility classes directly in JSX for most styling
- Extract repeated patterns to custom components
- Leverage Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`)
- Use `@apply` in CSS files only when necessary

Common patterns:

```jsx
// Card component
<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
  {/* Card content */}
</div>

// Primary button (using BCI Campus brand color)
<button className="bg-[#042E6F] text-white px-4 py-2 rounded hover:bg-[#021E47] transition">
  Button Text
</button>

// Secondary button
<button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition">
  Button Text
</button>
```

### BCI Campus Brand Guidelines

When developing interfaces, follow these BCI Campus brand guidelines:

- **Primary Color**: `#042E6F` (Deep Blue)
- **Secondary Color**: `#FF8C00` (Orange)
- **Accent Color**: `#00A3E0` (Light Blue)
- **Font**: Inter or system sans-serif as fallback
- Always use the official BCI Campus logo in the navigation header
- Maintain appropriate whitespace and visual hierarchy

### Testing

Unit tests and component tests will be implemented using:

- Jest as the test runner
- React Testing Library for component testing
- Mock Service Worker for API mocking

### Future Enhancements

Planned features and improvements:

1. **Backend Integration**: Replace mock data with real BCI Campus API calls
2. **Authentication**: Implement JWT-based authentication with BCI Campus user database
3. **Notifications**: Real-time notification system for reservation updates
4. **Advanced Calendar**: Interactive calendar for lab scheduling
5. **Data Visualization**: Charts and graphs for lab usage analytics
6. **Offline Support**: PWA features for limited offline capabilities
7. **Equipment Inventory**: Detailed tracking of lab equipment availability

## Troubleshooting

Common development issues:

1. **Outdated Packages**: Run `npm update` to update dependencies
2. **Tailwind Classes Not Applying**: Check if you've imported `index.css` in your component
3. **Component Not Rendering**: Verify route configuration in `App.jsx`
4. **Auth Issues**: Clear localStorage and reload if experiencing auth problems

For more help, open an issue on the project repository.
