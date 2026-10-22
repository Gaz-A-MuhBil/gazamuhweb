import Link from "next/link";
import { notFound } from "next/navigation";
import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db";
import { SERVICE_REQ } from "@/lib/layouts";
import { proServices } from "@/lib/pro-services";
import { ensureServiceTable, fromServiceRow } from "@/lib/service-items";
import { saveService } from "../../../cms-actions";
import { SubmitButton } from "../../_client";
import { DeleteForm, ImagePreview, Label, Notice, PageHead, SizeBadge, Toggle, btnPrimary, field, fileCls } from "../../_ui";

export default async function ServiceForm({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ err?: string }> }) {
  const { id } = await params;
  const { err } = await searchParams;
  const isNew = id === "new";
  await ensureServiceTable();
  let s: ReturnType<typeof fromServiceRow> | null = null;
  let custom = false; // adminden yüklenmiş görsel var mı (yoksa varsayılan görsel gösterilir)
  if (!isNew) {
    const [rows] = await db().query<RowDataPacket[]>("SELECT * FROM service_items WHERE id = ?", [Number(id)]);
    if (!rows[0]) notFound();
    s = fromServiceRow(rows[0]);
    custom = !!rows[0].image_url;
  }
  const area = `${field} leading-relaxed`;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHead title={isNew ? "Yeni Hizmet" : "Hizmeti Düzenle"} back={{ href: "/admin/hizmetler", label: "Hizmetler" }}>
        {s && <Link href={`/hizmet/${s.slug}`} target="_blank" className="text-sm font-semibold text-accent hover:underline">Sitede gör</Link>}
      </PageHead>
      <Notice err={err} />
      <form action={saveService} className="space-y-5 rounded-2xl border border-border bg-white p-5 shadow-sm md:p-6">
        {!isNew && <input type="hidden" name="id" value={id} />}

        <div className="grid gap-5 sm:grid-cols-2">
          <Label text="Hizmet grubu" hint="Header menüsünde ve sitede bu başlığın altında listelenir.">
            <select name="category" required defaultValue={s?.category ?? ""} className={field}>
              <option value="" disabled>Seçin</option>
              {proServices.map((c) => <option key={c.slug} value={c.slug}>{c.short}</option>)}
            </select>
          </Label>
          <Label text="Hizmet adı">
            <input name="title" required maxLength={160} defaultValue={s?.title ?? ""} placeholder="Örn. Fabrika ve Sanayi Doğalgaz Hatları" className={field} />
          </Label>
        </div>

        <Label text="Sayfa adresi (isteğe bağlı)" hint="Boş bırakılırsa hizmet adından oluşturulur. Yayındaki bir hizmetin adresini değiştirirseniz eski bağlantılar çalışmaz.">
          <div className="flex items-center gap-2"><span className="text-sm text-muted">/hizmet/</span>
            <input name="slug" maxLength={160} defaultValue={s?.slug ?? ""} placeholder="fabrika-ve-sanayi-dogalgaz-hatlari" className={field} />
          </div>
        </Label>

        <Label text="Kısa açıklama" hint="Kartlarda ve sayfanın üstünde görünür; 1–2 cümle.">
          <textarea name="summary" rows={2} maxLength={500} defaultValue={s?.summary ?? ""} className={area} />
        </Label>

        <Label text="Hizmet kapsamı" hint="Her satıra bir madde yazın. Sayfada tikli liste olarak görünür.">
          <textarea name="points" rows={4} defaultValue={s?.points.join("\n") ?? ""} placeholder={"Büyük sanayi gaz hatları\nTesis içi doğalgaz uygulamaları"} className={area} />
        </Label>

        <Label text="Hizmet açıklaması" hint="Paragrafları boş satırla ayırın. &quot;• &quot; ile başlayan satırlar madde olarak gösterilir.">
          <textarea name="description" rows={8} defaultValue={s?.description ?? ""} className={area} />
        </Label>

        <Label text="Sık sorulan sorular" hint="Her soru-cevabı boş bir satırla ayırın: ilk satır soru, altındaki satır(lar) cevap.">
          <textarea name="faq" rows={8} defaultValue={s?.faq.map((f) => `${f.q}\n${f.a}`).join("\n\n") ?? ""}
            placeholder={"Teklif için hangi bilgiler gerekir?\nİşletmenin bulunduğu ilçe, yapı türü...\n\nFiyat nasıl belirlenir?\nİşin büyüklüğü..."} className={area} />
        </Label>

        <div className="space-y-3">
          <p className="text-sm font-semibold">Görsel</p>
          <SizeBadge req={SERVICE_REQ} note="kare görsel önerilir; kartlarda 4:3 kırpılır. Görsel yüklenmezse hizmetin varsayılan görseli (varsa) ya da grubun ikonlu lacivert görseli gösterilir" />
          <ImagePreview src={s?.image} className="h-32" />
          <input type="file" name="image" accept="image/jpeg,image/png,image/webp" className={fileCls} />
          {s?.image && !custom && <p className="text-xs text-muted">Şu an varsayılan görsel gösteriliyor; yeni görsel yüklerseniz o kullanılır.</p>}
          {custom && <Toggle name="remove_image" label="Yüklenen görseli kaldır (varsayılan görsele döner)" />}
        </div>

        <Toggle name="active" defaultChecked={isNew ? true : !!s?.active} label="Sitede yayınla" />
        <SubmitButton className={btnPrimary}>Kaydet</SubmitButton>
      </form>
      {!isNew && <DeleteForm table="service_items" id={Number(id)} />}
    </div>
  );
}
