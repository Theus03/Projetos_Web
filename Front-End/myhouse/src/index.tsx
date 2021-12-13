import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './pages/Home';


import './styles/global.scss';
import './styles/colors.scss';

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);
