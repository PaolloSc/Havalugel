"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/motos", label: "Motos" },
  { href: "/como-funciona", label: "Como funciona" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-hava-line bg-hava-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest text-hava-white/80 transition-colors hover:text-hava-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/conta"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-hava-white/80 transition-colors hover:text-hava-orange"
          >
            <User size={16} /> Conta
          </Link>
          <Button href="/motos" className="px-5 py-2.5 text-xs">
            Fazer orçamento
          </Button>
        </div>

        <button
          className="text-hava-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-hava-line bg-hava-black px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-bold uppercase tracking-widest text-hava-white/90"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/conta"
              onClick={() => setOpen(false)}
              className="text-base font-bold uppercase tracking-widest text-hava-white/90"
            >
              Conta
            </Link>
            <Button href="/motos" className="mt-2 w-full justify-center">
              Fazer orçamento
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
