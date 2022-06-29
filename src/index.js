import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.js'
import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { persistor, reduxStore } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const rootNode = document.getElementById("root");
// document.cookie = "google.com; SameSite=None; Secure"
// document.cookie = "accounts.google.com; SameSite=None; Secure"

createRoot(rootNode)
.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
