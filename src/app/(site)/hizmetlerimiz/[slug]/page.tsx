import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { QuoteSection, ServiceCards, ServiceIcon, tel } from "@/components/ProServices";
import { Reveal } from "@/components/home/Reveal";
import { proServiceBySlug, proServices } from "@/lib/pro-services";
import { company, contact } from "@/lib/site";
import { abs, breadcrumbLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => proServices.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = proServiceBySlug((await params).slug);
  if (!s) return {};
  const url = `/hizmetlerimiz/${s.slug}`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: s.metaTitle, description: s.metaDescription, images: ["/brand/og.jpg"] },
  };
}

export default async function ServiceDetail({ params }: Props) {
  const s = proServiceBySlug((await params).slug);
  if (!s) notFound();
  const url = `/hizmetlerimiz/${s.slug}`;
  const n = proServices.indexOf(s);

  return (
    <main>
      <JsonLd data={[
        breadcrumbLd([{ name: "Ana Sayfa", url: "/" }, { name: "Hizmetlerimiz", url: "/hizmetlerimiz" }, { name: s.title, url }]),
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
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-40 md:px-6 lg:pb-24">
        <Breadcrumb crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Hizmetlerimiz", href: "/hizmetlerimiz" }, { label: s.short }]} />
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Hizmet · {String(n + 1).padStart(2, "0")}</p>
            <h1 className="mt-6 text-4xl font-extralight leading-[1.08] tracking-tight md:text-6xl">{s.title}</h1>
            <div className="mt-8 max-w-2xl space-y-4 leading-relaxed text-muted">
              {s.intro.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#teklif" className="inline-flex items-center gap-2 rounded-[4px] bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-primary/90">
                {s.cta} <ArrowRight size={15} />
              </a>
              <a href={tel} className="inline-flex items-center gap-2 rounded-[4px] border border-foreground/20 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition hover:border-primary hover:text-primary">
                <Phone size={15} />{contact.phone}
              </a>
            </div>
          </Reveal>

          {/* Kapsam özeti */}
          <Reveal delay={0.1}>
            <div className="relative isolate overflow-hidden rounded-[4px] bg-[#0b1d45] p-8 text-white md:p-10">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b1d45] via-[#0f2a60] to-primary" />
              <span className="grid h-16 w-16 place-items-center rounded-[4px] bg-white/10 text-accent"><ServiceIcon name={s.icon} size={30} /></span>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">Bu hizmet kapsamında</p>
              <ul className="mt-5 space-y-4">
                {s.sections.map((x) => (
                  <li key={x.h} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-white"><Check size={13} strokeWidth={3} /></span>
                    <span className="text-[15px] font-medium leading-snug">{x.h}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/70">
                Ticari işletmeler ve sanayi tesisleri · Sancaktepe merkezli, İstanbul Anadolu Yakası
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bölümler */}
      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-7xl px-4 md:px-6 lg:grid-cols-3">
          {s.sections.map((x, i) => (
            <Reveal key={x.h} delay={i * 0.08} className="h-full">
              <div className={`group h-full border-border py-12 lg:py-16 ${i ? "border-t lg:border-l lg:border-t-0 lg:pl-10" : ""} ${i < 2 ? "lg:pr-10" : ""}`}>
                <p className="text-sm font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-5 text-2xl font-semibold leading-snug tracking-tight">{x.h}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{x.p}</p>
                <span className="mt-8 block h-px w-10 bg-accent transition-all duration-500 group-hover:w-24" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sık sorulan sorular */}
      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-24">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">SSS</p>
            <h2 className="mt-5 text-3xl font-light tracking-tight md:text-4xl">Sık sorulan sorular</h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted">{s.closing}</p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {s.faq.map((f, i) => (
              <details key={f.q} className="group py-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold marker:hidden">
                  {f.q}
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection service={s.slug} title={s.cta} text={s.closing} />

      {/* Diğer hizmetler */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6 lg:py-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-light tracking-tight md:text-4xl">Diğer hizmetlerimiz</h2>
          <Link href="/hizmetlerimiz" className="hidden shrink-0 items-center gap-2 border-b border-primary pb-1 text-xs font-bold uppercase tracking-[0.2em] text-primary transition-colors hover:border-accent hover:text-accent sm:flex">
            Tüm hizmetler <ArrowRight size={16} />
          </Link>
        </div>
        <ServiceCards except={s.slug} />
      </section>
    </main>
  );
}
