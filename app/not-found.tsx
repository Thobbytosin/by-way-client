import NotFound from "@/components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | ByWay Learning Management System",
  description:
    "Sorry, the page you are looking for doesn't exist. Please check the URL or go back to the homepage for more information.",
  keywords: "404 error, not found, page not found",
  icons: {
    icon: "/logo.png", // Path relative to /public
    shortcut: "/logo.png",
  },
};

export default async function NotFoundPage() {
  return <NotFound />;
}
