import Image from "next/image";
import Link from "next/link";
import { AirVent, ArrowRight, FireExtinguisher, Flame, Mail, MessageCircle, Phone, type LucideProps } from "lucide-react";
import { whatsappUrl } from "@/lib/home";
import { proIntro, proServiceBySlug, proServices, type ProService } from "@/lib/pro-services";
import { getServiceGroups, type ServiceItem } from "@/lib/service-items";
import { contact } from "@/lib/site";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./home/Reveal";

// Hizmetlerin ortak parçaları: /hizmetlerimiz (liste), /hizmetlerimiz/<kategori>, /hizmet/<hizmet> ve ana sayfa bölümü kullanır

const icons = { flame: Flame, fire: FireExtinguisher, air: AirVent };
export function ServiceIcon({ name, ...p }: { name: ProService["icon"] } & LucideProps) {
  const I = icons[name];
  return <I {...p} />;
}

export const tel = `tel:+9${contact.phone.replace(/\s/g, "")}`;
export const serviceHref = (s: Pick<ServiceItem, "slug">) => `/hizmet/${s.slug}`;
export const categoryHref = (c: Pick<ProService, "slug">) => `/hizmetlerimiz/${c.slug}`;

// Hizmet görseli: adminden görsel yüklendiyse o, yoksa kategori ikonlu marka renklerinde zemin
export function ServiceVisual({ item, className = "", sizes = "400px", big = false }: { item: ServiceItem; className?: string; sizes?: string; big?: boolean }) {
  const cat = proServiceBySlug(item.category);
  return (
    <div className={`relative isolate overflow-hidden bg-[#0b1d45] ${className}`}>
      {item.image ? (
        <Image src={item.image} alt={item.title} fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
      ) : (
        <>
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b1d45] via-[#0f2a60] to-primary" />
          <div className="absolute -right-10 -top-10 -z-10 h-2/3 w-2/3 rounded-full bg-accent/20 blur-3xl" />
          <div className="grid h-full place-items-center text-white">
            <div className="flex flex-col items-center gap-4 px-6 text-center">
              <span className={`grid place-items-center rounded-[4px] bg-white/10 text-accent ${big ? "h-28 w-28" : "h-16 w-16"}`}>
                {cat && <ServiceIcon name={cat.icon} size={big ? 56 : 30} strokeWidth={1.5} />}
              </span>
              {big && <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">{cat?.short}</span>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Ürün kartı düzeninde hizmet kartı: görsel, kategori, ad, kısa açıklama ve teklif bağlantısı
export function ServiceItemCard({ item, i = 0 }: { item: ServiceItem; i?: number }) {
  const cat = proServiceBySlug(item.category);
  return (
    <Reveal delay={(i % 3) * 0.06} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-border bg-white transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_20px_40px_-24px_rgba(11,29,69,0.45)]">
        <Link href={serviceHref(item)} className="block" aria-label={item.title}>
          <ServiceVisual item={item} className="aspect-[4/3]" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
        </Link>
        <div className="flex flex-1 flex-col p-6">
          {cat && <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{cat.short}</p>}
          <h3 className="mt-2 text-lg font-semibold leading-snug"><Link href={serviceHref(item)} className="hover:text-primary">{item.title}</Link></h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{item.summary}</p>
          <div className="mt-5 flex items-center gap-2">
            <Link href={`${serviceHref(item)}#teklif`} className="flex-1 rounded-[4px] bg-primary py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary/90">Teklif Al</Link>
            <Link href={serviceHref(item)} className="rounded-[4px] border border-border px-4 py-2.5 text-sm font-semibold transition hover:border-primary hover:text-primary">İncele</Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

// Ana kategori kartları (ana sayfa bölümü ve "diğer hizmet grupları"); except verilirse o kategori listelenmez
export function ServiceCards({ except }: { except?: string }) {
  const list = proServices.filter((s) => s.slug !== except);
  return (
    <div className={`grid gap-5 ${list.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {list.map((s, n) => (
        <Reveal key={s.slug} delay={n * 0.08} className="h-full">
          <Link href={categoryHref(s)}
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

// Teklif bölümü: solda başlık ve iletişim, sağda form. service verilirse o hizmet seçili gelir.
export async function QuoteSection({ service, title = proIntro.quoteTitle, text = proIntro.quoteText }: { service?: string; title?: string; text?: string }) {
  const groups = await getServiceGroups();
  const options = groups.flatMap((g) => g.items.map((i) => ({ slug: i.slug, short: i.title, group: g.category.short })));
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
          <LeadForm services={options} service={service} />
        </div>
      </div>
    </section>
  );
}
