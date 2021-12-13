import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from './pages/Login';


import './styles/global.scss';
import './styles/colors.scss';

ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('root')
);
