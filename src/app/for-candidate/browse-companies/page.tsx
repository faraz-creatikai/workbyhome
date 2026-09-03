import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import BrowseCompanies from './clientBrowseCompanies';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <BrowseCompanies/>
}