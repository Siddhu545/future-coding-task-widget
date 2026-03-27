# 🧩 Widget Project (React + TypeScript + Vite)

A modular **Widget system** built using **React**, **TypeScript**, and **Vite**.
This project focuses on creating reusable UI components with a clean and scalable structure.

---

## 🚀 Features

* ⚛️ React with TypeScript
* ⚡ Fast development using Vite
* 🧩 Reusable Widget & Card components
* 🔌 API integration layer
* 🎯 Clean separation of concerns (components, utils, types, api)

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Siddhu545/future-coding-task-widget.git
cd future-widget
```

### 2. Install dependencies

```bash
npm install
```

---

## ▶️ Running the Project

### Start development server

```bash
npm run dev
```

App will run on:

```
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
```

### Preview build

```bash
npm run preview
```

---

## 🧠 Project Architecture

### 🔹 Components (`src/components`)

* `Widget.tsx` → Core widget container
* `Card.tsx` → Reusable UI wrapper

These are designed to be:

* Reusable
* Composable
* Independent from business logic

---

### 🔹 API Layer (`src/api`)

Handles all external data fetching and API communication.

* Keeps network logic separate from UI
* Makes components cleaner and easier to test

---

### 🔹 Assets (`src/assets`)

* Contains CSS modules and static styling resources
* Scoped styles for better maintainability

---

### 🔹 Utils (`src/utils`)

* Helper functions
* Shared logic across the app

---

### 🔹 Types (`src/types`)

* Central place for TypeScript interfaces and types
* Ensures type safety across components and API calls

---

## 🧩 Example Usage

```tsx
import Widget from "./components/Widget"

function App() {
  return (
    <Widget title="Dashboard Widget">
      <p>Widget content goes here</p>
    </Widget>
  )
}

export default App
```

---

## 🔧 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 🛠️ Tech Stack

* React
* TypeScript
* Vite
* ESLint

---

## 📌 Notes

* This project uses **CSS modules / standard CSS**, not Tailwind
* Structure is designed for scalability and maintainability
* Easy to extend with additional widgets or features

---

## 🤝 Contributing

Feel free to fork the project and submit improvements.

