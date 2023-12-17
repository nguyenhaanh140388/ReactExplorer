import React, { lazy, Suspense, cloneElement } from 'react';
import logo from './logo.svg';
import './App.css';

import SideBar from './components/sidebar/sidebar';
import Footer from './components/footer/footer';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { SideBarData } from './components/sidebar/sidebardata';

let flatsideBarData = [];

function ReserveChilds(children) {

  let dataArray = children ? children : SideBarData;

  dataArray.map((route, index) => {
    if (!route.children)
      flatsideBarData.push(
        {
          path: route.path,
          component: route.component
        });
    else {
      flatsideBarData.push(
        {
          path: route.path,
          component: route.component
        });
      ReserveChilds(route.children);
    }
  });
}

export default function App() {
  ReserveChilds(null);
  return (
    <div className="App">
      <header className="App-header">
        <h5>ATN vegetarian restaurant business system</h5>
        <img className="App-logo" alt="logo" />
      </header>
      <div className='outer-container'>
        <BrowserRouter>
          <React.Fragment>
            <SideBar />
            <Routes>
              {
                flatsideBarData.map((route, index) => {
                  return (
                    <Route
                      path={route.path}
                      Component={route.component}
                    />
                  )
                }
                )
              }
            </Routes>
          </React.Fragment>
        </BrowserRouter>
      </div>
      <Footer></Footer>
    </div>
  );
}
