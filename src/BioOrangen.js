import { Link } from "react-router-dom";
import logo from './o_logo_icon.png';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


const BioOrangen = () => {
    const navigate = useNavigate();

  const goToOrder=()=>{
    navigate("/order");
  }
    
    return (
      <div className="bg-orange-100">
      {/* Header */}
      <header className="text-center py-6 bg-orange-400 text-white p-6 m-0">
        <h1 className="text-4xl font-bold">Bio-Produkte aus Sizilien</h1>
        <p className="mt-2 text-md">Orangen, Mandarinen, Zitronen und Olivenöl direkt vom Feld</p>
      </header>
      <div className="w-full h-56 bg-cover bg-center" style={{ backgroundImage: `url(${require('./images/bioorangen14.jpg')})` }}></div>
      

      
      <div className="p-4">
      {/* Produkte Section */}
      <section className="my-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800">Unsere Produkte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div>
            <img src={require('./images/bioorangen15.jpg')} alt="Orangen" className="w-full h-64 object-cover rounded-lg shadow-md mb-2" />
            <h3 className="text-xl font-bold text-orange-600">Orangen</h3>
            <p>Erntezeit: Mitte November bis Mitte März</p>
            <p>Sorten: Navelina (Mitte November), Tarocco (Mitte Dezember – Mitte März)</p>
            <p>Preis: 1 Harass (16-19 kg) - 45,00 CHF | ½ Harass (8-9 kg) - 22,50 CHF</p>
          </div>
          <div>
            <img src={require('./images/bioorangen6.jpg')} alt="Zitronen" className="w-full h-64 object-cover rounded-lg shadow-md mb-2" />
            <h3 className="text-xl font-bold text-orange-600">Zitronen</h3>
            <p>Erntezeit: Ende Dezember bis März</p>
            <p>Preis: 1 Harass (16-19 kg) - 64,00 CHF | ½ Harass (8-9 kg) - 32,00 CHF | Per Kilo - 4,00 CHF</p>
          </div>
          <div>
            <img src={require('./images/bioorangen4.jpg')} alt="Mandarinen" className="w-full h-64 object-cover rounded-lg shadow-md mb-2" />
            <h3 className="text-xl font-bold text-orange-600">Mandarinen</h3>
            <p>Erntezeit: Mitte November bis Ende Januar</p>
            <p>Preis: 1 Harass (16-19 kg) - 56,00 CHF | ½ Harass (8-9 kg) - 28,00 CHF | Per Kilo - 3,50 CHF</p>
          </div>
          <div>
            <img src={require('./images/bioorangen17.jpg')} alt="Olivenöl" className="w-full h-64 object-cover rounded-lg shadow-md mb-2" />
            <h3 className="text-xl font-bold text-orange-600">Bio-Olivenöl</h3>
            <p>Preis: 0.75 L - 24,00 CHF | 5 Liter Kanister - 130,00 CHF</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="my-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800">Unsere Geschichte</h2>
        <p className="mt-4 text-gray-600">
        Claudia aus der Schweiz und Rosy aus demSüdtirol haben gemeinsam
        2011 in Sizilien eine Orangenplantage erworben und mit grossem
        Engagement zu dem Erfolg gemacht, der sie heute ist. Auf der Plantage
        werden ausschliesslich Bio-Produkte angebaut. Im Sortiment bieten sie
        frische Orangen, Zitronen, Mandarinen und hochwertiges Olivenöl an.
        Hinter diesem Projekt steckt jede Menge Power und Herzblut, mit dem die
        beiden Frauen ihre Vision für nachhaltige Landwirtschaft verwirklichen.
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
            slidesPerView={2}
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

      {/* Bestellinformationen Section */}
      <section className="my-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800">Bestellinformationen</h2>
        <p className="mt-2 text-gray-600">Vom Pflücken bis zur Lieferung in die Schweiz dauert der gesamte
          Ablauf <b>fünf</b> Tage, wobei alle Schritte auf Frische, Qualität und Effizienz
          ausgerichtet sind.
        </p>
        <p className="mt-4 text-gray-600 text-md">
          Die <b>Zahlung</b> erfolgt bei Abholung in <b>bar</b> oder per <b>Banküberweisung</b>.
          In Ausnahmefällen kann die Zahlung über <b>Twint</b> erfolgen.
        </p>
        <h2 className="mt-4 text-lg">
          Abholort: Rietstrasse 28, 8733 Eschenbach
        </h2>
        <button onClick={goToOrder} className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
          Jetzt bestellen
        </button>
      </section>

      {/* Lagerungstips Section */}
      <section className="my-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800">Lagerungstipps für Orangen</h2>
        <p className="mt-4 text-gray-600">
        Orangen bleiben am besten frisch, wenn du sie richtig lagerst.<br></br>Hier sind ein paar 
        <b> Tipps:</b><br></br>
        <ol className="list-decimal list-inside	">
        <li>Prüfen sie nach Erhalt ihrer Früchte auf Druckstellen und Beschädigungen geniessen
        sie diese als erste.</li>
        <li>Staple Orangen möglichst nicht übereinander.</li>
        <li>Die optimale Lagertemperatur für Orangen liegt zwischen 3 und 9 Grad Celsius. Die
        Früchte können auch im Aussenbereich gelagert werden, idealerweise jedoch mit
        einer schützenden Decke oder in einer Styroporkiste, in der sie lagenweise mit Stroh
        oder Zeitungspapier getrennt sind. Direkte Sonneneinstrahlung sollte dabei
        unbedingt vermieden werden.</li>
        </ol>
        <b>Regelmässig kontrollieren:</b> Überprüfe deine Orangen regelmässig auf Druckstellen
        oder Schimmel. Manchmal reicht eine schlechte Orange, um die anderen schneller
        verderben zu lassen
        </p>
      </section>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        © {new Date().getFullYear()} BioOrangen.ch | Rietrasse 28, 8733 Eschenbach
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