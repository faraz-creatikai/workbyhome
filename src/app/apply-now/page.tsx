import { Suspense } from 'react';
import { generateSEOMetadata } from '../../../lib/seometadata';
import Register from './clientRegister'

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return  <Suspense fallback={null}>
    <Register/>
  </Suspense>
}
