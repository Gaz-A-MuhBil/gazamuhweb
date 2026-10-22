import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { QuoteSection, ServiceCards, ServiceIcon, tel } from "@/components/ProServices";
import { Reveal } from "@/components/home/Reveal";
import { proIntro, proServices } from "@/lib/pro-services";
import { contact, igdas } from "@/lib/site";
import { abs, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Ticari ve Endüstriyel Doğalgaz, Yangın Tesisatı, İklimlendirme | GAZ-A Mühendislik",
  description: "Ticari işletmeler ve sanayi tesisleri için doğalgaz projeleri, fabrika gaz hatları, yangın tesisatı ve hidrofor sistemleri, iklimlendirme ve hava şartlandırma. Keşif ve teklif.",
  alternates: { canonical: "/hizmetlerimiz" },
  openGraph: { type: "website", url: "/hizmetlerimiz", title: "Hizmetlerimiz | GAZ-A Mühendislik", description: proIntro.text, images: ["/brand/og.jpg"] },
};

export default function ServicesPage() {
  return (
    <main>
      <JsonLd data={[
        breadcrumbLd([{ name: "Ana Sayfa", url: "/" }, { name: "Hizmetlerimiz", url: "/hizmetlerimiz" }]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Hizmetlerimiz",
          itemListElement: proServices.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: abs(`/hizmetlerimiz/${s.slug}`) })),
        },
      ]} />

      {/* Giriş */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-40 md:px-6 lg:pb-24">
        <Breadcrumb crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Hizmetlerimiz" }]} />
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Hizmetlerimiz</p>
            <h1 className="mt-6 text-4xl font-extralight leading-[1.08] tracking-tight md:text-6xl">
              Ticari yapılar ve sanayi tesisleri için <span className="font-semibold text-primary">mühendislik hizmetleri</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="leading-relaxed text-muted">{proIntro.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#teklif" className="inline-flex items-center gap-2 rounded-[4px] bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-primary/90">
                {proIntro.quoteTitle} <ArrowRight size={15} />
              </a>
              <a href={tel} className="inline-flex items-center gap-2 rounded-[4px] border border-foreground/20 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition hover:border-primary hover:text-primary">
                <Phone size={15} />{contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hizmet kartları */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-6 lg:pb-28">
        <ServiceCards />
      </section>

      {/* Hakkımızda: koyu bant */}
      <section className="relative isolate overflow-hidden bg-[#0b1d45] text-white">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b1d45] via-[#0f2a60] to-primary" />
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 md:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20 lg:py-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Hakkımızda</p>
            <h2 className="mt-6 text-3xl font-extralight leading-tight tracking-tight md:text-5xl">
              Keşiften uygulamaya,<br /><span className="font-semibold">tek mühendislik ekibi.</span>
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-white/75">{proIntro.about}</p>
            <p className="mt-8 inline-flex items-center gap-2 rounded-[4px] border border-white/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
              <BadgeCheck size={15} className="text-accent" />{igdas.title} · {igdas.no}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {proServices.map((s, n) => (
                <li key={s.slug}>
                  <Link href={`/hizmetlerimiz/${s.slug}`} className="group flex items-center gap-5 py-6">
                    <span className="w-7 text-xs font-semibold tabular-nums text-white/50">{String(n + 1).padStart(2, "0")}</span>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[4px] bg-white/10 text-accent"><ServiceIcon name={s.icon} size={20} /></span>
                    <span className="flex-1 text-lg font-light transition-transform duration-300 group-hover:translate-x-1 md:text-xl">{s.title}</span>
                    <ArrowRight size={18} className="text-white/40 transition-colors group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <QuoteSection />
    </main>
  );
}
