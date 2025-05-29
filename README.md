# Pravasi Path Mobile System

**Pravasi Path** is a multilingual, interactive navigation system designed for railway stations. This repository contains the source code for the **Mobile Module**, which allows users to view 2D/3D station maps, select destinations, and visualize paths using Unity and WebGL integration.

---

## 🚀 Features
- Interactive 2D and 3D station maps
- Step-by-step path visualization
- Multilingual interface (English, Hindi, Marathi, Gujarati)
- Touch-screen friendly UI
- Option to scan QR code and continue navigation in the mobile app

---

## 🔧 Tech Stack
- **Unity 2022.3.4** (for 3D scene, node-based pathfinding)
- **React WebView** for app integration
- **Dijkstra's Algorithm** for shortest pathfinding

---

## ⚖️ How It Works
1. **User selects destination** from kiosk UI.
2. **Path is calculated** using Dijkstra's algorithm.
3. **Highlighted route** appears in 2D and optionally 3D view.
4. **QR code** is shown to continue navigation on mobile.

---

## 📤 Deployment
To build and deploy the mobile module:
1. Install **Expo Go** from the App Store (iOS) or Google Play Store (Android).
2. Open project in VS Code.
3. Go to terminal.
4. Navigate to the root folder `pp_mobile`.
5. Run command `npm install` to install dependencies.
6. Run command `npx expo start` to start the development server.
7. Scan the QR code on the **Expo Go** app to run the app on your mobile device.
8. Press `a` to run on the Android emulator.
9. Press `i` to run on the iOS emulator.
10. Expo Go SDK version: **52**.

---

## 🎨 Contributors
- Samarth Sarnopant — Unity & Pathfinding Integration
- Tejas Parate — App Integration
- Naman Kanojiya — UI/UX & Multilingual Setup
- Sumit Mishra - Pathfinding Integration

---

For issues, suggestions, or contributions, feel free to open a pull request or raise an issue.

