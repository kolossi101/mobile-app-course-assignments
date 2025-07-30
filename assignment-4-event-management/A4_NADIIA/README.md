# Event Management App

This is an Event Management App built with React Native using Expo, as part of Assignment 4. It allows users to explore events, view event details, and manage their list of favorite events. The app retrieves data from Firebase Firestore and uses React Navigation for multi-screen navigation.

## Features

- Displays a list of upcoming events
- Detailed view of each event
- Add or remove events from favorites
- View and manage a list of favorite events
- Option to clear all favorites with confirmation
- Data stored in Firebase Firestore

## Demo

https://github.com/user-attachments/assets/106b7d32-15bb-47fe-99b6-53263a236bb3

### Events List

- Shows upcoming events with title, date, location, and image
- Tapping an event navigates to the details screen

### Event Details

- Displays full event information
- Allows adding/removing event from favorites

### Favorite Events

- Shows favorited events
- Allows removing individual events or clearing all with alert

## Technologies Used

- React Native with Expo
- React Navigation
- Firebase Firestore
- TypeScript
- SafeAreaView for notch-safe UI

## Setup Instructions

1. Clone this repository
2. Run `npm install` or `yarn install`
3. Create `env.local` file and fill out the following secrets:
   
   ```env
   API_KEY=your-api-key
   AUTH_DOMAIN=your-auth-domain
   PROJECT_ID=your-project-id
   STORAGE_BUCKET=your-storage-bucket
   MESSAGING_SENDER_ID=your-messaging-sender-id
   APP_ID=your-app-id
   
5. Start the app using `npx expo start` or `npx expo start --tunnel`
6. Scan the QR code with Expo Go on your mobile device or run on an emulator
7. Make sure your Firebase project is properly configured
