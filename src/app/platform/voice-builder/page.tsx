import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import AiVoiceBuilderPage from './clientVoiceBuilder';





export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <AiVoiceBuilderPage/>
}