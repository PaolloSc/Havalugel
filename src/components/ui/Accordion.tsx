import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="divide-y divide-hava-line border border-hava-line">
      {items.map((item) => (
        <details key={item.question} className="group open:bg-hava-black-soft">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-hava-white marker:content-none">
            <span className="font-display text-lg leading-tight tracking-tight md:text-xl">
              {item.question}
            </span>
            <ChevronDown
              size={18}
              className="shrink-0 text-hava-orange transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="px-5 pb-5 text-sm text-hava-gray">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
