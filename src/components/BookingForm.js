import BookingDateForm from "../components/BookingDateTimeForm";
import PeopleSelector from "../components/BookingPeopleAmountForm";
import TableDropdown from "../components/BookingTableForm.js";
import CustomerNameInput from "../components/BookingNameForm.js";
import CustomerPhoneInput from "./BookingPhoneForm.js";
import React, { useState, useEffect } from 'react';
import "../pages/Booking.css";
import axios from 'axios';


const BookingForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customers, setCustomers] = useState([]);
    const [bookingDate, setBookingDate] = useState('');
    const [peopleAmount, setPeopleAmount] = useState(1);
    const [selectedTable, setSelectedTable] = useState('');

    
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("https://localhost:7005/api/Customer/GetAllCustomers");
                console.log("Hämtade kunder:", response.data);
                setCustomers(response.data);
            } catch (error) {
                console.error("Kunde inte hämta kunder:", error);
            }
        };
    
    useEffect(() => {
        fetchCustomers();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Kontrollera att alla fält är ifyllda
      if (!customerName || !bookingDate || !selectedTable || !peopleAmount || !customerPhone) {
        alert('Please fill in all fields before submitting.');
        return;
      }

      const matchedCustomer = customers.find(
        (customer) => customer.customerName.toLowerCase() === customerName.toLowerCase() && String(customer.phone).trim === String(customerPhone).trim)

    console.log("Matched customer:", matchedCustomer);

    if(!matchedCustomer) {
        try {
            const newCustomer = {
                CustomerName: customerName,
                Phone: customerPhone
            };
            const response = await axios.post('https://localhost:7005/api/Customer/AddCustomer', newCustomer);
            await fetchCustomers();
        } catch (error) {
            console.error("Fel vid skapande av kund:", error);
            return;
        }
        const matchedCustomer2 = customers.find(
            (customer) => customer.customerName.toLowerCase() === customerName.toLowerCase() && String(customer.phone).trim === String(customerPhone).trim)

        const bookingData = {
            Id: 0,
            Customers :matchedCustomer2,
            Tables: selectedTable,
            BookingDate :new Date(bookingDate).toISOString().slice(0, 19),
            PeopleAmount :peopleAmount,
          };
    
          console.log(bookingData);

        try {
            // Skicka POST-request till API:t
            const response = await axios.post('https://localhost:7005/api/Booking/AddBooking', bookingData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
      
            if (response.status === 200) {
              alert('Booking created successfully!');
              console.log('Booking Response:', response.data);
              // Återställ formuläret eller navigera till annan sida
            } else {
              alert('Failed to create booking. Please try again.');
            }
          } catch (error) {
            console.error('Error creating booking:', error);
            alert('An error occurred while creating the booking.');
            console.error("Error details:", error.response?.data || error.message);
          }

    }
    else {

        const bookingData = {
            Id: 0,
            Customers :matchedCustomer,
            Tables: selectedTable,
            BookingDate :new Date(bookingDate).toISOString().slice(0, 19),
            PeopleAmount :peopleAmount,
          };
    
          console.log(bookingData);

        try {
            // Skicka POST-request till API:t
            const response = await axios.post('https://localhost:7005/api/Booking/AddBooking', bookingData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
      
            if (response.status === 200) {
              alert('Booking created successfully!');
              console.log('Booking Response:', response.data);
              // Återställ formuläret eller navigera till annan sida
            } else {
              alert('Failed to create booking. Please try again.');
            }
          } catch (error) {
            console.error('Error creating booking:', error);
            alert('An error occurred while creating the booking.');
            console.error("Error details:", error.response?.data || error.message);
          }
    }

    console.log("Written Customer:", customerName);
    console.log("Found Customer:", matchedCustomer);
    console.log("Table: ", selectedTable);
    console.log(bookingDate);
    console.log("PeopleAmount: ", peopleAmount);

    };

    return (
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="booking-form-wrapper">
            <h2>Create a Booking</h2>
                
            {/* Kundens namn */}
            <div className="form-group">
                <CustomerNameInput onNameChange={setCustomerName} />
            </div>

            {/* Kundens telefon */}
            <div className="form-group">
                <CustomerPhoneInput onPhoneChange={setCustomerPhone} />
            </div>
        
            {/* Datum och tid */}
            <div className="form-group">
                <BookingDateForm onDateChange={setBookingDate} />
            </div>
            
            {/* Antal personer */}
            <div className="form-group">
                <PeopleSelector onPeopleChange={setPeopleAmount}  />
            </div>
            {/* Välj bord */}
            <div className="form-group">
                <TableDropdown onTableSelect={setSelectedTable} peopleAmount={peopleAmount} bookingDate={bookingDate} />
            </div>
            {/* Submit-knapp */}
          </div>
          <div className="line"></div>
            
                <button type="submit" className="btn btn-primary">
                    Boka
                </button>
            
        </form>
      );
    };
    
    export default BookingForm;