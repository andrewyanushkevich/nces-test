# Task Management SPA

A modern, responsive Single Page Application (SPA) for managing tasks, built with the latest industry standards. This project demonstrates a clean UI, efficient state management, and robust filtering/pagination capabilities using **React 19** and **Ant Design 6**.

---

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine. This project requires both the frontend and the mock backend server to be running simultaneously.

### Prerequisites

- Ensure you have **Node.js** (version 20 or higher recommended for React 19) installed.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/andrewyanushkevich/nces-test
   ```

2. **Navigate to the project directory:**

   ```bash
   cd nces-test
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the App

You need to open two terminal windows to run the full stack:

#### Terminal 1: Start the Backend Server

```bash
npm run server
```

- The mock API ([json-server](https://github.com/typicode/json-server)) will be available at [http://localhost:3001](http://localhost:3001).

#### Terminal 2: Start the Frontend App

```bash
npm run dev
```

- The Vite development server will be available at [http://localhost:5173](http://localhost:5173).

---

## 🏗 Architecture Overview

The project is strictly organized following the **Feature-Sliced Design (FSD)** methodology, ensuring clear separation of concerns, scalability, and maintainability.

### 1. Layers Structure

- **App:** Global settings, providers (Ant Design ConfigProvider), routing configuration.
- **Pages:** Composition of widgets to form complete application views (Task List, Task Details).
- **Widgets:** Large self-contained blocks like the global Header, TaskBoard, and TaskToolbar.
- **Features:** User interactions with business value (Task filtering, create/edit forms, delete actions).
- **Entities:** Business entities (Task, Tag) with their specific models, API logic (RTK Query endpoints), and UI fragments.
- **Shared:** Reusable logic and UI components.

### 2. State Management & API Logic

- **RTK Query:** Integrated at the entities layer for data synchronization, caching, and optimistic updates.
- **Redux Toolkit:** Global store management, located in the `app/store` layer, handles feature-specific states like task filters.

### 3. UI & Styling

- **Ant Design 6:** Utilizes the latest design tokens for a consistent and professional look.
- **CSS Modules:** Used across all layers (e.g., `TaskCard.module.css`, `Header.module.css`) to ensure style isolation and prevent global namespace pollution.

### 4. Data Persistence

- **JSON Server:** Emulates a production RESTful environment with a custom middleware configuration.
- **Advanced Search:** Instantly find tasks with a global search that matches terms in titles or descriptions.
- **Smart Filtering:** Filter tasks by multiple criteria, including status, priority, and categories (tags), to quickly narrow down lists.
- **Full CRUD Support:** Effortlessly create, update, and manage the complete lifecycle of tasks with persistent storage.

---

## 🛠 Tech Stack

- **Frontend Framework:** React 19 (latest)
- **Architecture:** Feature-Sliced Design (FSD)
- **Build Tool:** Vite
- **Language:** TypeScript
- **UI Library:** Ant Design 6
- **State & Data Fetching:** Redux Toolkit & RTK Query
- **API Simulation:** JSON Server
- **Date Utility:** Day.js
