import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import AppointmentBookingPage from './clientAppointmentBooking';




export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <AppointmentBookingPage/>
}