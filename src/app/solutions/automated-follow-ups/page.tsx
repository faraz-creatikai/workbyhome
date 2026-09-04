import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import AutomatedFollowUpsPage from './clientAutomatedFollowups';




export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <AutomatedFollowUpsPage/>
}