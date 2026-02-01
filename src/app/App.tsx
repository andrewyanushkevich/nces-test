import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 12,
        },
      }}
    >
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
