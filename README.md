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

```

---

## ⚖️ How It Works
1. **User selects destination** from kiosk UI.
2. **Path is calculated** using Dijkstra's algorithm.
3. **Highlighted route** appears in 2D and optionally 3D view.
4. **QR code** is shown to continue navigation on mobile.

---

## 📤 Deployment
To build and deploy the mobile module:
1. Open project in VS Code
2. Go to terminal
3. Go to root folder pp_mobile
4. Run command npm i
5. Run command npx expo start
6. Scan the QR on EXPO GO app to run the app
7. Press <a> for emulator
8. Creds - samarth@gmail.com  Pass - samarth@99

---

## 🎨 Contributors
- Samarth Sarnopant — Unity & Pathfinding Integration
- Tejas Parate — App Integration
- Naman Kanojiya — UI/UX & Multilingual Setup
- Sumit Mishra - Pathfinding Integration

---

For issues, suggestions or contributions, feel free to open a pull request or raise an issue.

