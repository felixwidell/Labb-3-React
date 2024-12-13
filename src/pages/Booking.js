import BookingForm from "../components/BookingForm.js";
import React, { useState } from 'react';
import "./Booking.css";

export default function Booking() {
    return(
        <div className="FormBox">
            <BookingForm/>
        </div>
    );

}