# Points of Interest Map Application

This is a React Native application built with Expo, designed to display Points of Interest (POIs) on a map. It leverages the GeoApify API to fetch POI data and provides a user-friendly interface to explore nearby locations.

## Features

- **Interactive Map**: Displays user's current location and nearby POIs.
- **Custom Markers**: Differentiated markers for various POI categories (e.g., restaurants, hospitals).
- **POI Details Bottom Drawer**: A custom, animated bottom drawer slides up to show detailed information about a selected POI, including address, coordinates, and action buttons (Get Directions, Call, Website).
- **Loading Screen**: Dedicated components for a smooth user experience during data loading.
- **Location Services**: Integrates with device location to center the map.
- **GeoApify API Integration**: Fetches real-world POI data.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm (Node Package Manager)
- Expo CLI (`npm install -g expo-cli`)
- A GeoApify API Key (get one for free at [GeoApify MyProjects](https://myprojects.geoapify.com/register))

### Installation

1. **Clone the repository (if applicable):**

   ```bash
   git clone <your-repository-url>
   cd POIS-NADIIA
   ```

   (If you received the project as a zip, navigate to the project directory)

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure GeoApify API Key and .env file:**
   Create `.env` file and paste the following (replace `'YOUR_GEOAPIFY_API_KEY_HERE'` with your actual GeoApify API Key):
   ```javascript
   // .env
   BASE_URL=https://api.geoapify.com/v2/places
   API_KEY=YOUR_GEOAPIFY_API_KEY_HERE # <-- Replace with your GeoApify API Key
   ```

### Running the App

1. **Start the Expo development server:**

   ```bash
   npx expo start
   ```

2. **Open on your device/simulator:**
   - **Expo Go App**: Scan the QR code displayed in your terminal or browser with the Expo Go app on your physical device (iOS or Android).
   - **iOS Simulator**: Press `i` in the terminal.
   - **Android Emulator**: Press `a` in the terminal.
   - **Web Browser**: Press `w` in the terminal (functionality may be limited compared to mobile).

## Screenshots

## Project Structure

```
POIS-NADIIA/
├── App.js                     # Main application entry point
├── index.js                   # Entry point for Expo projects
├── app.config.js              # Expo configuration file
├── components/                # Reusable UI components
│   ├── MapComponent.js        # Main map view and logic
│   ├── POIDetails.js          # Modal for POI details
│   └── POIMarker.js           # Custom map marker component
├── screens/                   # Full-screen components/views
│   └── LoadingScreen.js       # Displays loading indicators
├── services/                  # API and device service integrations
│   ├── geoApifyService.js     # Handles GeoApify API calls
│   └── locationService.js     # Manages device location access
├── styles/                    # Centralized styling definitions
│   └── styles.js              # StyleSheet for all components
├── utils/                     # Utility functions and constants
│   └── constants.js           # API keys, map configs, messages
├── .gitignore                 # Git ignore file
├── package.json               # Project dependencies and scripts
├── package-lock.json          # Project dependencies with exact versions
├── .env                       # Environemnt variables
└── README.md                  # This file
```

## Design Choices & Explanations

### **Component-Based Architecture**

The project follows a modular, component-based architecture. This approach enhances reusability, maintainability, and readability of the codebase. Each component has a single responsibility, making it easier to develop and debug.

### **Separation of Concerns**

- **`components/`**: Houses UI elements that are reusable across different parts of the application (e.g., `POIMarker`, `MapComponent`).
- **`screens/`**: Contains full-screen views or major sections of the application (e.g., `LoadingScreen`).
- **`services/`**: Dedicated to handling external interactions like API calls (`geoApifyService`) and device features (`locationService`). This keeps business logic separate from UI logic.
- **`styles/`**: Centralizes all styling definitions in `styles.js`, promoting consistency and easier theme management.
- **`utils/`**: Stores constants and helper functions, ensuring that configuration values and common utilities are easily accessible and modifiable.

### **Expo Go Compatibility**

The project is designed to run seamlessly on Expo Go, making development and testing straightforward without requiring complex native build setups.

## License

This project is for educational purposes only. Not intended for production use.
