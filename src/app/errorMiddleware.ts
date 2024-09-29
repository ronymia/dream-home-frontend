import { Middleware } from "@reduxjs/toolkit";

const errorMiddleware: Middleware = (store) => (next) => (action) => {
  // Check for rejected actions from the apiSlice
  if (apiSlice.endpoints.getUser.matchRejected(action)) {
    // Handle error (e.g., logging or showing a notification)
    console.error("API error:", action.error);
    // You can also dispatch a custom error action if needed
  }

  return next(action);
};
