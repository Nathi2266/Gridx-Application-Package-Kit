# GridX Mobile Application

## Overview
GridX is a React Native mobile application built with Expo, designed to help users monitor solar energy usage, top-up credits, and interact with community features. It includes authentication flows, a dashboard, and a newly revamped top-up functionality.

## Features
- User Authentication (Login, Register)
- Dashboard for monitoring
- Top-up functionality with various payment methods (Card, Mobile Money, Bank Transfer)
- Impact tracking
- Community Forum
- Settings management

## Installation and Setup

To get started with the GridX application, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Nathi2266/Gridx-Application-Package-Kit.git
    cd gridx
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Backend URL:**
    Open `config.js` and set your backend API base URL:
    ```javascript
    export const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend URL
    ```

4.  **Set up `AuthContext` with real API calls (if not already done):**
    In `contexts/AuthContext.js`, replace the mock `login` and `register` functions with actual API calls to your backend that return an authentication token. Also, implement token persistence (e.g., using `AsyncStorage` or `expo-secure-store`).

5.  **Ensure your backend server is running.**

## Running the Application

### On Web Browser
To run the application in your web browser:

```bash
npx expo start --web
```
This will open the app in your default web browser.

### On Android Device/Emulator
1.  **Enable Developer Options and USB Debugging** on your Android device.
2.  **Install ADB (Android Debug Bridge):** This usually comes with Android Studio's Platform-Tools. Ensure `adb` is in your system's PATH.
3.  **Connect your device** via USB or start an Android emulator.
4.  **Run the Expo development server:**
    ```bash
    npx expo start
    ```
5.  **Press `a` in the terminal** to open the app on your Android device/emulator.

### On iOS Simulator/Device
1.  For iOS Simulator, ensure you have Xcode installed.
2.  For iOS Device, ensure you have a valid Apple Developer account and provisioning profiles.
3.  **Run the Expo development server:**
    ```bash
    npx expo start
    ```
4.  **Press `i` in the terminal** to open the app on your iOS simulator, or scan the QR code with the Expo Go app on your iOS device.

## API Endpoints (Backend)
-   `POST /api/register`: User registration.
-   `POST /api/login`: User login, returns authentication token.
-   `POST /api/topup`: Top-up credits. Requires `userId`, `amount`, `method`, and an authorization token.

## Technologies Used
-   React Native
-   Expo
-   React Navigation
-   @react-native-picker/picker
-   (Potentially React Native Paper or other UI libraries for styling)
