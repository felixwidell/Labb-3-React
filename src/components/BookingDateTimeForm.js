import React, { useState } from 'react';
import '../pages/Booking.css';

const BookingDateForm = ({ onDateChange }) => {
  const [date, setDate] = useState('');


  const handleChange = (e) => {
    const date = e.target.value;
    setDate(date);

    // Om en callback-funktion skickas som prop, skicka tillbaka värdet
    if (onDateChange) {
      onDateChange(date);
    }
  };



  return (
    <form>
       <div>
            <label htmlFor="datetime">Choose a date:<br/></label>
            <input
                type="datetime-local"
                id="date"
                value={date}
                onChange={handleChange}
            />
        </div>
    </form>
  );
}

export default BookingDateForm;
