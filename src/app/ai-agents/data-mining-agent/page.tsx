import React from 'react'
import DataMiningAgentLanding from './clientData'
import { generateSEOMetadata } from '../../../../lib/seometadata';
export const generateMetadata = generateSEOMetadata;
function page() {
  return <DataMiningAgentLanding/>
}

export default page
