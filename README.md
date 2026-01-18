# 🌍 Disaster Identification and Awareness Tool (DIAT)

A real-time disaster monitoring web application that provides up-to-date earthquake and environmental alerts by integrating live public APIs into a clean, responsive dashboard.

---

## 🚀 Features

- 🌐 **Real-time Disaster Feed**
  - Live earthquake data powered by the USGS public API
  - Auto-refreshing updates with timestamps

- 📍 **Geolocation Awareness**
  - Detects user location using browser geolocation
  - Graceful fallback when location access is denied
  - Option to use a default location (New Delhi)

- 🌦 **Local Conditions**
  - Displays local weather information when location access is available

- ⚡ **Asynchronous Data Handling**
  - Built using modern async/await and Promise-based API calls
  - Non-blocking UI updates with loading and error states

- 🎨 **Modern UI**
  - Clean dashboard layout
  - Severity-based color coding (Low / Moderate / High)
  - Fully responsive for mobile and desktop

---

## 🛠️ Tech Stack

- **Frontend:** ReactJS, TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **APIs Used:**
  - USGS Earthquake API
  - Browser Geolocation API
  - Weather API (OpenWeather or equivalent)

  ## APIs Used
- [Open-Meteo](https://open-meteo.com/) (Weather) - No API Key required.
- [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/) (Disasters) - Public Feed.


🔗 Live Demo: https://disaster-identification-and-awarene.vercel.app/

