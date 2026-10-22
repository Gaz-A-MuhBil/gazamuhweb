import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Check, ClipboardList, FileText, MessageCircle, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Description } from "@/components/Description";
import { JsonLd } from "@/components/JsonLd";
import { QuoteSection, ServiceItemCard, ServiceVisual, categoryHref, serviceHref, tel } from "@/components/ProServices";
import { whatsappUrl } from "@/lib/home";
import { proServiceBySlug } from "@/lib/pro-services";
import { getServiceItem, getServiceItems } from "@/lib/service-items";
import { abs, breadcrumbLd, summary as clip } from "@/lib/seo";
import { company, contact, igdas } from "@/lib/site";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await getServiceItem((await params).slug);
  if (!s) return { title: "Hizmet bulunamadı", robots: { index: false } };
  const url = serviceHref(s);
  const description = clip(s.summary || s.description);
  return {
    title: `${s.title} | GAZ-A Mühendislik`,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: s.title, description, images: s.image ? [{ url: s.image, alt: s.title }] : ["/brand/og.jpg"] },
  };
}

// Hizmet "ürün" sayfası: ürün sayfası düzeni, sepet yerine teklif formu
export default async function ServicePage({ params }: Props) {
  const s = await getServiceItem((await params).slug);
  if (!s) notFound();
  const cat = proServiceBySlug(s.category);
  const all = await getServiceItems();
  const related = [...all.filter((x) => x.category === s.category && x.slug !== s.slug), ...all.filter((x) => x.category !== s.category)].slice(0, 3);
  const process = cat?.sections[2];

  return (
    <main>
      <JsonLd data={[
        breadcrumbLd([{ name: "Ana Sayfa", url: "/" }, { name: "Hizmetlerimiz", url: "/hizmetlerimiz" }, ...(cat ? [{ name: cat.short, url: categoryHref(cat) }] : []), { name: s.title, url: serviceHref(s) }]),
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.summary || s.description,
          url: abs(serviceHref(s)),
          ...(s.image ? { image: abs(s.image) } : {}),
          ...(cat ? { category: cat.title } : {}),
          areaServed: "İstanbul",
          provider: { "@type": "Organization", name: company.title, telephone: contact.phone, url: abs("/") },
        },
        ...(s.faq.length ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }] : []),
      ]} />

      <div className="mx-auto w-full max-w-7xl px-4 pt-40 md:px-6">
        <Breadcrumb crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Hizmetlerimiz", href: "/hizmetlerimiz" }, ...(cat ? [{ label: cat.short, href: categoryHref(cat) }] : []), { label: s.title }]} />

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <ServiceVisual item={s} big className="aspect-square rounded-[4px]" sizes="(min-width:1024px) 50vw, 100vw" />

          <div className="lg:pl-4">
            {cat && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                <Link href={categoryHref(cat)} className="hover:text-primary">{cat.short}</Link> · Hizmet
              </p>
            )}
            <h1 className="mt-3 text-3xl font-light leading-tight tracking-tight md:text-4xl">{s.title}</h1>
            {s.summary && <p className="mt-4 leading-relaxed text-muted">{s.summary}</p>}

            <div className="mt-6 rounded-[4px] bg-surface p-5">
              <p className="text-2xl font-bold text-primary">Fiyat için teklif alın</p>
              <p className="mt-1 text-sm text-muted">Fiyat; işin kapsamı, saha koşulları ve keşif sonrasında netleşen proje bilgilerine göre hazırlanır.</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#teklif" className="inline-flex flex-1 items-center justify-center gap-2 rounded-[4px] bg-primary py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary/90 sm:px-8">
                <FileText size={18} /> Teklif Al
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border-2 border-primary py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white sm:px-8">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>

            {s.points.length > 0 && (
              <section className="mt-8">
                <h2 className="mb-3 text-lg font-bold">Hizmet kapsamı</h2>
                <ul className="space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"><Check size={12} strokeWidth={3} /></span>{p}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-foreground/80">
              <li className="flex items-center gap-3"><ClipboardList size={17} className="shrink-0 text-accent" />Yerinde keşif ve proje değerlendirmesi</li>
              <li className="flex items-center gap-3"><BadgeCheck size={17} className="shrink-0 text-accent" />{igdas.title} · Yetki No {igdas.no}</li>
              <li className="flex items-center gap-3"><Phone size={17} className="shrink-0 text-accent" />Teklif ve keşif: <a href={tel} className="font-semibold hover:text-primary">{contact.phone}</a></li>
            </ul>

            {s.description && (
              <section className="mt-10">
                <h2 className="mb-3 text-lg font-bold">Hizmet Açıklaması</h2>
                <Description text={s.description} />
              </section>
            )}

            {process && (
              <section className="mt-10">
                <h2 className="mb-3 text-lg font-bold">{process.h}</h2>
                <p className="text-sm leading-relaxed text-foreground/80">{process.p}</p>
              </section>
            )}
          </div>
        </div>

        {s.faq.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-extrabold">Sık sorulan sorular</h2>
            <div className="mt-6 divide-y divide-border rounded-[4px] border border-border">
              {s.faq.map((f, i) => (
                <details key={f.q} className="group px-6 py-5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-semibold marker:hidden">
                    {f.q}
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mt-20">
        <QuoteSection service={s.slug} title={`${s.title} için teklif alın`} text={cat?.closing} />
      </div>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6">
          <h2 className="mb-8 text-3xl font-light tracking-tight md:text-4xl">Diğer hizmetlerimiz</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => <ServiceItemCard key={r.slug} item={r} i={i} />)}
          </div>
        </section>
      )}
    </main>
  );
}
