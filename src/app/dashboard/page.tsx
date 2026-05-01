import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";
import DashboardOverview from "@/components/account/DashboardOverview";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/get-started");
  }
  return (
    <DashboardOverview
      user={{
        id: session.user.id,
        fullName: session.user.name ?? "AgriAce Customer",
        email: session.user.email,
        role: session.user.role,
      }}
    />
  );
}
