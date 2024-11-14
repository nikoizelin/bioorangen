import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import checkmark from './animations/checkmark.json'; // Pfad zur JSON-Datei der Animation
import error from './animations/error_x.json'; // Pfad zur JSON-Datei der Animation
import { db } from "./firebaseConfig";  // Importiere die Firestore-Konfiguration
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from '@emailjs/browser';

const OrderConfirmation = () => {
  const defaultOptions = {
    loop: false, // Loop Animation
    autoplay: true, // Startet automatisch
    animationData: checkmark,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const defaultOptions2 = {
    loop: false, // Loop Animation
    autoplay: true, // Startet automatisch
    animationData: error,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  let i= 0;
  const [cart, setCart] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({});

  /*useEffect(() => {
    // Clear localStorage when the browser window or tab is closed
    const handleUnload = () => {
      localStorage.clear();
    };

    window.addEventListener('beforeunload', handleUnload);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);
  */

  const calcTotalPrice = (cart) => {
    let totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.amount, 0)
    .toFixed(2);
    return totalPrice
  }

  const saveOrderToFirestore = async (personalInfo, cart) => {
    try {
      const orderData = {
        id: Math.floor(Math.random() * 999999) + 1,  // here should be the docRef
        customer: personalInfo,
        order: cart,
        bezahlt: false,  // Standardmäßig auf false setzen
        timestamp: serverTimestamp(),  // Automatischer Zeitstempel
      };
  
      // Speichert die Bestellung in der "orders"-Sammlung
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Bestellung erfolgreich gespeichert mit ID:", docRef.id);
    } catch (error) {
        alert(error);
      console.log("Fehler beim Speichern der Bestellung:", error);
    }
  };

  // Beispiel für den Aufruf der Funktion beim Bestätigen
  const handleOrderConfirmation = async (personalInfo, cart) => {
    await saveOrderToFirestore(personalInfo, cart);
  };
  const sendConfirmationEmail = (personalInfo, cart) => {
    const emailParams = {
      user_name: personalInfo.name,
      user_email: personalInfo.email,
      cart_content: JSON.stringify(cart, null, 2)  // Format cart content for readability
    };
  
    emailjs.send(
      process.env.REACT_APP_SERVICE_ID,  // Replace with your EmailJS service ID
      process.env.REACT_APP_TEMPLATE_ID, // Replace with your EmailJS template ID
      emailParams,
      process.env.REACT_APP_PUBLIC_KEY      // Replace with your EmailJS user ID
    )
    .then(response => {
      console.log('Email sent successfully!', response.status, response.text);
    })
    .catch(error => {
      console.error('Failed to send email:', error);
    });
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedPersonalInfo = JSON.parse(localStorage.getItem('formData')) || {};

    setCart(savedCart);
    setPersonalInfo(savedPersonalInfo);

    const handleUnload = () => {
        localStorage.removeItem('cart');
      };
  
      window.addEventListener('beforeunload', handleUnload);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('beforeunload', handleUnload);
      };

  }, []);

  if(personalInfo != null && cart.length > 0 && i===0) {
    i++;
    sendConfirmationEmail(personalInfo, cart);
    handleOrderConfirmation(personalInfo, cart);
    }
    else {
        //alert("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
    }


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    {personalInfo != null && cart.length > 0 ? (
      <>
      {/* Animierter Haken */}
      <Lottie options={defaultOptions} height={150} width={150} />

      {/* Bestätigungstext */}
      <h2 className="text-2xl font-semibold text-center text-green-600 mt-4">
        Hey {personalInfo.name}, Deine Bestellung ist bestätigt!
      </h2>
      <p className="text-gray-600 mt-2 text-center">
        Vielen Dank für deine Bestellung! Du solltest in Kürze eine Bestätigung per E-Mail.
      </p>
      <a href="/" className="text-orange-600 hover:underline mt-2 text-center">
        zurück zur Homepage
      </a>
      </>
      ) : (
      <>
      <Lottie options={defaultOptions2} height={150} width={150} />
      {/* Bestätigungstext */}
      <h2 className="text-2xl font-semibold text-center text-red-600 mt-4">
        Oh nein, es ist ein Fehler aufgetreten :/
      </h2>
      <p className="text-gray-600 mt-2 text-center">
        Versuche nochmal deine Bestellung aufzugeben oder melde dich unter <a href="mailto:contactkandykrush@gmail.com" className="text-orange-600 hover:underline">Mail</a>
      </p>
      <a href="/order" className="text-orange-600 hover:underline mt-2 text-center">
        zurück zur Bestellung
      </a>
      </>
      )}

    </div>
  );
};

export default OrderConfirmation;
