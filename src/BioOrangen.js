import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { db } from "./firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";



const BioOrangen = () => {
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

  const isDeactivated = deactivated[0]?.deactivated;

  const navigate = useNavigate();

  const goToOrder=()=>{
    isDeactivated ? navigate("/order") : navigate("/");
  }
  const goToAdmin=()=>{
    navigate("/admin");
  }

  useEffect(() => {
    fetchDeactivated();
  }, []);

    
    return (
      <div className="bg-orange-100">
      {/* Header */}
      <header className="text-center py-6 bg-orange-400 text-white p-6 m-0">
        <h1 className="text-4xl font-bold">Bio-Produkte aus Sizilien</h1>
        <p className="mt-2 text-md">Orangen, Mandarinen, Zitronen und Olivenöl direkt vom Feld</p>
      </header>
      <div className="w-full h-56 bg-cover bg-center" style={{ backgroundImage: `url(${require('./images/bioorangen14.jpg')})` }}></div>
      

      
      <div className="p-4">
      {/* Bestellinformationen Section */}
      <section className="my-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold">Bestellinformationen</h2>
        <p className="mt-2">Vom Pflücken bis zur Lieferung in die Schweiz dauert der gesamte
          Ablauf <b>fünf</b> Tage, wobei alle Schritte auf Frische, Qualität und Effizienz
          ausgerichtet sind.
        </p>
        <p className="mt-4 text-md">
          Abholtermin für die Januar-Bestellung: <b>Freitag Nachmittag, 10. Januar 25</b>
        </p>
        <p className="mt-4 text-md">
          Nächster Bestell- und Liefertermin: <b>Der Bestell-Link wird am 14.01.25 freigeschaltet<br></br>
          Liefertermin ist am 11.02.25</b>
        </p>
        <p className="mt-4 text-md">
          Vielen Dank und herzliche Grüsse <br></br>
          Conny
        </p>
        <p className="mt-4 text-md">
          Die <b>Zahlung</b> erfolgt bei Abholung in <b>bar</b> oder per <b>Banküberweisung</b>.
          In Ausnahmefällen kann die Zahlung über <b>Twint</b> erfolgen.
        </p>
        <div className="mt-4 mb-4 grid grid-cols-1 md:grid-cols-2">
        <p className="mb-4 md:mb-0"><b>Banküberweisung:</b><br></br>
          CH68 8080 8004 3110 3254 2<br></br>
          Cornelia Helbling<br></br>
          Rietstrasse 28<br></br>
          8733 Eschenbach SG<br></br>
        </p>
        <p><b>Twint:</b><br></br>
          Cornelia Helbling<br></br>
          079 488 06 39
        </p>
        </div>
        <h2 className="text-lg">
          Abholort: Rietstrasse 28, 8733 Eschenbach<br></br>
        </h2>
        <button onClick={goToOrder} className={"mt-6 w-full text-white font-semibold py-3 rounded-lg transition-colors duration-300 " + (isDeactivated ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-500 hover:bg-gray-600')}>
          {isDeactivated ? "Jetzt bestellen!" : "Ausverkauft! Nächster Liefertermin: 11. Februar 2025"}
        </button>
      </section>

      {/* Produkte Section */}
      <section className="my-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold">Unsere Produkte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div>
            <img src={require('./images/bioorangen15.jpg')} alt="Orangen" className="w-full h-64 object-cover rounded-lg shadow-md mb-2" />
            <h3 className="text-xl font-bold text-orange-600">Orangen</h3>
            <p className="mb-1"><b>Erntezeit:</b><br></br>Mitte November bis Mitte März</p>
            <p><b>Preis:</b></p>
              <div className="grid grid-cols-3 md:pr-32">
                <p>½ Harass</p><p>(8-9 kg)</p><p>22,50 CHF</p>
              </div>
              <div className="grid grid-cols-3 md:pr-32">
                <p>1 Harass</p><p>(16-19 kg)</p><p>45,00 CHF</p>
              </div>
          </div>
          <div>
            <img src={require('./images/bioorangen6.jpg')} alt="Zitronen" className="w-full h-64 object-cover rounded-lg shadow-md mb-2" />
            <h3 className="text-xl font-bold text-orange-600">Zitronen</h3>
            <p className="mb-1"><b>Erntezeit:</b><br></br>Ende Dezember bis März</p>
            <p><b>Preis:</b></p>
              <div className="grid grid-cols-3 md:pr-32">
                <p>Per Kilo</p><p></p><p>4,00 CHF</p>
              </div>
              <div className="grid grid-cols-3 md:pr-32">
                <p>½ Harass</p><p>(8-9 kg)</p><p>32,00 CHF</p>
              </div>
              <div className="grid grid-cols-3 md:pr-32">
                <p>1 Harass</p><p>(16-19 kg)</p><p>64,00 CHF</p>
              </div>
          </div>
          <div>
            <img src={require('./images/bioorangen4.jpg')} alt="Mandarinen" className="w-full h-64 object-cover rounded-lg shadow-md mb-2" />
            <h3 className="text-xl font-bold text-orange-600">Mandarinen</h3>
            <p className="mb-1"><b>Erntezeit:</b><br></br>Mitte November bis Ende Januar</p>
            <p><b>Preis:</b></p>
              <div className="grid grid-cols-3 md:pr-32">
                <p>Per Kilo</p><p></p><p>3,50 CHF</p>
              </div>
              <div className="grid grid-cols-3 md:pr-32">
                <p>½ Harass</p><p>(8-9 kg)</p><p>28,00 CHF</p>
              </div>
              <div className="grid grid-cols-3 md:pr-32">
                <p>1 Harass</p><p>(16-19 kg)</p><p>56,00 CHF</p>
              </div>
          </div>
          <div>
            <img src={require('./images/bioorangen17.jpg')} alt="Olivenöl" className="w-full h-64 object-cover rounded-lg shadow-md mb-2" />
            <h3 className="text-xl font-bold text-orange-600">Bio-Olivenöl</h3>
            <p><b>Preis:</b></p>
              <div className="grid grid-cols-2 md:pr-32">
                <p>0.75 L</p><p>24,00 CHF</p>
              </div>
              <div className="grid grid-cols-2 md:pr-32">
                <p>5.0 L</p><p>130,00 CHF</p>
              </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="my-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold">Unsere Geschichte</h2>
        <p className="mt-4">
        <b>Claudia</b> aus der Schweiz und <b>Rosy</b> aus dem Südtirol haben gemeinsam
        2011 in Sizilien eine Orangenplantage erworben und mit grossem
        Engagement zu dem Erfolg gemacht. Auf der Plantage
        werden ausschliesslich <b>Bio-Produkte</b> angebaut. Im Sortiment bieten sie
        frische Orangen, Zitronen, Mandarinen und hochwertiges Olivenöl an.
        Mit viel Power und Herzblut stehen sie für ihre nachhaltigen Landwirtschaftprodukte.
        </p>

        {/* Image Gallery */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src={require('./images/bioorangen9.jpg')} alt="Claudia und Rosy" className="w-full h-64 object-cover rounded-lg shadow-md" />
          <img src={require('./images/bioorangen19.jpeg')} alt="Orangenwagen" className="w-full h-64 object-cover rounded-lg shadow-md" />
        </div>

        {/* Image Swiper */}
        <div className="mt-4">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            pagination={{ clickable: true }}
            className="w-full h-64"
          >
            <SwiperSlide>
              <img src={require('./images/bioorangen15.jpg')} alt="Orangenbaum" className="w-full h-full object-cover rounded-lg shadow-md" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require('./images/bioorangen5.jpg')} alt="Orangenplantage" className="w-full h-full object-cover rounded-lg shadow-md" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require('./images/bioorangen23.jpeg')} alt="Haus in Sizilien" className="w-full h-full object-cover rounded-lg shadow-md" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require('./images/bioorangen1.jpg')} alt="Lemon Tree" className="w-full h-full object-cover rounded-lg shadow-md" />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Lagerungstips Section */}
      <section className="my-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold">Lagerungstipps für Orangen</h2>
        <p className="mt-4 mb-4">
        Orangen bleiben am besten frisch, wenn du sie richtig lagerst.<br></br>Hier sind ein paar 
        <b> Tipps:</b><br></br></p>
        <ol className="list-decimal list-inside	">
        <li className="mb-4">Prüfen sie nach Erhalt ihrer Früchte auf <b>Druckstellen</b> und Beschädigungen geniessen
        sie diese als erste.</li>
        <li className="mb-4">Staple Orangen möglichst <b>nicht übereinander.</b></li>
        <li className="mb-4">Die optimale Lagertemperatur für Orangen liegt zwischen <b>3 und 9 Grad Celsius</b>. Die
        Früchte können auch im Aussenbereich gelagert werden. Idealerweise sollten sie mit einer Decke oder lose in
        einer Styroporkiste vor direktem Sonnenlicht geschützt werden.</li>
        </ol>
        <p><b>Regelmässig kontrollieren:</b> Überprüfe deine Orangen regelmässig auf Druckstellen
        oder Schimmel. Manchmal reicht eine schlechte Orange, um die anderen schneller
        verderben zu lassen
        </p>
      </section>
      </div>

      {/* Footer */}
      <footer className="text-center py-8">
        © <a onClick={goToAdmin} >BioOrangen.ch </a> | Rietrasse 28, 8733 Eschenbach
      </footer>
    </div>
  );
};
      /*<div className="flex flex-col items-center justify-center min-h-screen bg-orange-100">
        <img src={require('./o_logo.png')} alt="Logo" className="mb-8 w-96" />
        <ul class="landing-container text-lg text-center mb-8 list-none">
          <li>1. Wähle deine Produkte</li>
          <li>2. Gib deine persönlichen Daten an</li>
          <li>3. Hole deine Orangenbestellung bei uns zuhause ab</li>
        </ul>
        <button onClick={() => goToOrder()} className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
          Jetzt Bestellen!
        </button>
      </div>
    );
  };*/
  
  export default BioOrangen;