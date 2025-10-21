# PomoTask

A Pomodoro timer with intelligent task management and AI-powered features. Built with React, Vite, and a Node.js backend.

## Features

- **Pomodoro Timer**: Customizable 25-minute focus sessions with break tracking
- **Smart Task Management**: Add, edit, delete, and organize your tasks with drag-and-drop
- **AI-Powered Task Analysis**: Get intelligent task breakdowns including time estimates, prerequisites, and optimal scheduling
- **Motivational Quotes**: AI-generated motivational messages to keep you inspired
- **Task Context**: Automatic task categorization with metadata like energy levels, best times, and required tools
- **Responsive Design**: Clean, minimal UI that works on all devices
- **Local Storage**: Persistent task and timer state across sessions

## Tech Stack

**Frontend:**

- React 19 with Vite
- CSS Modules for styling
- React Icons and React Tooltip for enhanced UX
- Axios for API communication

**Backend:**

- Node.js with Express
- AI integration via Hugging Face (DeepSeek-V3 model)
- CORS enabled for cross-origin requests

## Requirements

- Node.js 18+ (recommended LTS)
- npm 9+ (or use pnpm/yarn if preferred)

## Getting Started

### Prerequisites

- Node.js 18+ (recommended LTS)
- npm 9+ (or use pnpm/yarn if preferred)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/itsleonbro/PomoTask.git
   cd PomoTask
   ```

2. Install frontend dependencies

   ```bash
   npm install
   ```

3. Install backend dependencies

   ```bash
   cd backend
   npm install
   cd ..
   ```

4. Set up environment variables
   Create a `.env` file in the `backend/` directory with your Hugging Face API configuration:
   ```
   HUGGINGFACE_API_KEY=your_api_key_here
   PORT=3000
   ```

### Running the Application

1. Start the backend server

   ```bash
   cd backend
   npm run dev
   ```

   The backend will run on `http://localhost:3000`

2. Start the frontend development server (in a new terminal)
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## API Endpoints

The backend provides several AI-powered endpoints:

- **POST `/api/clarify`**: Analyze tasks and provide metadata (time estimates, prerequisites, etc.)
- **GET `/api/motivate`**: Generate motivational quotes for completed tasks
- **POST `/api/categorize`**: Categorize tasks

## Development Notes

- Frontend uses CSS Modules for component-scoped styles
- React Fast Refresh is enabled via Vite for a smooth dev experience
- Backend uses Express with CORS for cross-origin requests
- AI features powered by Hugging Face's DeepSeek-V3 model
- Local storage persists task and timer state across sessions

## Deployment

**Frontend**: The built output is static and can be deployed to platforms like Vercel, Netlify, GitHub Pages, or any static host.

**Backend**: Deploy the Express server to platforms like Railway, Render, Heroku, or your preferred Node.js hosting service. Ensure environment variables are properly configured.

A **live deployed version** of the application is also available!  
Check out the latest deployment [here](https://pomo-task-azure.vercel.app/).

## Contributing

Issues and pull requests are welcome. If you’re proposing a significant change, please open an issue first to discuss what you’d like to change.

## Acknowledgements

Created by the CloudCTRL team.

**Team Members:**

- [Leon Hlabathi](https://github.com/itsleonbro)
- [Mmela Dyantyi](https://github.com/MmelIGaba)
- [Boipelo Ngakane](https://github.com/boipelo-codes)
