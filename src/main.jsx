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
import WithTheme from './components/WithTheme';
import { getThemeModeFromStroage } from './features/action/actionSlice';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

store.dispatch(checkUserAuthStorage());
store.dispatch(getNotesFromStorage());
store.dispatch(getLabelsFromStorage());
store.dispatch(getThemeModeFromStroage());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <WithTheme>
          <GlobalStyles />
          <App />
        </WithTheme>
      </Router>
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.unregister();
