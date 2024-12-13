import React, { useState } from 'react';
import '../pages/Booking.css';

const CustomerNameInput = ({ onNameChange }) => {
  const [customerName, setCustomerName] = useState('');

  // Hantera input-ändringar
  const handleInputChange = (e) => {
    const name = e.target.value;
    setCustomerName(name);

    // Om en callback-funktion skickas som prop, skicka tillbaka värdet
    if (onNameChange) {
      onNameChange(name);
    }
  };

  return (
    <div className="customer-name-input">
      <label htmlFor="customerName">Customer Name<br/></label>
      <input
        type="text"
        id="customerName"
        value={customerName}
        onChange={handleInputChange}
        placeholder="Enter your name"
        className="form-control"
      />
    </div>
  );
};

export default CustomerNameInput;
