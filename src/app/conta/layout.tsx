"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AccountSidebar } from "@/components/account/AccountSidebar";

export default function ContaLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, hydrated, logout } = useAuth();

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login?next=/conta");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return <div className="px-5 py-24 text-center text-hava-gray">Carregando...</div>;
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-[240px_1fr]">
      <AccountSidebar
        user={user}
        onLogout={() => {
          logout();
          router.push("/");
        }}
      />
      <div>{children}</div>
    </div>
  );
}
