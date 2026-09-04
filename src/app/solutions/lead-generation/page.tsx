import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import OutboundLeadGenPage from './clientLeadGeneration';



export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <OutboundLeadGenPage/>
}