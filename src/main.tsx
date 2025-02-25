import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css"; // TAILWIND CSS IMPORT
import router from "./routes/routes.tsx"; // ALL ROUTES
import { Provider } from "react-redux";
import { store } from "./libs/store.ts"; // REDUX STORE
import AuthProvider from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
