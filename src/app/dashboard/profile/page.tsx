import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";
import ProfileForm from "@/components/account/ProfileForm";

export default async function DashboardProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/get-started");
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/70 bg-[rgba(255,252,245,0.92)] p-8 shadow-[0_24px_70px_rgba(66,52,23,0.12)] backdrop-blur-xl sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#7a6c57]">
          Profile Settings
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#243821] sm:text-5xl">
          Manage Your Profile
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#655f51] sm:text-lg">
          Keep your personal and agricultural details current so your account area
          becomes more relevant for product selection and future customer support.
        </p>
      </div>

      <ProfileForm
        user={{
          id: session.user.id,
          fullName: session.user.name ?? "AgriAce Customer",
          email: session.user.email,
          role: session.user.role,
        }}
      />
    </div>
  );
}
