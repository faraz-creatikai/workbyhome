import React, { Suspense } from 'react'

import { generateSEOMetadata } from '../../../lib/seometadata';
import LoginEstate from './clientestatelogin';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return(
    <Suspense fallback={<div>Loading...</div>}>
     <LoginEstate/>
     </Suspense>
    )
}
