import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import RemoteCallCenterPage from './clientRemoteCallCenter';




export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <RemoteCallCenterPage/>
}