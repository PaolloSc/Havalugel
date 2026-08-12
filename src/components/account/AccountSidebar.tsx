"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, FileText, LogOut, Receipt } from "lucide-react";
import type { User } from "@/types/user";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/conta", label: "Minhas reservas", icon: CalendarDays },
  { href: "/conta/documentos", label: "Documentos", icon: FileText },
  { href: "/conta/pagamentos", label: "Pagamentos", icon: Receipt },
];

export function AccountSidebar({ user, onLogout }: { user: User; onLogout: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="border border-hava-line bg-hava-black-soft p-5 lg:sticky lg:top-24">
      <div className="mb-6 border-b border-hava-line pb-5">
        <span className="block text-xs uppercase tracking-widest text-hava-gray">Olá,</span>
        <span className="font-display text-2xl leading-none text-hava-white">{user.nome.split(" ")[0]}</span>
      </div>

      <nav className="space-y-1">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors",
                active ? "bg-hava-orange text-hava-black" : "text-hava-white/80 hover:text-hava-orange"
              )}
            >
              <link.icon size={16} /> {link.label}
            </Link>
          );
        })}
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wide text-hava-gray hover:text-hava-orange"
        >
          <LogOut size={16} /> Sair
        </button>
      </nav>
    </aside>
  );
}
