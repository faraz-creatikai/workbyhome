import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import InboundSupportPage from './clientInboundSupport';



export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <InboundSupportPage/>
}