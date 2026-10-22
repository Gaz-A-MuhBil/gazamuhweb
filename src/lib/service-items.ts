import type { RowDataPacket } from "mysql2";
import { dbConfigured } from "./customer";
import { db } from "./db";
import { proServiceBySlug, proServices, type ProService } from "./pro-services";
import { slugify } from "./slug";

// Hizmet "ürünleri": her biri sitede ürün sayfası gibi kendi sayfasına sahiptir (/hizmet/<slug>), sepete eklenmez, teklif formu vardır.
// Kategoriler lib/pro-services'teki 3 ana hizmettir (Doğalgaz, Yangın, İklimlendirme).
// Kayıtlar admin → Hizmetler'den yönetilir. Ürünlerden ayrı tablodadır: ürün tablosu Kombi Klima GO ile ortaktır,
// hizmetler yalnızca GAZ-A sitesinde görünür ve sepete / mobil ürün listelerine karışmaz.
export type ServiceItem = {
  id: number;
  category: string; // pro-services slug
  slug: string;
  title: string;
  summary: string;
  description: string;
  points: string[];
  faq: { q: string; a: string }[];
  image: string | null;
  active: boolean;
};

// İlk kurulumda tabloya yazılan kayıtlar (GAZA Web Sitesi Ek Hizmet İçerikleri, 22.10.2026); veritabanı yoksa bunlar gösterilir
const faqOf = (cat: string) => proServiceBySlug(cat)?.faq ?? [];
// Varsayılan görseller public/hizmetler/<slug>.jpg; adminden görsel yüklenirse o kullanılır
const img = (slug: string) => `/hizmetler/${slug}.jpg`;
export const SEED: (Omit<ServiceItem, "id" | "active" | "image"> & { image: string })[] = [
  {
    category: "ticari-endustriyel-dogalgaz", slug: "ticari-isletmeler-icin-dogalgaz-projeleri", image: img("ticari-isletmeler-icin-dogalgaz-projeleri"),
    title: "Ticari İşletmeler İçin Doğalgaz Projeleri",
    summary: "Ticari yapılarda doğalgaz tesisatını işletmenin kullanım ihtiyacına göre ele alıyor, keşifle iş kapsamını ve uygulama adımlarını netleştiriyoruz.",
    description: "Ticari yapılarda doğalgaz tesisatını, işletmenin kullanım ihtiyacına göre ele alıyoruz. Hat güzergâhı, cihaz bağlantıları ve mevcut tesisatın durumu proje çalışmasının kapsamını belirler. Keşif sırasında yapılacak işleri ve uygulama adımlarını netleştirerek teklifimizi buna göre hazırlıyoruz.",
    points: ["Hat güzergâhı ve cihaz bağlantıları", "Mevcut tesisatın değerlendirilmesi", "Keşifle netleşen uygulama adımları"],
    faq: faqOf("ticari-endustriyel-dogalgaz"),
  },
  {
    category: "ticari-endustriyel-dogalgaz", slug: "fabrika-ve-sanayi-dogalgaz-hatlari", image: img("fabrika-ve-sanayi-dogalgaz-hatlari"),
    title: "Fabrika ve Sanayi Doğalgaz Hatları",
    summary: "Fabrika ve üretim tesislerinde doğalgaz hatlarını, gaz kullanacak ekipmanların ihtiyaçlarıyla birlikte planlıyoruz.",
    description: "Fabrikalarda ve üretim tesislerinde doğalgaz hatlarının, gaz kullanacak ekipmanların ihtiyaçlarıyla birlikte planlanması gerekir. Büyük sanayi hatları ve tesis içi doğalgaz uygulamalarında, mevcut altyapıyı ve bağlantı noktalarını inceleyerek projenin gerektirdiği çözümü geliştiriyoruz.",
    points: ["Büyük sanayi gaz hatları", "Tesis içi doğalgaz uygulamaları", "Mevcut altyapı ve bağlantı noktası incelemesi"],
    faq: faqOf("ticari-endustriyel-dogalgaz"),
  },
  {
    category: "yangin-tesisati-hidrofor", slug: "yangin-hatlari-ve-tesisat-uygulamalari", image: img("yangin-hatlari-ve-tesisat-uygulamalari"),
    title: "Yangın Hatları ve Tesisat Uygulamaları",
    summary: "Ticari işletmeler ve fabrikalarda yangın tesisatını yapının yerleşimine, hat güzergâhlarına ve proje koşullarına göre uyguluyoruz.",
    description: "Yangın tesisatı çalışmalarında yapının yerleşimi, hat güzergâhları ve bağlantı ihtiyaçları önem taşır. Ticari işletmelerde ve fabrikalarda, mevcut proje ve saha koşulları üzerinden uygulama kapsamını belirliyor; yapılacak işleri teklif aşamasında açıklıyoruz.",
    points: ["Yapı yerleşimi ve hat güzergâhları", "Mevcut proje ve saha koşullarının değerlendirilmesi", "Teklif aşamasında açıklanan iş kapsamı"],
    faq: faqOf("yangin-tesisati-hidrofor"),
  },
  {
    category: "yangin-tesisati-hidrofor", slug: "yangin-hidrofor-sistemleri", image: img("yangin-hidrofor-sistemleri"),
    title: "Yangın Hidrofor Sistemleri",
    summary: "Yangın tesisatının su besleme ve basınç ihtiyacı için hidrofor sistemini, tesisatın proje gereksinimleriyle birlikte değerlendiriyoruz.",
    description: "Yangın hidrofor sistemi, yangın tesisatının su besleme ve basınç ihtiyacının karşılanmasında görev alır. Sistem seçimini mevcut hatlardan bağımsız ele almıyor; tesisatın proje gereksinimleri ve saha koşullarıyla birlikte değerlendiriyoruz. Ekipman ve bağlantı ihtiyaçları bu değerlendirme sonucunda netleşir.",
    points: ["Su besleme ve basınç ihtiyacı", "Tesisatla birlikte sistem seçimi", "Ekipman ve bağlantı ihtiyaçlarının belirlenmesi"],
    faq: faqOf("yangin-tesisati-hidrofor"),
  },
  {
    category: "iklimlendirme-hava-sartlandirma", slug: "isletmeye-uygun-iklimlendirme", image: img("isletmeye-uygun-iklimlendirme"),
    title: "İşletmeye Uygun İklimlendirme",
    summary: "Ofis, ticari alan ve üretim tesislerinin ısıtma ve soğutma ihtiyacına, kullanım saatlerine ve alanın özelliklerine göre sistemi belirliyoruz.",
    description: "Ofislerin, ticari alanların ve üretim tesislerinin iklimlendirme ihtiyaçları farklıdır. Isıtma ve soğutma ihtiyacını, kullanım saatlerini ve alanın özelliklerini inceleyerek sistemin kapsamını belirliyoruz. Cihaz ve uygulama seçeneklerini bu ihtiyaçlara göre değerlendiriyoruz.",
    points: ["Isıtma ve soğutma ihtiyacının incelenmesi", "Kullanım saatleri ve alan özellikleri", "İhtiyaca göre cihaz ve uygulama seçenekleri"],
    faq: faqOf("iklimlendirme-hava-sartlandirma"),
  },
  {
    category: "iklimlendirme-hava-sartlandirma", slug: "sartlandirilmis-hava-cozumleri", image: img("sartlandirilmis-hava-cozumleri"),
    title: "Şartlandırılmış Hava Çözümleri",
    summary: "Sıcaklık, nem, taze hava ve filtreleme gereksinimlerini işletmenin istediği ortam koşullarına göre birlikte ele alıyoruz.",
    description: "Hava şartlandırma, havanın ihtiyaç duyulan ortam koşullarına göre düzenlenmesini kapsar. Projeye göre sıcaklık, nem, taze hava ve filtreleme gereksinimleri birlikte ele alınabilir. Çalışmalarımızda, işletmenin istediği koşulları ve bunların mevcut yapıda nasıl sağlanabileceğini değerlendiriyoruz.",
    points: ["Sıcaklık ve nem gereksinimleri", "Taze hava ve filtreleme", "Mevcut yapıda uygulanabilirlik değerlendirmesi"],
    faq: faqOf("iklimlendirme-hava-sartlandirma"),
  },
];

const seedItems = (): ServiceItem[] => SEED.map((s, i) => ({ ...s, id: i + 1, active: true }));

// Veritabanındaki kaydın görseli boşsa (ör. tablo görselsiz oluşturulduysa) o hizmetin varsayılan görseli
export const defaultServiceImage = (slug: string): string | null => SEED.find((s) => s.slug === slug)?.image ?? null;

let tableReady = false;
export async function ensureServiceTable() {
  if (tableReady) return;
  await db().query(`CREATE TABLE IF NOT EXISTS service_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(80) NOT NULL,
    slug VARCHAR(160) NOT NULL UNIQUE,
    title VARCHAR(160) NOT NULL,
    summary VARCHAR(500) NULL,
    description TEXT NULL,
    points TEXT NULL,
    faq TEXT NULL,
    image_url VARCHAR(500) NULL,
    sort_order INT NOT NULL DEFAULT 0,
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4`);
  // Tablo ilk kez oluşturulduysa dokümandaki 6 hizmet eklenir
  const [n] = await db().query<RowDataPacket[]>("SELECT COUNT(*) AS n FROM service_items");
  if (!n[0].n) {
    for (const [i, s] of SEED.entries()) {
      await db().query("INSERT IGNORE INTO service_items SET ?", [{
        category: s.category, slug: s.slug, title: s.title, summary: s.summary, description: s.description,
        points: JSON.stringify(s.points), faq: JSON.stringify(s.faq), image_url: s.image, sort_order: i + 1, active: 1,
      }]);
    }
  }
  tableReady = true;
}

const parse = <T,>(v: unknown, fallback: T): T => {
  if (typeof v !== "string" || !v) return fallback;
  try { return JSON.parse(v) as T; } catch { return fallback; }
};

export const fromServiceRow = (r: RowDataPacket): ServiceItem => ({
  id: r.id, category: r.category, slug: r.slug, title: r.title, summary: r.summary ?? "", description: r.description ?? "",
  points: parse<string[]>(r.points, []), faq: parse<{ q: string; a: string }[]>(r.faq, []), image: r.image_url || defaultServiceImage(r.slug), active: !!r.active,
});

// Yayındaki hizmetler; kategori sırası pro-services'teki gibi, kategori içinde admin sırası
export async function getServiceItems(): Promise<ServiceItem[]> {
  let list = seedItems();
  if (dbConfigured()) {
    try {
      await ensureServiceTable();
      const [rows] = await db().query<RowDataPacket[]>("SELECT * FROM service_items WHERE active = 1 ORDER BY sort_order, id");
      list = rows.map(fromServiceRow);
    } catch (e) {
      console.error("[db] hizmetler okunamadı, varsayılanlar kullanılıyor:", (e as Error).message);
    }
  }
  const rank = (c: string) => { const i = proServices.findIndex((p) => p.slug === c); return i < 0 ? 99 : i; };
  return list.map((s, i) => ({ s, i })).sort((a, b) => rank(a.s.category) - rank(b.s.category) || a.i - b.i).map(({ s }) => s);
}

export async function getServiceItem(slug: string) {
  return (await getServiceItems()).find((s) => s.slug === slug);
}

// Kategoriler ve altındaki hizmetler (header menüsü, liste sayfası, teklif formu)
export type ServiceGroup = { category: ProService; items: ServiceItem[] };
export async function getServiceGroups(): Promise<ServiceGroup[]> {
  const items = await getServiceItems();
  return proServices.map((category) => ({ category, items: items.filter((i) => i.category === category.slug) }));
}

// Teklif formundan gelen seçim: önce hizmet, yoksa ana kategori (eski mobil sürüm kategori gönderir)
export async function serviceLabel(slug: string): Promise<string | undefined> {
  if (!slug) return undefined;
  const item = await getServiceItem(slug);
  if (item) return item.title;
  return proServiceBySlug(slug)?.short;
}

export const newServiceSlug = (title: string) => slugify(title).slice(0, 150);
