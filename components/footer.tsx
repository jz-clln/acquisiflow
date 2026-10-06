import Image from "next/image";
import { ArrowUp, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { wrap } from "@/lib/ui";

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className={`${wrap} flex flex-wrap items-end justify-between gap-8`}>
        <div>
          <Image src="/acquisiflow-wordmark.png" alt="AcquisiFlow" width={1086} height={362} sizes="160px" className="h-auto w-40 dark:brightness-0 dark:invert" />
          <p className="mt-4 max-w-sm text-[15px] text-body">We build custom software around your business and the way your team works.</p>
        </div>
        <div className="text-[15px] text-body sm:text-right">
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 break-all text-ink underline underline-offset-4"><Mail size={16} aria-hidden="true" />{site.email}</a>
          <p className="mt-2 max-w-sm text-sm text-quiet">© {new Date().getFullYear()} AcquisiFlow. Philippines-based custom software studio serving businesses locally and internationally.</p>
          <a href="#top" className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink underline underline-offset-4">Back to top<ArrowUp size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}