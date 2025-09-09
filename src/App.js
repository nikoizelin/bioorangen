import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import BioOrangen from './BioOrangen.js';
import OrderStepper from './OrderStepper.js';
import OrderConfirmation from './OrderConfirmation.js';
import Admin from './Admin.js';
import Login from './Login.js';
import Logout from './Logout.js';
import { db } from "./firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

function App() {

  const [deactivated, setDeactivated] = useState([]);

  // Deaktivert Status aus Firestore abrufen
  const fetchDeactivated = async () => {
    const q = query(collection(db, "deactivated"));

    try {
      const querySnapshot = await getDocs(q);
      const deactivatedData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDeactivated(deactivatedData);
    } catch (error) {
      console.error("Fehler beim Abrufen der Deaktiverung:", error);
    }
  };

  useEffect(() => {
    fetchDeactivated();
  }, []);

  const isDeactivated = true; //deactivated[0]?.deactivated;

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
          {isDeactivated ? (
            <>
            <Route
            path="/order"
            element={<OrderStepper />}
            />
            <Route
            path="/order-confirmation"
            element={<OrderConfirmation />}
            />
            </>
            ) : (
            <>  
            </>
          )}         
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
