'use client';

import React from 'react';
import { useState, useMemo } from 'react';
import { BookingContext } from './context/BookingContext';

export default function BookingProviderClient({ children, initialData }) {
  const [bookingData, setBookingData] = useState(initialData);

  const value = useMemo(() => ({
    bookingData,
    setBookingData,
  }), [bookingData]);

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}
