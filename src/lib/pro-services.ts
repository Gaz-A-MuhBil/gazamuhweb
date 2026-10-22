// Ticari ve endüstriyel hizmetler: /hizmetlerimiz sayfaları, ana sayfa bölümü ve mobil uygulama (/api/app/services) buradan okur.
// Metinler "GAZA Web Sitesi Ek Hizmet İçerikleri" (22.10.2026) dokümanındaki gibidir.

export type ProService = {
  slug: string;
  icon: "flame" | "fire" | "air";
  title: string; // sayfa başlığı
  short: string; // kart ve menü adı
  card: string; // ana sayfa / liste kartı metni
  more: string; // kart bağlantısı
  intro: string[];
  sections: { h: string; p: string }[];
  faq: { q: string; a: string }[];
  closing: string;
  cta: string;
  metaTitle: string;
  metaDescription: string;
};

export const proServices: ProService[] = [
  {
    slug: "ticari-endustriyel-dogalgaz",
    icon: "flame",
    title: "Ticari ve Endüstriyel Doğalgaz Projeleri",
    short: "Ticari ve Endüstriyel Doğalgaz",
    card: "Ticari işletmelerin ve fabrikaların doğalgaz projeleri, tesis içi gaz hatları ve sanayi uygulamaları için keşif ve proje desteği.",
    more: "Doğalgaz Hizmetlerini İnceleyin",
    intro: [
      "GAZ-A Mühendislik olarak ticari işletmelerin ve sanayi tesislerinin doğalgaz ihtiyaçları için proje ve uygulama hizmetleri sunuyoruz. İşletmenin kullanım amacı, mevcut altyapısı ve gaz kullanacak ekipmanları doğrultusunda çalışmanın kapsamını belirliyoruz.",
      "Yeni bir tesisin doğalgaz altyapısını oluştururken veya mevcut işletmenin gaz hattını yeniden düzenlerken, saha koşullarını ve üretim ihtiyaçlarını birlikte değerlendiriyoruz.",
    ],
    sections: [
      { h: "Ticari işletmeler için doğalgaz projeleri", p: "Ticari yapılarda doğalgaz tesisatını, işletmenin kullanım ihtiyacına göre ele alıyoruz. Hat güzergâhı, cihaz bağlantıları ve mevcut tesisatın durumu proje çalışmasının kapsamını belirler. Keşif sırasında yapılacak işleri ve uygulama adımlarını netleştirerek teklifimizi buna göre hazırlıyoruz." },
      { h: "Fabrika ve sanayi doğalgaz hatları", p: "Fabrikalarda ve üretim tesislerinde doğalgaz hatlarının, gaz kullanacak ekipmanların ihtiyaçlarıyla birlikte planlanması gerekir. Büyük sanayi hatları ve tesis içi doğalgaz uygulamalarında, mevcut altyapıyı ve bağlantı noktalarını inceleyerek projenin gerektirdiği çözümü geliştiriyoruz." },
      { h: "Keşif ve teklif süreci", p: "İşletmenizin konumunu, kullanım alanını ve doğalgaz ihtiyacını paylaşarak süreci başlatabilirsiniz. Mevcut planlar, tesis bilgileri ve cihaz listesi üzerinden ilk değerlendirmeyi yapar; yerinde keşifle iş kapsamını ve uygulama planını netleştiririz." },
    ],
    faq: [
      { q: "Teklif için hangi bilgiler gerekir?", a: "İşletmenin bulunduğu ilçe, yapı türü, mevcut doğalgaz altyapısı ve kullanılacak ekipman bilgisi ilk değerlendirmeyi kolaylaştırır. Varsa mevcut proje veya planınızı da paylaşabilirsiniz." },
      { q: "Ticari ve sanayi doğalgaz işlerinde fiyat nasıl belirlenir?", a: "İşin büyüklüğü, hatların kapsamı, bağlantı ihtiyaçları ve saha koşulları birlikte değerlendirilir. Teklif, proje ve keşif bilgileri netleştikten sonra hazırlanır." },
    ],
    closing: "Ticari yapınızın veya fabrikanızın doğalgaz ihtiyacını birlikte değerlendirelim. Keşif ve teklif için GAZ-A Mühendislik ile iletişime geçin.",
    cta: "Doğalgaz Projeniz İçin Teklif Alın",
    metaTitle: "Ticari ve Endüstriyel Doğalgaz Projeleri | GAZ-A Mühendislik",
    metaDescription: "Ticari işletmeler ve fabrikalar için doğalgaz projeleri, tesis içi gaz hatları ve sanayi doğalgaz uygulamaları. İstanbul Anadolu Yakası'nda keşif ve teklif.",
  },
  {
    slug: "yangin-tesisati-hidrofor",
    icon: "fire",
    title: "Yangın Tesisatı ve Yangın Hidrofor Sistemleri",
    short: "Yangın Tesisatı ve Hidrofor",
    card: "Ticari yapılar ve sanayi tesisleri için yangın hatları, mekanik yangın tesisatı ve hidrofor sistemlerine yönelik çözümler.",
    more: "Yangın Sistemlerini İnceleyin",
    intro: [
      "GAZ-A Mühendislik olarak ticari yapılar ve sanayi tesisleri için yangın hatları, yangın tesisatı ve yangın hidrofor sistemleri alanında hizmet veriyoruz. Çalışmanın kapsamını yapının kullanım amacı, mevcut tesisatı ve proje ihtiyaçları doğrultusunda belirliyoruz.",
      "Yangın hatları ile hidrofor sistemini birlikte değerlendirerek tesisin mekanik altyapısına uygun bir uygulama planı oluşturuyoruz.",
    ],
    sections: [
      { h: "Yangın hatları ve tesisat uygulamaları", p: "Yangın tesisatı çalışmalarında yapının yerleşimi, hat güzergâhları ve bağlantı ihtiyaçları önem taşır. Ticari işletmelerde ve fabrikalarda, mevcut proje ve saha koşulları üzerinden uygulama kapsamını belirliyor; yapılacak işleri teklif aşamasında açıklıyoruz." },
      { h: "Yangın hidrofor sistemleri", p: "Yangın hidrofor sistemi, yangın tesisatının su besleme ve basınç ihtiyacının karşılanmasında görev alır. Sistem seçimini mevcut hatlardan bağımsız ele almıyor; tesisatın proje gereksinimleri ve saha koşullarıyla birlikte değerlendiriyoruz. Ekipman ve bağlantı ihtiyaçları bu değerlendirme sonucunda netleşir." },
      { h: "Projenize göre keşif ve teklif", p: "Tesisinizin konumu, yapı türü ve mevcut yangın tesisatına ilişkin bilgileri paylaşabilirsiniz. Varsa proje, plan ve ekipman bilgileri üzerinden ön değerlendirme yapar; keşifle ihtiyaçları ve iş kapsamını belirleriz." },
    ],
    faq: [
      { q: "Mevcut tesisat için de değerlendirme yapılabilir mi?", a: "Mevcut hatlar ve hidrofor sistemi, proje bilgileri ve yerinde inceleme ile değerlendirilebilir. Yapılacak çalışmanın kapsamı bu inceleme sonucunda belirlenir." },
      { q: "Yangın hidroforu için tek başına ürün fiyatı yeterli mi?", a: "Ekipmanın proje ihtiyacıyla uyumu ve bağlantı koşulları birlikte değerlendirilmelidir. Bu nedenle teklif hazırlanırken mevcut tesisat ve uygulama kapsamı da ele alınır." },
    ],
    closing: "Yangın hatları ve hidrofor sisteminiz için ihtiyaçlarınızı paylaşın. Tesisinize yönelik keşif ve teklif sürecini birlikte planlayalım.",
    cta: "Yangın Tesisatı İçin Teklif Alın",
    metaTitle: "Yangın Tesisatı ve Yangın Hidrofor Sistemleri | GAZ-A Mühendislik",
    metaDescription: "Ticari yapılar ve sanayi tesisleri için yangın hatları, yangın tesisatı ve yangın hidrofor sistemleri. Mevcut tesisat değerlendirmesi, keşif ve teklif.",
  },
  {
    slug: "iklimlendirme-hava-sartlandirma",
    icon: "air",
    title: "İklimlendirme ve Şartlandırılmış Hava Sistemleri",
    short: "İklimlendirme ve Hava Şartlandırma",
    card: "İşletmenizin kullanım koşullarına göre iklimlendirme, taze hava ve şartlandırılmış hava ihtiyaçlarını birlikte değerlendirelim.",
    more: "İklimlendirme Hizmetlerini İnceleyin",
    intro: [
      "GAZ-A Mühendislik olarak ticari yapılarda ve sanayi tesislerinde iklimlendirme ve şartlandırılmış hava sistemleri için proje ve uygulama hizmetleri sunuyoruz. Alanın kullanım biçimini ve işletmenin ihtiyaç duyduğu ortam koşullarını birlikte değerlendiriyoruz.",
      "Sistem seçiminde mekânın büyüklüğünü, kullanım yoğunluğunu, mevcut altyapısını ve çalışma düzenini dikkate alıyoruz.",
    ],
    sections: [
      { h: "İşletmeye uygun iklimlendirme", p: "Ofislerin, ticari alanların ve üretim tesislerinin iklimlendirme ihtiyaçları farklıdır. Isıtma ve soğutma ihtiyacını, kullanım saatlerini ve alanın özelliklerini inceleyerek sistemin kapsamını belirliyoruz. Cihaz ve uygulama seçeneklerini bu ihtiyaçlara göre değerlendiriyoruz." },
      { h: "Şartlandırılmış hava çözümleri", p: "Hava şartlandırma, havanın ihtiyaç duyulan ortam koşullarına göre düzenlenmesini kapsar. Projeye göre sıcaklık, nem, taze hava ve filtreleme gereksinimleri birlikte ele alınabilir. Çalışmalarımızda, işletmenin istediği koşulları ve bunların mevcut yapıda nasıl sağlanabileceğini değerlendiriyoruz." },
      { h: "Keşiften uygulamaya", p: "İşletmenizin bulunduğu ilçeyi, kullanım alanını ve ihtiyaç duyduğunuz ortam koşullarını paylaşın. Mevcut sistem ve planlar üzerinden ilk değerlendirmeyi yapalım. Yerinde keşifle cihaz yerleşimi, altyapı ve uygulama ihtiyaçlarını netleştirerek teklifimizi hazırlayalım." },
    ],
    faq: [
      { q: "İlk değerlendirme için hangi bilgiler gerekir?", a: "Alan büyüklüğü, kullanım amacı, mevcut ısıtma ve soğutma sistemi ile ihtiyaç duyulan ortam koşulları ilk değerlendirme için yararlıdır." },
      { q: "Her işletmede aynı sistem kullanılabilir mi?", a: "Sistem seçimi yapının özelliklerine ve işletmenin ihtiyacına göre değişir. Gerekli sıcaklık, nem veya hava ihtiyacının netleştirilmesi doğru çözümün belirlenmesini kolaylaştırır." },
    ],
    closing: "İşletmenizin iklimlendirme ve hava şartlandırma ihtiyacını birlikte değerlendirelim. Projeniz için GAZ-A Mühendislik’ten bilgi ve teklif alın.",
    cta: "İklimlendirme Projeniz İçin Teklif Alın",
    metaTitle: "İklimlendirme ve Şartlandırılmış Hava Sistemleri | GAZ-A Mühendislik",
    metaDescription: "Ofis, ticari alan ve üretim tesisleri için iklimlendirme ve şartlandırılmış hava sistemleri: sıcaklık, nem, taze hava ve filtreleme. Keşif ve teklif.",
  },
];

export const proServiceBySlug = (slug: string) => proServices.find((s) => s.slug === slug);

// Ana sayfa bölümü ve /hizmetlerimiz sayfasının giriş metinleri
export const proIntro = {
  title: "Ticari Yapılar ve Sanayi Tesisleri İçin Mühendislik Hizmetleri",
  text: "GAZ-A Mühendislik olarak ticari işletmeler ve sanayi tesisleri için doğalgaz projeleri, fabrika gaz hatları, yangın tesisatı ve yangın hidrofor sistemleri ile iklimlendirme ve şartlandırılmış hava çözümleri sunuyoruz. Sancaktepe merkezimizden İstanbul Anadolu Yakası’ndaki projelerinizi değerlendiriyor, keşif ve uygulama ihtiyaçlarınıza göre teklif hazırlıyoruz.",
  about: "Ticari yapılar ve sanayi tesislerinde doğalgaz projeleri, büyük sanayi gaz hatları, yangın tesisatı ve yangın hidrofor sistemleri alanlarında çalışıyoruz. İklimlendirme ve şartlandırılmış hava ihtiyaçlarını da işletmenin kullanım koşullarıyla birlikte ele alıyor, proje ve uygulama kapsamını yerinde keşifle belirliyoruz.",
  quoteTitle: "Projeniz İçin Teklif Alın",
  quoteText: "Projenizin bulunduğu ilçeyi, yapı türünü ve ihtiyaç duyduğunuz hizmeti paylaşın. Mevcut plan ve proje bilgileri üzerinden ilk değerlendirmeyi yapalım, keşif ve teklif sürecini birlikte planlayalım.",
};
