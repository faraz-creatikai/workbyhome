import React from 'react'
import ContactSupportPage from './clientContact'
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <ContactSupportPage/>
}
