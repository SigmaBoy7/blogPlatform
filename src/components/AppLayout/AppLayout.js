import React from 'react';
import { Outlet } from 'react-router-dom';

import AppHeader from '../AppHeader';

import './AppLayout.scss';

export default function AppLayout() {
  return (
    <div className="App">
      <div className="wrapper">
        <AppHeader />
        <div className="appContainer">
          <div className="appBody">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
