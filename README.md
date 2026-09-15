# Warsha Shop 🛒

Warsha Shop is a modern e-commerce web application that simulates a real-world shopping platform using **React**, **Vite**, and **advanced state management**.  
This stage of the project heavily focuses on the frontend architecture, demonstrating how modern web applications manage complex client-side state, secure user authentication, and dynamic UI rendering.

---

## 📌 Overview

Warsha Shop integrates a **React-based Single Page Application (SPA)** with a Node.js REST API to deliver a seamless and premium shopping experience.

The frontend is designed to efficiently handle dynamic product data, secure JWT-based user sessions, and interactive cart management using modern React hooks and routing techniques.

---

## ✨ Key Features

### 🎨 Modern UI & UX Design
- Dynamic hover effects and micro-animations
- Premium, cohesive color scheme and branding
- Fully responsive CSS Grid and Flexbox layouts for all devices

### 🛒 State & Cart Management
- **React Context API** for global state management (Authentication & Cart)
- Real-time cart updates with visual feedback upon adding items
- Local storage persistence for seamless user sessions

### 🔒 Secure Authentication
- Full JWT-based authentication flow (Login/Register)
- Protected routes preventing unauthorized access to checkout and orders
- Custom **Axios interceptors** to automatically attach secure tokens to API requests

### 🔍 Dynamic Product Rendering
- URL-based search parameter parsing for instant product filtering
- Intelligent empty-state handling for search results and empty carts
- Optimized fetching and rendering of the product grid

---

## 🧠 Concepts & Architecture Used

- Single Page Application (SPA) Architecture
- Context API State Management
- Client-Side Routing
- JWT Authentication Flow
- RESTful API Integration
- Vanilla CSS UI Design

---

## 🖥️ Application Features

- User authentication (login / signup)
- Dynamic product catalog
- Search products with real-time URL updates
- Add to cart with quantity selection
- Order history and tracking
- Interactive checkout simulation
- Theme-consistent pop-ups and alert messages

---

## 🧱 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend Core | React 19 |
| Build Tool | Vite |
| Routing | React Router v7 |
| API Client | Axios |
| Styling | Vanilla CSS |
| Backend API | Node.js / Express (Provided) |
| Deployment | Vercel |


## 🛠️ Installation (High-Level)

### Requirements
- Node.js (v18+)
- npm

### Steps
1. Clone the repository and navigate to the `Frontend` directory.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the Vite development server on `http://localhost:5173`.
*(Note: The `vite.config.js` is pre-configured to proxy API requests to the backend).*

---


## 📚 Purpose

This project was developed to demonstrate:
- Advanced React component architecture and reusability
- Secure client-side authentication handling
- Seamless integration between a frontend SPA and a backend REST API
- Modern CSS design practices without relying on external component libraries

---

## 🙏 Acknowledgments

A massive shout out to **[Super Simple Dev](https://www.youtube.com/@SuperSimpleDev)** for providing the incredible starting code, HTML/CSS structure, and the Node.js backend environment for this project. Their tutorials were a huge inspiration and laid the groundwork for this implementation!

---

## 📜 License

Educational use only.

⭐ If you like this project, consider giving it a star!
