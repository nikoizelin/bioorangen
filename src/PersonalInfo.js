import React, { useState, useEffect } from 'react';


function PersonalInfo({nextStepState}) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    street: '',
    postcode: '',
    city: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [loadingCity, setLoadingCity] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [name]: formattedPhone,
      });
    }
      else {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    // If postcode changes, fetch the city
    if (name === 'postcode' && value.length === 4) {
      fetchCity(value);
    }
  };

  // Function to format phone number
  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');

    // Format the cleaned number into 'xxx xxx xx xx'
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (match) {
      return [match[1], match[2], match[3], match[4]]
        .filter((group) => group)
        .join(' ');
    }
    return value;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Gebe einen Vornamen ein';
    if (!formData.surname) newErrors.surname = 'Gebe einen Nachnamen ein';
    if (!formData.street) newErrors.street = 'Gebe eine Strasse ein';
    if (!formData.postcode) newErrors.postcode = 'Gebe eine PLZ ein';
    if (!formData.city) newErrors.city = 'Gebe eine Stadt ein';
    if (!formData.phone || !/^(\d{3})\s(\d{3})\s(\d{2})\s(\d{2})$/.test(formData.phone)) newErrors.phone = 'Gebe eine gültige Telefonnummer ein';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Gebe eine gültige E-Mail-Adresse ein';
    return newErrors;
  };

   // Lade formData aus dem LocalStorage bei der Komponente-Initialisierung
   useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Form submission logic here
      localStorage.setItem('formData', JSON.stringify(formData));
      nextStepState();
  };
    }

  const fetchCity = (postcode) => {
    setLoadingCity(true);
    fetch(`https://api.zippopotam.us/CH/${postcode}`) //fetch postcode switzerland
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Invalid postcode');
      })
      .then((data) => {
        const city = data.places[0]['place name']; // Extract city from response
        setFormData((prevState) => ({
          ...prevState,
          city,
        }));
        setLoadingCity(false);
      })
      .catch((error) => {
        console.error('Error fetching city:', error);
        setLoadingCity(false);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white text-left">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Vorname: <i class="error">*</i></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Nachname: <i class="error">*</i></label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.surname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.surname && <p className="text-red-500 text-sm">{errors.surname}</p>}
          </div>
        </div>

          <div className="mb-4">
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">Strasse, Nr: <i class="error">*</i></label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.street ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`} 
          />
          {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
          </div>

        <div className="grid grid-cols-1 grid-flow-* grid-cols-[19%_78%] gap-4 mb-4">
          <div>
          <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">PLZ: <i class="error">*</i></label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.postcode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.postcode && <p className="text-red-500 text-sm">{errors.postcode}</p>}
          </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">Stadt: <i class="error">*</i></label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
      </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon: <i class="error">*</i></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="XXX XXX XX XX"
            className={`mt-1 block w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Mail: <i class="error">*</i></label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        {/* Submit button */}
        <button
            type="submit"
            className="absolute bottom-0 right-8 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Weiter
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;
