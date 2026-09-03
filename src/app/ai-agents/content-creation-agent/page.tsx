import React from 'react'
import ContentCreationAgentLanding from './clientContent'
import { generateSEOMetadata } from '../../../../lib/seometadata';
export const generateMetadata = generateSEOMetadata;
function page() {
  return <ContentCreationAgentLanding/>
}

export default page
