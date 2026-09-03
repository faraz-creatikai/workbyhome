import AISEOContentAgentLanding from "./clientSeo";
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <AISEOContentAgentLanding/>
}
