import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import LiveTranscriptsPage from './clientAnalytics';







export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <LiveTranscriptsPage/>
}