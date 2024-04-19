import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import createStore from "./Store";
const { store, persistor } = createStore();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="577779491483-pblva29vv6qtbhjvvkekrf5fs5nt4s61.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);

reportWebVitals();
