# PomoTask

A simple, fast Pomodoro timer with lightweight task management. Built with React and Vite.

## Features

- Pomodoro timer to help you focus
- Task list to track what you’re working on
- Clean, minimal UI

## Tech Stack

- React (Vite)
- CSS Modules

## Requirements

- Node.js 18+ (recommended LTS)
- npm 9+ (or use pnpm/yarn if preferred)

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/itsleonbro/PomoTask.git
   cd PomoTask
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the dev server
   ```bash
   npm run dev
   ```
   The server URL will be shown in the terminal (typically `http://localhost:5173`).


## Project Structure

```
PomoTask/
  ├─ src/
  │  ├─ components/
  │  │  ├─ Timer/
  │  │  │  ├─ Timer.jsx
  │  │  │  └─ Timer.module.css
  │  │  └─ Tasks/
  │  │     ├─ Tasks.jsx
  │  │     └─ Tasks.module.css
  │  ├─ pages/
  │  │  └─ Home.jsx
  │  ├─ App.jsx
  │  └─ main.jsx
  ├─ public/
  ├─ index.html
  └─ vite.config.js
```

## Development Notes

- This project uses CSS Modules for component-scoped styles.
- React Fast Refresh is enabled via Vite for a smooth dev experience.

## Deployment

The built output is static and can be deployed to platforms like Vercel, Netlify, GitHub Pages, or any static host.

## Contributing

Issues and pull requests are welcome. If you’re proposing a significant change, please open an issue first to discuss what you’d like to change.

## Acknowledgements

Created by the CloudCTRL team.
