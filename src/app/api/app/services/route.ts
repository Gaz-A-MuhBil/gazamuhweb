import { json, preflight } from "@/lib/app-api";
import { proIntro, proServices } from "@/lib/pro-services";
import { getServiceItems } from "@/lib/service-items";

export const OPTIONS = preflight;

// Mobil uygulamanın "Hizmetlerimiz" ekranları: metinler sitedeki /hizmetlerimiz sayfalarıyla aynıdır
export async function GET() {
  const items = await getServiceItems();
  return json({
    intro: proIntro,
    services: proServices.map((s) => ({
      slug: s.slug, icon: s.icon, title: s.title, short: s.short, card: s.card,
      intro: s.intro, sections: s.sections, faq: s.faq, closing: s.closing, cta: s.cta,
      // Gruptaki hizmetler (sitedeki /hizmet/<slug> sayfaları); 1.0.1 ve öncesi bu alanı kullanmaz
      items: items.filter((i) => i.category === s.slug).map((i) => ({
        slug: i.slug, title: i.title, summary: i.summary, description: i.description, points: i.points, faq: i.faq, image: i.image,
      })),
    })),
  });
}
