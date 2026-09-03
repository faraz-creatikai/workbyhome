import React from 'react'
import FollowUpAgentLanding from './clientFollowUp'
import { generateSEOMetadata } from '../../../../lib/seometadata'
export const generateMetadata = generateSEOMetadata;
function page() {
  return <FollowUpAgentLanding/>
  
}

export default page
