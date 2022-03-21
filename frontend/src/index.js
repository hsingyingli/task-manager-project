import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import {EmotionProvider} from './context/emotion-theme';
import {AuthProvider} from './context/auth-context';

ReactDOM.render(
  <React.StrictMode>
    <EmotionProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </EmotionProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
