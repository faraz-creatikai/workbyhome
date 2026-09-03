import React from 'react'
import AboutPage from './clientAbout'
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <AboutPage/>
}
