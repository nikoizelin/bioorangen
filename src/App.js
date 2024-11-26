import './App.css';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BioOrangen from './BioOrangen.js';
import OrderStepper from './OrderStepper.js';
import OrderConfirmation from './OrderConfirmation.js';
import Admin from './Admin.js';
import Login from './Login.js';
import Logout from './Logout.js';

function App() {

  return (
    <div>    

    {}
    <Router>
      <Routes>
          <Route
              exact
              path="/"
              element={<BioOrangen />}
          />
          <Route
              path="/admin"
              element={<Admin />}
          />
          {/*<Route
              path="/order"
              element={<OrderStepper />}
          />*/}
          {/*<Route
              path="/order-confirmation"
              element={<OrderConfirmation />}
          />*/}
          <Route
              path="/login"
              element={<Login />}
          />
          <Route
              path="/logout"
              element={<Logout />}
          />
      </Routes>
    </Router>
  </div>
  
  );
}

export default App;
