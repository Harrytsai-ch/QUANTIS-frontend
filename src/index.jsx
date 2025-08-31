import React from 'react';
import ReactDOM from 'react-dom/client';

// 載入 SCSS 樣式 (包含 Bootstrap 和自定義樣式)
import './assets/scss/all.scss';

import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);