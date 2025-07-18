import 'dotenv/config'; 

export default {
  expo: {
    name: "POIS-NADIIA",
    slug: "POIS-NADIIA",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.anonymous.POISNADIIA"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      BASE_URL: process.env.BASE_URL,
      API_KEY: process.env.API_KEY
    }
  }
};