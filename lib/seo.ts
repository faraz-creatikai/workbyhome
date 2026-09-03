import { prisma } from "./prisma";


export async function getSEO(slug: string) {

   try {
    return await prisma.seoEntry.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("DB Error:", error);
    return null; // 👈 prevent crash
  }
}