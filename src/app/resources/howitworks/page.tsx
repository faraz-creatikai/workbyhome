

import HowItWorksPage from '@/components/sections/howitworks/howItWorks';
import { generateSEOMetadata } from '../../../../lib/seometadata';


export const generateMetadata = generateSEOMetadata;

function page() {
  return <HowItWorksPage/>
  
}

export default page
