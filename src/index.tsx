import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';
import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN_NAME } from './config';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN_NAME}
      clientId={AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={AUTH0_AUDIENCE}
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
