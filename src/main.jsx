import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import store from './app/store';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain='dev-bjtfg3031vtztwqx.us.auth0.com'
    clientId='8JzwyaZdAzjbkwkhB4HBNopEilYBqkGr'
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation='localstorage'
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);
