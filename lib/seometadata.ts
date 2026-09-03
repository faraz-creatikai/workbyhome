import { headers } from "next/headers";
import { getSEO } from "./seo";

export async function generateSEOMetadata() {
   const headersList = headers();
   const pathname = (await headersList).get("x-pathname") || "/";

  // convert path → slug
  const slug =
    pathname === "/" ? "home" : pathname.replace(/^\/+/, "");

  // example:
  // "/" → home
  // "/about" → about
  // "/property/123" → property/123
  const seo = await getSEO(slug);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),

    title: seo?.metaTitle || slug.replace(/-/g, " "),
    description: seo?.metaDescription ||  `Learn more about ${slug.replace(/-/g, " ")}`,

    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle,
      description: seo?.ogDescription || seo?.metaDescription,
      images: seo?.ogImage ? [seo.ogImage] : [],
    },

    twitter: {
      title: seo?.twitterTitle || seo?.metaTitle,
      description: seo?.twitterDescription || seo?.metaDescription,
      images: seo?.twitterImage ? [seo?.twitterImage] : [],
    },
  };
}