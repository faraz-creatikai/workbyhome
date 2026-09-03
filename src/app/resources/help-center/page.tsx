import React from 'react'
import HelpCenterPage from './clientHelpCenter'
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <HelpCenterPage/>
}
