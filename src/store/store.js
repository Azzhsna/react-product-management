import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";

const loadAuthState = () => {
  try {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    if (!token) return undefined;
    return {
      auth: {
        token,
        user: user ? JSON.parse(user) : null,
        isAuthenticated: true,
        loading: false,
        error: null,
      },
    };
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
  preloadedState: loadAuthState(),
});
