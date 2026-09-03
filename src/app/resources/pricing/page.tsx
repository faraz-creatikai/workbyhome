import { generateSEOMetadata } from '../../../../lib/seometadata';
import PricingSection from './clientpricing';


export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <PricingSection/>
}
