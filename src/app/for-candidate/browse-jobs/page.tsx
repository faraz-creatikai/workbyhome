import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import BrowseJobs from './clientBrowseJobs';


export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <BrowseJobs/>
}