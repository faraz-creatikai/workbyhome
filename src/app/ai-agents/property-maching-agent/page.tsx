
import PropertyMatcherPage from './clientproperty'
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <PropertyMatcherPage/>
}
