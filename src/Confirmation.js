import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


const Confirmation = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({});

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedPersonalInfo = JSON.parse(localStorage.getItem('formData')) || {};

    setCart(savedCart);
    setPersonalInfo(savedPersonalInfo);
  }, []);

  let totalPrice = cart
  .reduce((sum, item) => sum + item.price * item.amount, 0)
  .toFixed(2);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Persönliche Informationen</h3>
        <div className="">
        <p><strong>Vorname:</strong> {personalInfo.name}</p>
        <p><strong>Nachname:</strong> {personalInfo.surname}</p>
        <p><strong>Strasse, Nr:</strong> {personalInfo.street}</p>
        <p><strong>PLZ, Ort:</strong> {personalInfo.postcode} {personalInfo.city}</p>
        <p><strong>Telefon:</strong> {personalInfo.phone}</p>
        <p><strong>E-Mail:</strong> {personalInfo.email}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Warenkorb</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-200"
              >
                <span className="text-lg text-gray-700">{item.name}</span>
                <span className="text-gray-500">{item.amount} {item.productId != 4 ? "kg" : "L"} x {item.price.toFixed(2)} CHF</span>
                <span className="text-gray-900 font-semibold">{(item.amount * item.price).toFixed(2)} CHF</span>
              </li>
            ))}
            <li className="flex justify-between font-semibold items-center py-2">
            <span className="text-lg text-gray-700">Total:</span>
            <span></span>
            <span className="text-lg text-gray-700">{totalPrice} CHF</span>
            </li>
          </ul>
        ) : (
          <p className="text-gray-500">Ihr Warenkorb ist leer.</p>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Zahlung</h3>
          <p className="text-gray-500">Bitte überweise den offenen Betrag per Banküberweisung an</p>
          <p>CH56 0483 5012 3456 7800 9</p>
          <p>Cornelia Helbling</p>
          <p>Rietstrasse 28</p>
          <p>8733 Eschenbach SG</p>
          <p>Verwendungszweck: Bestellung von {personalInfo.name}</p>
      </div>
    </div>
  );
};

export default Confirmation;
