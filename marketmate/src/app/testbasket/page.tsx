"use client";
import React, { useState } from 'react';
import BasketProduct from '../_components/BasketProduct';

export default function Page() {
  // State to control popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Sample product data that you need to pass to the BasketProduct component
  const productData = {
    imageUrl: 'path_to_product_image.jpg', // replace with your image path
    title: 'BlendMaster Elite Fusionator',
    variant: 'EU',
    price: 199.00,
    originalPrice: 299.00,
    quantity: 1
  };

  // Function to toggle the popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <button onClick={togglePopup}>Show Basket Item</button>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-inner">
            <button onClick={togglePopup} className="close-button">Close</button>
            {/* Pass the required props to BasketProduct */}
            <BasketProduct {...productData} />
          </div>
        </div>
      )}
      {/* ... other parts of your page */}
    </div>
  );
}