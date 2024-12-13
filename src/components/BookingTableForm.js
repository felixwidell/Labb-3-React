import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/Booking.css';

const TableDropdown = ({ onTableSelect, peopleAmount, bookingDate }) => {
  const [tables, setTables] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');

  // Hämta tillgängliga bord från API
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('https://localhost:7005/api/Table/tables/GetAllTables'); // Ändra URL till ditt API
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://localhost:7005/api/Booking/GetAllBookings'); 
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    if (!peopleAmount || !bookingDate) return;

    const filteredTables = tables.filter((table) => {
        // 1. Kontrollera om bordet har tillräckligt många platser
        const hasEnoughSeats = table.seats >= peopleAmount;

        // 2. Kontrollera om bordet är ledigt på valt datum och tid
        console.log("Tableform bookingdate input:", bookingDate)
        console.log("Tableform bookingdate databas:", bookings)

        const isBooked = bookings.some((booking)  => {
            const bookingDateTime = new Date(booking.bookingDate);
            const inputDateTime = new Date(bookingDate);
    
            // Beräkna tidsdifferens och filtrera bort bord bokade inom 1 timme
            const timeDifference = Math.abs(bookingDateTime - inputDateTime);
            console.log("TableDropdown databasDatum innan konvertering:" , booking.bookingDate)
            console.log("TableDropdown IsBooked databasDate:" , bookingDateTime)
            console.log("TableDropdown IsBooked inputDate:" , inputDateTime)
            console.log("TableDropdown Timedifference:" , timeDifference)
            return booking.tables.id === table.id && timeDifference < 3600000;
        });

        // Bordet är tillgängligt om det har tillräckligt många platser och inte är bokat
        return hasEnoughSeats && !isBooked;
        }); setAvailableTables(filteredTables);
    }, [peopleAmount, bookingDate, tables, bookings]);

    console.log("TableForm availableTables:", availableTables);

  // Hantera ändring av valt bord
  const handleTableChange = (e) => {
    const tableId = e.target.value;
    const tableObject = tables.find((table) => table.id === parseInt(tableId));
    setSelectedTable(tableObject);

    // Skicka det valda bordet till föräldrakomponenten
    if (onTableSelect) {
      onTableSelect(tableObject);
    }
  };


  return (
    <div className="table-dropdown">
      <label htmlFor="table-select">Choose a Table:<br/></label>
      <select
        id="table-select"
        value={selectedTable.id}
        onChange={handleTableChange}
        className="form-control"
      >
        <option value="">-- Select a Table --</option>
        {availableTables.map((table) => (
          <option key={table.id} value={table.id}>
            {`Table ${table.id} - Seats: ${table.seats}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableDropdown;

