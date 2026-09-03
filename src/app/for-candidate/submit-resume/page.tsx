import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import SubmitResume from './clientSubmitResume';



export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <SubmitResume/>
}