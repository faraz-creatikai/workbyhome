import React from 'react'
import BrokerNetworkPage from './clientBroker'
import { generateSEOMetadata } from '../../../../lib/seometadata';


export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <BrokerNetworkPage/>
}
