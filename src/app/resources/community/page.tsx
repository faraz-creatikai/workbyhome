import React from 'react'
import CommunityPage from './clientCommunity'
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <CommunityPage/>
}
