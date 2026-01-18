# Disaster Identification and Awareness Tool (DIAT)

A real-time disaster monitoring dashboard React application.

## Features
- **Real-time Weather**: Auto-detects your location to show local weather conditions using Open-Meteo.
- **Disaster Feed**: Live feed of global earthquakes and alerts from the USGS API.
- **Severity Coding**: Visual indicators for disaster severity (Green/Yellow/Red).
- **Responsive Design**: Mobile-friendly dashboard layout.

## Tech Stack
- React + TypeScript (Vite)
- TailwindICSS for styling
- Axios for API requests
- Lucide React for icons
- Date-fns for time formatting

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build by Production**
    ```bash
    npm run build
    ```

## APIs Used
- [Open-Meteo](https://open-meteo.com/) (Weather) - No API Key required.
- [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/) (Disasters) - Public Feed.

## License
MIT
