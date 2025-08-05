// src/index.js (hoặc src/main.jsx)

import React from 'react';
import ReactDOM from 'react-dom/client'; // Dùng createRoot cho React 18+
// eslint-disable-next-line import/no-unresolved
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './redux/store.jsx'; // Import store của bạn
import './index.css';

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
