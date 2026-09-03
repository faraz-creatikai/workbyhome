import React from 'react'
import ContactUsPage from './contactClient'
import { generateSEOMetadata } from '../../../lib/seometadata';
export const generateMetadata = generateSEOMetadata;
function page() {
  return <ContactUsPage/>
}

export default page
