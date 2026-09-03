import React, { Suspense } from 'react'
import SEOLoginPage from './clientseo'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
  <SEOLoginPage/>
  </Suspense>
)
}
