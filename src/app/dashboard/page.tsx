import DashboardPage from "@/features/dashboard/pages/DashboardPage/DashboardPage";
import {cookies} from "next/headers";

export default async function DashboardPageRoute() {

  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const isAuthenticated = !!token;

  console.log(isAuthenticated)

  return <DashboardPage isAuthenticated={isAuthenticated}/>
}
