import React, { useState } from 'react';
import '../pages/Booking.css';

const CustomerPhoneInput = ({ onPhoneChange }) => {
  const [customerPhone, setCustomerPhone] = useState('');

  // Hantera input-ändringar
  const handleInputChange = (e) => {
    const phone = e.target.value;
    setCustomerPhone(phone);

    // Om en callback-funktion skickas som prop, skicka tillbaka värdet
    if (onPhoneChange) {
      onPhoneChange(phone);
    }
  };

  return (
    <div className="customer-phone-input">
      <label htmlFor="customerPhone">Customer Phonenumber:<br/></label>
      <input
        type="number"
        id="customerPhone"
        value={customerPhone}
        onChange={handleInputChange}
        placeholder="Enter your phonenumber"
        className="form-control"
      />
    </div>
  );
};

export default CustomerPhoneInput;