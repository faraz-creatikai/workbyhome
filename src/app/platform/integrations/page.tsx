import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import CRMIntegrationsPage from './clientIntegrations';







export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <CRMIntegrationsPage/>
}