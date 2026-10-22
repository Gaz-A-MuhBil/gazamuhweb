import { json, preflight } from "@/lib/app-api";
import { proIntro, proServices } from "@/lib/pro-services";

export const OPTIONS = preflight;

// Mobil uygulamanın "Hizmetlerimiz" ekranları: metinler sitedeki /hizmetlerimiz sayfalarıyla aynıdır
export function GET() {
  return json({
    intro: proIntro,
    services: proServices.map((s) => ({
      slug: s.slug, icon: s.icon, title: s.title, short: s.short, card: s.card,
      intro: s.intro, sections: s.sections, faq: s.faq, closing: s.closing, cta: s.cta,
    })),
  });
}
