import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db";
import { proServiceBySlug } from "@/lib/pro-services";
import { ensureServiceTable } from "@/lib/service-items";
import { AdminList, Notice, PageHead } from "../_ui";

export default async function ServicesAdmin({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  await ensureServiceTable();
  const [rows] = await db().query<RowDataPacket[]>("SELECT * FROM service_items ORDER BY sort_order, id");
  return (
    <>
      <PageHead title="Hizmetler"
        sub="GAZ-A Mühendislik sitesinde header'daki &quot;Hizmetlerimiz&quot; menüsünde ve /hizmetlerimiz sayfalarında görünen hizmetler. Her hizmetin ürün sayfası gibi kendi sayfası vardır; sepete eklenmez, ziyaretçi teklif formu gönderir (Bilgi Talepleri'ne düşer). Sıralama, aynı gruptaki hizmetlerin sitedeki sırasını belirler."
        newHref="/admin/hizmetler/new" newLabel="Yeni Hizmet" />
      <Notice saved={saved} />
      <AdminList table="service_items" base="/admin/hizmetler" empty="Henüz hizmet eklenmemiş."
        rows={rows.map((r) => ({ id: r.id, thumb: r.image_url, title: r.title, sub: `${proServiceBySlug(r.category)?.short ?? r.category} · /hizmet/${r.slug}`, active: r.active }))} />
    </>
  );
}
