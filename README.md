# 🌤️ Weather App

A modern, responsive weather application built with React and TypeScript that provides real-time weather information for cities across Poland. Features a clean, intuitive interface with weather comparison capabilities and server-side rendering for optimal performance.

## ✨ Features

- **🌍 Real-time Weather Data**: Get current weather conditions for any city in Poland
- **📊 Weather Comparison**: Compare weather data between different cities side-by-side
- **🎨 Modern UI/UX**: Beautiful, responsive design built with TailwindCSS
- **⚡ Server-Side Rendering**: Fast loading times with SSR implementation
- **📱 Mobile-First**: Fully responsive design that works on all devices
- **🔄 State Management**: Robust state management with Redux Toolkit
- **🎯 Type Safety**: Full TypeScript implementation for better development experience
- **🚀 Performance Optimized**: Efficient data caching and loading states

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript development
- **TailwindCSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Axios** - HTTP client for API requests

### Backend & Build Tools

- **Express.js** - Node.js web framework
- **Vite** - Fast build tool and development server
- **Node.js** - JavaScript runtime
- **Compression** - Response compression middleware

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### APIs

- **OpenWeather API** - Weather data provider

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm package manager
- OpenWeather API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```bash
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
   ```

   To get an OpenWeather API key:
   - Visit [OpenWeather API](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Add it to your `.env` file

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

## 📖 Usage Instructions

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check code formatting
npm run format:check
```

### Available Scripts

| Script         | Description                                 |
| -------------- | ------------------------------------------- |
| `dev`          | Start development server with hot reload    |
| `build`        | Build both client and server for production |
| `build:client` | Build only client-side code                 |
| `build:server` | Build only server-side code                 |
| `preview`      | Preview production build locally            |
| `lint`         | Run ESLint to check code quality            |
| `lint:fix`     | Automatically fix ESLint issues             |
| `format`       | Format code with Prettier                   |
| `format:check` | Check code formatting                       |

## ⚙️ Configuration

### Environment Variables

| Variable                   | Description                               | Required |
| -------------------------- | ----------------------------------------- | -------- |
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeather API key                  | Yes      |
| `PORT`                     | Server port (default: 5173)               | No       |
| `BASE`                     | Base URL path (default: /)                | No       |
| `NODE_ENV`                 | Environment mode (development/production) | No       |

### Project Structure

```
weather-app/
├── src/
│   ├── components/          # React components
│   │   ├── ComparisonPanel/ # Weather comparison feature
│   │   ├── icons/          # SVG icon components
│   │   └── ...
│   ├── pages/              # Page components
│   ├── store/              # Redux store configuration
│   ├── services/           # API services
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── styles/             # Global styles
├── public/                 # Static assets
├── dist/                   # Build output
└── server.js              # Express server
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Go to your Vercel dashboard
   - Add `VITE_OPENWEATHER_API_KEY` to environment variables

### Option 2: Netlify

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

3. **Set Environment Variables**
   - Go to Site settings > Environment variables
   - Add `VITE_OPENWEATHER_API_KEY`

### Option 3: Docker

1. **Create Dockerfile**

   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 5173
   CMD ["npm", "run", "preview"]
   ```

2. **Build and run**
   ```bash
   docker build -t weather-app .
   docker run -p 5173:5173 -e VITE_OPENWEATHER_API_KEY=your_key weather-app
   ```

### Option 4: Traditional Hosting

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Upload files**
   - Upload the `dist` folder to your web server
   - Ensure your server supports Node.js

3. **Start the server**
   ```bash
   npm run preview
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeather API](https://openweathermap.org/api) for weather data
- [TailwindCSS](https://tailwindcss.com/) for the styling framework
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/gracjan-op/weather-app/issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

---

**Happy coding! 🌟**
