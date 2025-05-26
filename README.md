# HR Performance Dashboard

A modern, responsive HR Performance Dashboard built with Next.js, Tailwind CSS, and Zustand. This application helps HR professionals manage employee performance, track projects, and maintain employee records efficiently.

## Features

### 1. Dashboard Homepage (`/`)

- Employee listing with search and filter functionality
- Department-wise filtering
- Performance rating visualization (1-5 stars)
- Quick actions: View Details, Bookmark, Promote
- Responsive grid layout
- Real-time search with instant results

### 2. Employee Details Page (`/employee/[id]`)

- Comprehensive employee profile with:
  - Personal information (name, email, phone, address)
  - Department and role details
  - Performance metrics
  - Tabbed interface for better organization
- Three main sections:
  - **Overview**: Personal info, current performance, performance history
  - **Projects**: Current projects with progress tracking and status
  - **Feedback**: Recent feedback from managers and team leads
- Interactive features:
  - Bookmark employees
  - Promotion requests
  - Performance history visualization

### 3. Bookmarks Page (`/bookmarks`)

- List of bookmarked employees
- Quick access to employee details
- Project assignment functionality
- Remove from bookmarks option
- Performance metrics for bookmarked employees

### 4. Analytics Page (`/analytics`)

- Department-wise performance ratings
- Bookmark distribution visualization
- Interactive charts and graphs
- Performance trends analysis

## Technical Features

- Modern UI with Tailwind CSS
- Responsive design for all screen sizes
- Dark/Light mode support
- State management with Zustand
- Data persistence using localStorage
- Type-safe development with TypeScript
- Client-side routing with Next.js
- Interactive charts with Chart.js

## Setup Instructions

1. **Prerequisites**

   - Node.js (v14 or higher)
   - npm or yarn

2. **Installation**

   ```bash
   # Clone the repository
   git clone <repository-url>
   cd hr-dashboard

   # Install dependencies
   npm install
   # or
   yarn install
   ```

3. **Running the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`

4. **Building for Production**

   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Running Production Build**
   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure

```
hr-dashboard/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── analytics/         # Analytics page
│   │   ├── bookmarks/         # Bookmarks page
│   │   ├── employee/          # Employee details pages
│   │   └── page.tsx           # Dashboard homepage
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   └── layout/           # Layout components
│   └── store/                # Zustand store
├── public/                    # Static assets
└── package.json              # Project dependencies
```

## Dependencies

- Next.js 14
- React 18
- Tailwind CSS
- Zustand
- Chart.js
- Heroicons
- TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
