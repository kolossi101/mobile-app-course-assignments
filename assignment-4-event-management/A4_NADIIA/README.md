# Event Management App

This is an Event Management App built with React Native using Expo, as part of Assignment 4. It allows users to explore events, view event details, and manage their list of favorite events. The app retrieves data from Firebase Firestore and uses React Navigation for multi-screen navigation.

## Features

- Displays a list of upcoming events
- Detailed view of each event
- Add or remove events from favorites
- View and manage a list of favorite events
- Option to clear all favorites with confirmation
- Data stored in Firebase Firestore

## Screens



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
- JavaScript or TypeScript
- SafeAreaView for notch-safe UI

## Setup Instructions

1. Clone this repository
2. Run `npm install` or `yarn install`
3. Start the app using `npm start` or `yarn start`
4. Make sure your Firebase project is properly configured
5. Test on a physical or virtual device using Expo Go
