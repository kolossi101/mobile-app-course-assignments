# Xpress Post - Courier Rate Calculator 📦

This is a React Native mobile application built with Expo for a courier business. The app allows customers to enter parcel details and receive the best possible shipping rate, including add-ons and a full order summary.

## ✨ Features

- **App Name:** Clearly displayed at the top of the screen.
- **Sending Address:** Input field for the sender's address.
- **Destination Address:** Input field for the recipient's address.
- **Parcel Type:** Choose between "Package" and "Letter or Document".
- **Parcel Weight:**
  - Accepts weight based on parcel type.
  - Package: up to 44 lbs.
  - Letter or Document: up to 1.1 lbs.
  - Displays an error if the entered weight exceeds the limit.
- **Choose Rate:**
  - Rates are shown based on the selected parcel type.
    - **Package:** Standard ($12.99), Xpress Post ($18.99), Priority Post ($24.99)
    - **Letter or Document:** Standard ($4.99), Xpress Post ($9.99), Priority Post ($14.99)
- **Add-On:**
  - Signature option (+$2) available for both parcel types.
- **Get Rate Button:**
  - Validates all fields.
  - On success, displays a modal with a detailed order summary.
- **Order Summary Modal:**
  - Shows all entered details, selected rate, add-on, subtotal, tax (13%), and total.

## 🚀 Screenshots

<img src="https://github.com/user-attachments/assets/ea668a02-3e03-460e-92ac-548cab5f68c7" style="max-width: 400px; height: auto;" />
<img src="https://github.com/user-attachments/assets/47a6f963-8e8d-403b-b2bf-2829f1d235ad" style="max-width: 400px; height: auto;" />

## 📂 Project Structure

```
NADIIA_A2/
│
├── App.js
├── components/
│   ├── OrderSummaryModal.js
│   ├── ParcelTypeSelector.js
│   └── RateDropdown.js
├── styles/
│   └── AppStyles.js
├── assets/
│   └── (icons and images)
├── package.json
└── ...
```

## 🛠️ Getting Started

## 📦 Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A device or emulator for testing

### 🧑‍💻 Installation

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd NADIIA_A2
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the Expo development server:**

   ```sh
   npm start
   ```

   or

   ```sh
   expo start
   ```

4. **Run on your device or emulator:**
   - Use the Expo Go app on your phone to scan the QR code, or
   - Press `a` for Android emulator, `i` for iOS simulator, or `w` for web.

## 📲 Usage

1. Enter the sending and destination addresses.
2. Select the parcel type.
3. Enter the parcel weight (must be within allowed limits).
4. Choose a shipping rate.
5. (Optional) Select the signature add-on.
6. Tap **Get Rate** to see the order summary modal.

## ✅ Validation & Calculations

- **Address:** Must match the required pattern and not be identical.
- **Weight:** Must be a positive number and within the allowed range for the selected type.
- **Rate:** Must be selected.
- **Add-On:** Signature option adds $2 to the subtotal.
- **Subtotal:** Rate + Add-On (if selected)
- **Tax:** 13% of Subtotal
- **Total:** Subtotal + Tax

## 📦 Dependencies

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [react-native-dropdown-picker](https://github.com/hossein-zare/react-native-dropdown-picker)
- [react-native-modal](https://github.com/react-native-modal/react-native-modal)
- [@expo-google-fonts/nunito](https://github.com/expo/google-fonts)

## 📜 License

This project is for educational purposes.

## 👩‍💻 Author

Nadiia (Semester 05, Summer, BTP610 Assignment 2)
