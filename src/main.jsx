import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { checkUserAuthStorage } from './features/auth/authSlice';
import GlobalStyles from './styles/GlobalStyles';
import { getNotesFromStorage } from './features/note/noteSlice';
import { getLabelsFromStorage } from './features/label/labelSlice';

store.dispatch(checkUserAuthStorage());
store.dispatch(getNotesFromStorage());
store.dispatch(getLabelsFromStorage());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <GlobalStyles />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
