import React, { useState } from 'react';
import ProductCards from './ProductCards';
import PersonalInfo from './PersonalInfo';
import Confirmation from './Confirmation';



import { useNavigate } from "react-router-dom";


const OrderStepper = () => {
  const steps = ["Produkt auswählen", "Informationen", "Zusammenfassung"];
  const [currentStep, setCurrentStep] = useState(0);
  const [itemSelected, setItemSelected] = useState(false);
  const navigate = useNavigate();
  let path = `/`; 

  const progressPercentage = (currentStep / (steps.length - 1)) * 100;


  const handleItemSelected = (selected) => {
    setItemSelected(selected); // Update the parent state with the product data from the child
  };

  const goToNextStep = () => {

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }

  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    else {
      navigate(path);
    }
  };

    const project = () => {
  switch(currentStep) {

    case 0:   return <ProductCards onItemSelected={handleItemSelected} />;
    case 1:   return <PersonalInfo nextStepState={goToNextStep} />;
    case 2: return <Confirmation />
    default: return <h1>Es kann kein Inhalt geladen werden. Kehren Sie <a className="text-orange-600 hover:underline" href="/">hier</a> zur Homepage zurück.</h1>;
  }
}

  return (
    <div className="relative w-full max-w-6xl mx-auto pl-8 pr-8 mt-8 mb-8">
      {/* Stepper Header */}
      <div className="flex justify-between mb-6">
        {steps.map((step, index) => (
          <div key={index} className="text-center flex-1">
            <div
              className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center
                ${index <= currentStep ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'}`}
            >
              {index + 1}
            </div>
            <p className={`mt-2 text-sm ${index <= currentStep ? 'text-orange-600' : 'text-gray-500'}`}>
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 mb-6 bg-gray-300 rounded">
        <div
          className="absolute top-0 left-0 h-2 bg-orange-500 rounded"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Stepper Content */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Schritt {currentStep + 1}: {steps[currentStep]}
        </h2>
        {project()}
      </div>

      {/* Stepper Controls */}
      <div className="flex w-full max-w-6xl mx-auto justify-between left-0 right-0 bottom-0 bg-white">
        <button
          onClick={goToPreviousStep}
          className={`px-4 py-2 bg-gray-300 text-gray-700 rounded`}
        >
          Zurück
        </button>

        <button
          onClick={ currentStep != 2 ? goToNextStep : ()=>navigate("/order-confirmation")}
          disabled={!itemSelected}
          className={`px-4 py-2 bg-orange-500 text-white rounded
            ${currentStep == 1 ? 'hidden' : ''}
            ${!itemSelected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
        >
          {currentStep !== 2 ? 'Weiter' : 'Bestellen'}
        </button>
      </div>
    </div>
  );
}

export default OrderStepper;
