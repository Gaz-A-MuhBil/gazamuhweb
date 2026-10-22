import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { QuoteSection, ServiceCards, ServiceIcon, ServiceItemCard, categoryHref, serviceHref, tel } from "@/components/ProServices";
import { Reveal } from "@/components/home/Reveal";
import { proServiceBySlug, proServices } from "@/lib/pro-services";
import { getServiceItems } from "@/lib/service-items";
import { company, contact } from "@/lib/site";
import { abs, breadcrumbLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = proServiceBySlug((await params).slug);
  if (!s) return {};
  const url = categoryHref(s);
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: s.metaTitle, description: s.metaDescription, images: ["/brand/og.jpg"] },
  };
}

// Hizmet kategorisi (Kombi / Klima kategori sayfası gibi): giriş, bu kategorideki hizmetler, süreç, SSS ve teklif formu
export default async function ServiceCategory({ params }: Props) {
  const s = proServiceBySlug((await params).slug);
  if (!s) notFound();
  const url = categoryHref(s);
  const n = proServices.indexOf(s);
  const items = (await getServiceItems()).filter((i) => i.category === s.slug);
  const process = s.sections[2];

  return (
    <main>
      <JsonLd data={[
        breadcrumbLd([{ name: "Ana Sayfa", url: "/" }, { name: "Hizmetlerimiz", url: "/hizmetlerimiz" }, { name: s.short, url }]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: s.title,
          itemListElement: items.map((i, k) => ({ "@type": "ListItem", position: k + 1, name: i.title, url: abs(serviceHref(i)) })),
        },
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.metaDescription,
          url: abs(url),
          areaServed: "İstanbul",
          provider: { "@type": "Organization", name: company.title, telephone: contact.phone, url: abs("/") },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        },
      ]} />

      {/* Giriş */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-14 pt-40 md:px-6">
        <Breadcrumb crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Hizmetlerimiz", href: "/hizmetlerimiz" }, { label: s.short }]} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              <span className="grid h-9 w-9 place-items-center rounded-[4px] bg-primary text-white"><ServiceIcon name={s.icon} size={18} /></span>
              Hizmet grubu · {String(n + 1).padStart(2, "0")}
            </p>
            <h1 className="mt-6 text-4xl font-extralight leading-[1.08] tracking-tight md:text-6xl">{s.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4 leading-relaxed text-muted">
              {s.intro.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#teklif" className="inline-flex items-center gap-2 rounded-[4px] bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-primary/90">
                {s.cta} <ArrowRight size={15} />
              </a>
              <a href={tel} className="inline-flex items-center gap-2 rounded-[4px] border border-foreground/20 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition hover:border-primary hover:text-primary">
                <Phone size={15} />{contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bu kategorideki hizmetler */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-5">
          <h2 className="text-2xl font-light tracking-tight md:text-3xl">{s.short} hizmetleri</h2>
          <span className="text-sm text-muted">{items.length} hizmet</span>
        </div>
        {items.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((i, k) => <ServiceItemCard key={i.slug} item={i} i={k} />)}
          </div>
        ) : (
          <p className="rounded-[4px] bg-surface p-10 text-center text-sm text-muted">Bu grupta yayında hizmet yok. Bilgi için bizi arayın.</p>
        )}
      </section>

      {/* Süreç ve SSS */}
      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 md:px-6 lg:grid-cols-2 lg:gap-20 lg:py-24">
          {process && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Süreç</p>
              <h2 className="mt-5 text-3xl font-light tracking-tight md:text-4xl">{process.h}</h2>
              <p className="mt-5 max-w-xl leading-relaxed text-muted">{process.p}</p>
            </div>
          )}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">SSS</p>
            <h2 className="mt-5 text-3xl font-light tracking-tight md:text-4xl">Sık sorulan sorular</h2>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {s.faq.map((f, i) => (
                <details key={f.q} className="group py-5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-semibold marker:hidden">
                    {f.q}
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuoteSection title={s.cta} text={s.closing} />

      {/* Diğer hizmet grupları */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6 lg:py-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-light tracking-tight md:text-4xl">Diğer hizmet gruplarımız</h2>
          <Link href="/hizmetlerimiz" className="hidden shrink-0 items-center gap-2 border-b border-primary pb-1 text-xs font-bold uppercase tracking-[0.2em] text-primary transition-colors hover:border-accent hover:text-accent sm:flex">
            Tüm hizmetler <ArrowRight size={16} />
          </Link>
        </div>
        <ServiceCards except={s.slug} />
      </section>
    </main>
  );
}
