import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import VirtualReceptionistPage from './clientVirtualReceptionist';



export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <VirtualReceptionistPage/>
}