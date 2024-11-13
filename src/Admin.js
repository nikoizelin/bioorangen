import React, { useState, useEffect } from "react";
import { db, auth } from "./firebaseConfig";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Bestellungen aus Firestore abrufen
  const fetchOrders = async () => {
    const q = searchQuery
      ? query(collection(db, "orders"), where("customer.name", ">=", searchQuery))
      : collection(db, "orders");

    try {
      const querySnapshot = await getDocs(q);
      const ordersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
    } catch (error) {
      console.error("Fehler beim Abrufen der Bestellungen:", error);
    }
  };

  {/* get DocumentId from Dataset where id is set */}
  const getDocumentIdFromValueId = async (idValue) => {
    try {
      const q = query(collection(db, "orders"), where("id", "==", idValue));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0]; // Gets the first matching document
        const documentId = document.id; // Firestore document ID
        console.log("Document ID found:", documentId);
        return documentId;
      } else {
        console.log("No document found with the specified ID value");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving document:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchQuery]); // Neue Abfrage, wenn sich die Suche ändert

  // Popup-Handling
  const openCartPopup = (order) => {
    setSelectedOrder(order);
    setShowCartPopup(true);
  };

  const closeCartPopup = () => {
    setShowCartPopup(false);
    setSelectedOrder(null);
  };

  // Update-Handler für den bezahlt-Status
  const handlePaidStatusChange = async (orderId, currentStatus) => {
    try {
      const documentID = await getDocumentIdFromValueId(orderId);
      if (documentID) {
      // Datenbank-Update
      const orderRef = doc(db, "orders", documentID);
      await updateDoc(orderRef, { bezahlt: !currentStatus });
      }
      // Lokale Liste aktualisieren
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, bezahlt: !currentStatus } : order
        )
      );

      console.log(`Bestellung ${orderId} als bezahlt markiert.`);
    } catch (error) {
      console.error("Fehler beim Aktualisieren des bezahlt-Status:", error);
    }
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user state when logged in
      } else {
        setUser(null); // Set user to null when logged out
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  if (user === null) {
    navigate('/login');
  }

  let productAmounts = {};

  
  orders.forEach(orderData => {
    orderData.order.forEach(order => {
        const productId = order.productId;
        const amount = parseFloat(order.amount); // sicherstellen, dass amount als Zahl behandelt wird

        if (productAmounts[productId]) {
            productAmounts[productId] += amount;
        } else {
            productAmounts[productId] = amount;
        }
    })
});


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Bestellübersicht</h1>
            {/* Total-Kilo */}
            <div className="my-4">
        Total Kilo Orangen: <b>{productAmounts[1] != null ? productAmounts[1] : 0 } kg</b><br></br>
        Total Kilo Zitronen: <b>{productAmounts[2] != null ? productAmounts[2] : 0 } kg</b><br></br>
        Total Kilo Mandarinen: <b>{productAmounts[3] != null ? productAmounts[3] : 0 } kg</b><br></br>
      </div>
      {/* Suchfeld */}
      <input
        type="text"
        placeholder="Nach Kundenname suchen..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border rounded-lg p-2 mb-4 w-full max-w-md"
      />

      {/* Bestellungen Tabelle */}
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Kunde</th>
            <th className="p-3 text-left">Telefon</th>
            <th className="p-3 text-left">Ort</th>
            <th className="p-3 text-left">Bezahlt</th>
            <th className="p-3 text-left">Zeit</th>
            <th className="p-3 text-left">Aktion</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-3">{order.customer?.name} {order.customer?.surname}</td>
              <td className="p-3">{order.customer?.phone}</td>
              <td className="p-3">{order.customer?.city}</td>
              <td className="p-3">
                <input
                  className="w-6 h-6"
                  type="checkbox"
                  checked={order.bezahlt}
                  onChange={() => handlePaidStatusChange(order.id, order.bezahlt)}
                />
              </td>
              <td className="p-3">{new Date(order.timestamp?.seconds * 1000).toLocaleString()}</td>
              <td className="p-3">
                <button
                  onClick={() => openCartPopup(order)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Bestellung
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Warenkorb-Popup */}
      {showCartPopup && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Bestellung von {selectedOrder.customer?.name} {selectedOrder.customer?.surname}</h2>
            <ul>
              {selectedOrder.order.map((item, index) => (
                <li key={index} className="border-b p-2">
                  {item.amount} kg {item.name} = {(item.amount * item.price).toFixed(2)} CHF
                </li>
              ))}
              <li className="border-t text-lg font-bold p-2">
                Total: {selectedOrder.order.reduce((sum, item) => sum + (item.amount * item.price), 0).toFixed(2)} CHF
              </li>
            </ul>
            <button onClick={closeCartPopup} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
              Schliessen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
