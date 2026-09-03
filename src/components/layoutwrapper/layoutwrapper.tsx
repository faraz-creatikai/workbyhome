"use client";

import { usePathname } from "next/navigation";

import WhatsAppButton from "@/components/whatsapp-button/whatsapp";
import Navbar from "../sections/header";
import Footer from "../sections/footer";
import { useEffect } from "react";


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

    useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      // Page was restored from bfcache. Framer Motion's whileInView
      // animations rely on IntersectionObserver, which doesn't reliably
      // re-fire on bfcache restore for content already in the viewport —
      // so it stays stuck at its `initial="hidden"` (opacity:0) state.
      // A scroll nudge forces the browser to recompute intersections
      // and repaint the affected compositor layers.
      requestAnimationFrame(() => {
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
      });
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const hideRoutes = ["/login","/register", "/apply-now",
    "/seodashboard","/seo",
    "/onboarding",
    "/admin-login",
    "/explore-broker",
    "/dashboard",
    "/dashboard/brokers"
    ,"/dashboard/properties",
    "/dashboard/requirements","/dashboard/broker-request",

     "/admin-dashboard/brokers"
    ,"/admin-dashboard/properties",
    "/admin-dashboard/requirements","/admin-dashboard/broker-request",
    "/admin-dashboard"];
  const hideLayout = hideRoutes.includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
       {!hideLayout && <WhatsAppButton/>}
      {!hideLayout && <Footer />}
    </>
  );
}