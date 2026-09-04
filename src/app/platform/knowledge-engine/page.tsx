import React from 'react'

import { generateSEOMetadata } from '../../../../lib/seometadata';
import KnowledgeEnginePage from './clientKnowledgeEngine';






export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <KnowledgeEnginePage/>
}