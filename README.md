# E-Tax CPA Website

Professional CPA tax services website built with modern web technologies.

## About

E-Tax CPA is a trusted tax advisor serving Austin, Texas and surrounding areas. We provide comprehensive tax planning, preparation, and bookkeeping services for individuals and businesses.

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Node.js/Express** - Backend server for API endpoints
- **Google Maps API** - Interactive service area map
- **Google Places API** - Real customer reviews

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Getting Started

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd tax-zen-redo

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the root directory with:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Google APIs
GOOGLE_MAPS_API_KEY=your-maps-api-key
GOOGLE_PLACES_API_KEY=your-places-api-key
```

## Features

- **Multi-step Contact Form** - Intelligent lead qualification
- **Service Area Map** - Interactive map showing coverage area
- **Google Reviews Integration** - Real customer testimonials
- **Responsive Design** - Works on all devices
- **Professional UI** - Clean, modern design
- **Email Integration** - Automated lead notifications
- **SEO Optimized** - Search engine friendly

## Deployment

### Render (Recommended)

1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy as a Web Service

The `render.yaml` file is included for automatic configuration.

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/reviews/:placeId` - Fetch Google Reviews

## License

© 2024 E-Tax CPA. All rights reserved.