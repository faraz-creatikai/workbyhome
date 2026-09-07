import HomePage from '@/components/sections/home/HomePage';
import React from 'react'
import { generateSEOMetadata } from '../../lib/seometadata';






export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <HomePage/>
}