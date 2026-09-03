import React from 'react'
import LeadBotPage from './clientLeadQualifiction'
import { generateSEOMetadata } from '../../../../lib/seometadata';
export const generateMetadata = generateSEOMetadata;
export default function page() {
  return <LeadBotPage/>
}
