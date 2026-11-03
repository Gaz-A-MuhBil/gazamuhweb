import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { SeasonSpotlight as Spotlight } from "@/lib/season";
import { slugify } from "@/lib/slug";
import { Reveal } from "./Reveal";

// Sezonun öne çıkan kategorisi: neden şimdi, kapasite rehberi (arama sonuçlarına gider) ve kısa öneriler.
// İçerik lib/season.ts'teki SPOTLIGHT'tan gelir; sezon admin panelinden (Mevsim Sıralaması) elle de seçilebilir.
export function SeasonSpotlight({ s, count }: { s: Spotlight; count: number }) {
  const href = `/${slugify(s.category)}`;
  return (
    <section aria-labelledby="sezon-baslik" className="border-y border-border bg-surface">
      <div className="mx-auto grid w-full max-w-[1400px] gap-14 px-4 py-20 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">{s.eyebrow} · {s.category}</p>
          <h2 id="sezon-baslik" className="mt-6 text-4xl font-extralight leading-[1.08] tracking-tight md:text-6xl">
            {s.title}<br /><span className="font-semibold text-primary">{s.highlight}</span>
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">{s.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={href} className="inline-flex items-center gap-2 rounded-[4px] bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {count} modeli incele <ArrowRight size={15} aria-hidden />
            </Link>
            <Link href="/bilgi-al" className="inline-flex items-center rounded-[4px] border border-foreground/20 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              Ücretsiz keşif iste
            </Link>
          </div>

          <ol className="mt-14 border-t border-border">
            {s.tips.map((t, n) => (
              <li key={t.title} className="flex gap-5 border-b border-border py-6 md:gap-8">
                <span className="w-7 pt-1 text-xs font-semibold tabular-nums text-muted">{String(n + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight">{t.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/75">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1} className="lg:pt-2">
          <div className="rounded-[4px] bg-[#0b1d45] p-7 text-white md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">Kapasite rehberi</p>
            <h3 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">{s.sizeTitle}</h3>
            <ul className="mt-8 border-t border-white/15">
              {s.sizes.map((z) => (
                <li key={z.value} className="border-b border-white/15">
                  <Link href={`/urunler?q=${encodeURIComponent(`${s.category} ${z.q}`)}`}
                    className="group flex items-center gap-4 py-5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    <span className="min-w-0 flex-1 text-sm text-white/70">{z.area}</span>
                    <span className="text-2xl font-semibold tabular-nums tracking-tight md:text-3xl">{z.value}</span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-[#0b1d45]">
                      <ArrowUpRight size={18} aria-hidden />
                    </span>
                    <span className="sr-only">{s.category} modellerini göster</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-white/60">{s.sizeNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
