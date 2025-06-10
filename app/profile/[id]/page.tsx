import ProfilePage from "@/components/Profile/ProfilePage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const token = cookies().get("access_token")?.value;
  console.log("TOKEN:", token);

  if (!token) {
    redirect("/");
  }

  return <ProfilePage />;
}
