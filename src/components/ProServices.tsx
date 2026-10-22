import Link from "next/link";
import { AirVent, ArrowRight, FireExtinguisher, Flame, Mail, MessageCircle, Phone, type LucideProps } from "lucide-react";
import { whatsappUrl } from "@/lib/home";
import { proIntro, proServices, type ProService } from "@/lib/pro-services";
import { contact } from "@/lib/site";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./home/Reveal";

// Ticari ve endüstriyel hizmetlerin ortak parçaları: /hizmetlerimiz sayfaları ve ana sayfa bölümü kullanır

const icons = { flame: Flame, fire: FireExtinguisher, air: AirVent };
export function ServiceIcon({ name, ...p }: { name: ProService["icon"] } & LucideProps) {
  const I = icons[name];
  return <I {...p} />;
}

export const tel = `tel:+9${contact.phone.replace(/\s/g, "")}`;

// Numaralı hizmet kartları; except verilirse o hizmet listelenmez (detay sayfasındaki "diğer hizmetler")
export function ServiceCards({ except }: { except?: string }) {
  const list = proServices.filter((s) => s.slug !== except);
  return (
    <div className={`grid gap-5 ${list.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {list.map((s, n) => (
        <Reveal key={s.slug} delay={n * 0.08} className="h-full">
          <Link href={`/hizmetlerimiz/${s.slug}`}
            className="group flex h-full flex-col rounded-[4px] border border-border bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_20px_40px_-24px_rgba(11,29,69,0.45)] md:p-9">
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-[4px] bg-primary text-white transition-colors duration-300 group-hover:bg-accent">
                <ServiceIcon name={s.icon} size={26} />
              </span>
              <span className="text-sm font-semibold tabular-nums text-accent">{String(proServices.indexOf(s) + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-8 text-2xl font-semibold leading-snug tracking-tight">{s.short}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.card}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary group-hover:text-accent">
              {s.more} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

// Teklif bölümü: solda başlık ve iletişim, sağda form (hizmet seçimli). service verilirse o hizmet seçili gelir.
export function QuoteSection({ service, title = proIntro.quoteTitle, text = proIntro.quoteText }: { service?: string; title?: string; text?: string }) {
  return (
    <section id="teklif" className="scroll-mt-28 border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 md:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-28">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Keşif ve teklif</p>
          <h2 className="mt-5 text-3xl font-light leading-tight tracking-tight md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">{text}</p>
          <ul className="mt-10 space-y-4 text-sm">
            <li><a href={tel} className="flex items-center gap-3 font-semibold hover:text-primary"><span className="grid h-10 w-10 place-items-center rounded-full bg-white text-primary"><Phone size={17} /></span>{contact.phone}</a></li>
            <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold hover:text-primary"><span className="grid h-10 w-10 place-items-center rounded-full bg-white text-primary"><MessageCircle size={17} /></span>WhatsApp&apos;tan yazın</a></li>
            <li><a href={`mailto:${contact.email}`} className="flex items-center gap-3 font-semibold hover:text-primary"><span className="grid h-10 w-10 place-items-center rounded-full bg-white text-primary"><Mail size={17} /></span>{contact.email}</a></li>
          </ul>
        </div>
        <div className="rounded-[4px] bg-white p-6 shadow-[0_24px_60px_-36px_rgba(11,29,69,0.4)] md:p-10">
          <LeadForm services={proServices.map(({ slug, short }) => ({ slug, short }))} service={service} />
        </div>
      </div>
    </section>
  );
}
