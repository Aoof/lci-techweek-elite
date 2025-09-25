# Tech Week Schedule 2025

A clean and minimalistic schedule viewer for tech week events built with SvelteKit and TailwindCSS.

This website is made for College LaSalle Tech Week 2025 by Abdulrahman Mousa (ELITE team).

🌐 **Live Site**: [https://aoof.github.io/lci-techweek-elite/](https://aoof.github.io/lci-techweek-elite/)

## Features

- **Clean, minimalistic design** - Focus on the essential information without clutter
- **Next event highlight** - Shows the upcoming event at the top of the page
- **Dark/Light mode toggle** - Theme switching for better accessibility
- **Responsive design** - Works well on desktop and mobile devices
- **Time-aware display** - Past events are visually dimmed, current day is highlighted
- **Static data** - Events are stored in a Svelte store for easy management

## Project Structure

```
src/
├── lib/
│   ├── stores/
│   │   └── techweek.ts          # Event data store and helper functions
│   └── components/
│       └── Schedule.svelte      # Main schedule display component
└── routes/
    ├── +layout.svelte          # Layout with theme support
    └── +page.svelte            # Main page with theme toggle
```

## Event Data Structure

Events are stored in `src/lib/stores/techweek.ts` with the following structure:

```typescript
interface TechEvent {
    id: string;
    title: string;
    time: string;          // Format: "HH:MM"
    duration: string;      // Format: "2h 30m"
    speaker?: string;
    location: string;
    description?: string;
}
```

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Open your browser and navigate to the displayed local URL (typically `http://localhost:5173`)

## Customizing Events

To modify the schedule, edit the `techWeekData` array in `src/lib/stores/techweek.ts`. The application will automatically:
- Highlight the next upcoming event
- Mark today's events
- Show past events with reduced opacity

## Technologies Used

- **SvelteKit** - Full-stack framework
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first styling
- **mode-watcher** - Theme switching functionality

## Build for Production

```bash
pnpm build
```

The production build will be available in the `build` directory.

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a new deployment.

### Manual Deployment Setup

If you want to deploy this project yourself:

1. Fork this repository
2. Go to your repository Settings → Pages
3. Set Source to "GitHub Actions"
4. The site will be automatically deployed on every push to main

### Local Development vs Production

- **Development**: `pnpm dev` - Hot reloading, faster builds
- **Production Build**: `pnpm build` - Optimized static files
- **Production Preview**: `pnpm preview` - Test the production build locally
