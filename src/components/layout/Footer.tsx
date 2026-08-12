import Link from "next/link";
import { AtSign, MessageCircle, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-hava-line bg-hava-black-soft">
      <div className="hava-hazard h-2 w-full" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-hava-gray">
              Aluguel de motos sem burocracia. Orçamento instantâneo, reserva online e retirada rápida.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-hava-orange">
              Navegue
            </h3>
            <ul className="space-y-2.5 text-sm text-hava-white/80">
              <li><Link href="/motos" className="hover:text-hava-orange">Catálogo de motos</Link></li>
              <li><Link href="/como-funciona" className="hover:text-hava-orange">Como funciona</Link></li>
              <li><Link href="/conta" className="hover:text-hava-orange">Área do cliente</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-hava-orange">
              Contato
            </h3>
            <ul className="space-y-2.5 text-sm text-hava-white/80">
              <li className="flex items-center gap-2"><MessageCircle size={15} /> (11) 90000-0000</li>
              <li className="flex items-center gap-2"><MapPin size={15} /> São Paulo, SP</li>
              <li className="flex items-center gap-2"><AtSign size={15} /> @havalugue</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-hava-orange">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm text-hava-white/80">
              <li>Política de cancelamento</li>
              <li>Termos de uso</li>
              <li>Privacidade</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-hava-line pt-6 text-xs text-hava-gray md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Havalugue. Todos os direitos reservados.</span>
          <span className="font-mono">Protótipo — dados e preços meramente ilustrativos.</span>
        </div>
      </div>
    </footer>
  );
}
