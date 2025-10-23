# NodeWave Todo App

A modern, full-stack todo application built with Next.js 14, featuring authentication, task management, and a clean, responsive UI.

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with Radix UI components
- **State Management:** Zustand
- **Data Fetching:** TanStack React Query
- **Form Handling:** React Hook Form with Zod validation
- **Authentication:** Custom auth system with JWT
- **Database:** PostgreSQL (via API)
- **Icons:** Lucide React

## Features

- 🔐 **Authentication System** - Login and registration with secure JWT tokens
- 📝 **Todo Management** - Create, read, update, and delete todos
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 📱 **Mobile Responsive** - Works seamlessly across all devices
- ⚡ **Fast Performance** - Optimized with Next.js 14 and React Query
- 🔍 **Type Safety** - Full TypeScript support throughout the application

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Cyrochrome/TodoApp.git
cd TodoApp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```env
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (home)/            # Protected routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   └── ui/               # Shadcn/ui components
├── lib/                  # Utility libraries
│   ├── api/             # API client functions
│   ├── stores/          # Zustand stores
│   └── validations/     # Form validation schemas
├── types/               # TypeScript type definitions
└── hooks/               # Custom React hooks
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the NodeWave Front End Candidate Assessment.

## Author

Built by [Cyrochrome](https://github.com/Cyrochrome)
