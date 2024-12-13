import React, { useState } from 'react';
import '../pages/Booking.css';


const PeopleSelector = ({ onPeopleChange }) => {
  const [peopleAmount, setPeopleAmount] = useState(1);

  const handleInputChange = (e) => {
    const peopleAmount = e.target.value;
    setPeopleAmount(peopleAmount);

    // Om en callback-funktion skickas som prop, skicka tillbaka värdet
    if (onPeopleChange) {
      onPeopleChange(peopleAmount);
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="people">Amount of people:<br/></label>
        <input
          type="number"
          id="people"
          min="1"
          max="12"
          value={peopleAmount}
          onChange={handleInputChange}
          required
        />
      </div>
    </form>
  );
}

export default PeopleSelector;
