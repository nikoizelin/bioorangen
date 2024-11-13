import React, { useState, useEffect } from 'react';

function ProductCard({ onItemSelected }) {
  const products = [
    { id: 1, name: 'Orangen', price: 2.8125, image: require('./images/bioorangen16.jpg') },
    { id: 2, name: 'Zitronen', price: 4.0, image: require('./images/bioorangen3.jpg') },
    { id: 3, name: 'Mandarinen', price: 3.50, image: require('./images/bioorangen4.jpg') },
    //{ id: 4, name: 'Olivenöl', price: 32.00, image: require('./images/bioorangen17.jpg') },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null); // For modal popup
  let [selectedAmount, setSelectedAmount] = useState(""); // Default amount (kg)
  const random = Math.floor(Math.random() * 1000);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }); // Cart state
  let total = 0;
  let totalPrice = cart
  .reduce((sum, item) => sum + item.price * item.amount, 0)
  .toFixed(2);


  // Handle card click to open modal with product details
  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleItemSelected = (selected) => {
    onItemSelected(selected); // Call the parent function and pass the selected product
  };

  //if cart length more than 1 then send true to parent
  if(cart.length >= 1){
    {handleItemSelected(true);}
  }

  // Close modal and reset amount to default
  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedAmount(selectedAmount); // Reset amount on close
  };

  // Add selected product to cart
  const addToCart = () => {
    const newCartItem = {
      id: `${selectedProduct.id}-${random}`, // Unique ID for each product-amount pair
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price, 
      amount: selectedAmount,
    };
    selectedAmount = "";

    //setCart((prevCart) => [...prevCart, newCartItem]);
    setCart((prevCart) => {
      const updatedCart = [...prevCart, newCartItem];
      localStorage.setItem('cart', JSON.stringify(updatedCart));  // Lokale Speicherung direkt hier
      return updatedCart;
   });
    closeModal(); // Close modal after adding to cart
  };

  // Handle removing an item from the cart
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
    if(cart.length === 1){
        {handleItemSelected(false)}
      }
      else{
          {handleItemSelected(true)}
      }
      localStorage.setItem('cart', JSON.stringify(cart));
  };

    // Lade CartData aus dem LocalStorage bei der Komponente-Initialisierung
   /* useEffect(() => {
    
      const savedData = localStorage.getItem('cart');
  
      if (savedData) {  
        alert(savedData.length);
        setCart(JSON.parse(savedData));
        {handleItemSelected(true)}
      }
      else {
        {handleItemSelected(false)}
      }
    }, []);*/

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
   }, [cart]);

  return (
    <div className="container mx-auto p-6">
      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg cursor-pointer"
            onClick={() => handleCardClick(product)}
          >
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600">{product.price.toFixed(2)}{product.id !== 4 ? " CHF/kg" : "CHF/L"}</p>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Warenkorb</h2>
        {cart.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Produkt</th>
                  <th className="py-3 px-6 text-center">Menge</th>
                  <th className="py-3 px-6 text-center">Preis</th>
                  <th className="py-3 px-6 text-right">Aktion</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {cart.map((item) => (
                 total = (item.price * item.amount).toFixed(2),
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <span className="font-medium">{item.name}</span>
                    </td>
                    <td className="py-3 px-6 text-center">{item.amount} {item.productId !== 4 ? "kg" : "L"}</td>
                    <td className="py-3 px-6 text-center">{total} CHF</td>
                    <td className="py-3 px-6 text-right">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        ✖
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <td className="py-3 px-6 text-left">Total</td> 
                  <td>{totalPrice} CHF</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">Dein Warenkorb ist leer.</p>
        )}
      </div>

      {/* Modal Popup with Amount Selector */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold mb-4">{selectedProduct.name}</h3>
            <p className="text-lg mb-4">{selectedProduct.price.toFixed(2)}{selectedProduct.id !== 4 ? " CHF/kg" : " CHF/L"}</p>

            {/* Amount Selector */}
            <div className="mb-6">
              <label htmlFor="amount" className="block text-gray-700 mb-2">Menge auswählen ({selectedProduct.id !== 4 ? "kg" : "L"}):</label>
              <select
                id="amount"
                value={selectedAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedAmount(value);
                }}
                onFocus={(e) => {
                  const value = e.target.value;
                  setSelectedAmount(value);
                }}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              >
                {selectedProduct.id !== 1 ? (
                <>
                  <option selected value="">Menge auswählen</option>
                  <option value={1}>1 kg</option>
                  <option value={2}>2 kg</option>
                  <option value={5}>5 kg</option>
                  <option value={8}>½ Harass (8kg)</option>
                  <option value={16}>1 Harass (16kg)</option>
                </>
              ) : (
                <>
                  <option selected value="">Menge auswählen</option>
                  <option value={8}>½ Harass (8kg)</option>
                  <option value={16}>1 Harass (16kg)</option>
                </>
              )}
              </select>
            </div>

            <button
              onClick={addToCart}
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={!selectedAmount}
            >
              {selectedAmount} {selectedProduct.id !== 4 ? "kg" : "L"} zum Warenkorb
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
