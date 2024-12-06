import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";

const OrderDeactivateButton = () => {

  const [deactivated, setDeactivated] = useState([]);

  // Deaktivert Status aus Firestore abrufen
  const fetchDeactivated = async () => {
    const q = query(collection(db, "deactivated"));

    try {
      const querySnapshot = await getDocs(q);
      const deactivatedData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDeactivated(deactivatedData);
    } catch (error) {
      console.error("Fehler beim Abrufen der Bestellungen:", error);
    }
  };

  useEffect(() => {
    fetchDeactivated();
  }, []);

  const isDeactivated = deactivated[0]?.deactivated;

  /* get DocumentId from Dataset where id is set */
  const getDocumentId = async () => {
    try {
      const q = query(collection(db, "deactivated"), where("id", "==", 1))
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

  const handleDeactivate = async () => {
    const documentId = await getDocumentId();

    try {
      await updateDoc(doc(db, "deactivated", documentId), {
        deactivated: !isDeactivated,
      });
      console.log("Bestellungen erfolgreich deaktiviert/aktiviert");
    } catch (error) {
      console.error("Fehler beim Deaktivieren/Aktivieren der Bestellungen:", error);
    }
    window.location.reload();
  };

  return <button className={`${isDeactivated ? "bg-green-500 hover-bg-green-400" : "bg-red-500 hover:bg-red-400"} text-white font-bold py-2 px-4 rounded`} onClick={handleDeactivate} > 
            {isDeactivated ? "Bestellungen aktiv" : "Bestellungen inaktiv"}
         </button>  
};

export default OrderDeactivateButton;
