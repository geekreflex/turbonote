import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { isLoggedInFromStorage } from './features/auth/authSlice';

store.dispatch(isLoggedInFromStorage());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
