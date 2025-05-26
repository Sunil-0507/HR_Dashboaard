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

#Screenshots
![image](https://github.com/user-attachments/assets/b74951ef-b28d-40fb-84a7-241ba32d25de)

![image](https://github.com/user-attachments/assets/1aa54f1c-1b63-47dd-9443-8b0aa3ffea72)
![image](https://github.com/user-attachments/assets/5ce5a10f-084a-47e6-ad83-bf913810bea0)
![image](https://github.com/user-attachments/assets/1bb04f48-7ba5-4f50-b59c-1af0e11a4e7c)
![image](https://github.com/user-attachments/assets/2a55db58-7ad5-48cd-ba5c-4839f507be79)


