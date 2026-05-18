import { useState } from "react";
import { Eye, Search, Megaphone, Copy, Check, Info } from "lucide-react";

interface AgentResultsProps {
  data: any;
}

export default function AgentResults({ data }: AgentResultsProps) {
  const [activeTab, setActiveTab] = useState<"visual" | "seo" | "growth">("visual");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Bind exact keys from the terminal payload
  const visual = data?.gorsel_analizi || {};
  const seo = data?.seo_metasi_2026 || {};
  const growth = data?.platformlar_arasi_kampanya_onerileri || {};
  const pricing = data?.taban_fiyat_onerisi || "";

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="flex flex-col h-full justify-between gap-6 animate-fade-in">
      {/* Tab Selectors */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
        <button
          onClick={() => setActiveTab("visual")}
          className={`flex items-center justify-center gap-2 text-xs md:text-sm font-medium py-2.5 rounded-md transition-all ${
            activeTab === "visual" ? "bg-[#D1FF1A] text-black font-semibold shadow-md" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Eye className="w-4 h-4" /> Görsel Analist
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`flex items-center justify-center gap-2 text-xs md:text-sm font-medium py-2.5 rounded-md transition-all ${
            activeTab === "seo" ? "bg-[#D1FF1A] text-black font-semibold shadow-md" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Search className="w-4 h-4" /> 2026 SEO Uzmanı
        </button>
        <button
          onClick={() => setActiveTab("growth")}
          className={`flex items-center justify-center gap-2 text-xs md:text-sm font-medium py-2.5 rounded-md transition-all ${
            activeTab === "growth" ? "bg-[#D1FF1A] text-black font-semibold shadow-md" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Megaphone className="w-4 h-4" /> Büyüme Müdürü
        </button>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 bg-zinc-900/30 border border-zinc-900 rounded-xl p-5 overflow-y-auto max-h-[550px] space-y-6">
        {/* TAB 1: VISUAL ANALYST */}
        {activeTab === "visual" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">Ürün Tipi</h4>
                <p className="text-sm text-zinc-200 font-medium">{visual.urun_tipi || "Belirtilmedi"}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">Stil / Estetik</h4>
                <p className="text-sm text-[#D1FF1A] font-medium">{visual.stil || visual.estetik}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Renk Paleti</h4>
              <p className="text-sm text-zinc-300 font-mono">{visual.renkler}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Öne Çıkan Özellikler</h4>
              <div className="flex flex-wrap gap-2">
                {(visual.one_cikan_ozellikler || []).map((item: string, i: number) => (
                  <span key={i} className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800/60 p-4 rounded-lg">
              <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Hedef Kitle Demografisi</h5>
              <ul className="list-disc pl-4 space-y-1 text-xs text-zinc-400">
                {(visual.hedef_kitle || []).map((kitle: string, idx: number) => (
                  <li key={idx}>{kitle}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: SEO STRATEGIST */}
        {activeTab === "seo" && (
          <div className="space-y-5">
            <div className="relative group bg-zinc-900/40 p-4 rounded-lg border border-zinc-800/80">
              <h4 className="text-xs font-semibold text-[#D1FF1A] uppercase tracking-wider mb-1">2026 AI-First Başlık</h4>
              <p className="text-sm md:text-base text-zinc-100 font-bold pr-8">{seo.baslik}</p>
              <button onClick={() => handleCopy(seo.baslik, "seoTitle")} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                {copiedField === "seoTitle" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Ürün Açıklaması / Hikayesi</h4>
              <p className="text-xs md:text-sm text-zinc-400 bg-zinc-950 p-4 rounded-lg border border-zinc-900 leading-relaxed">
                {seo.aciklama}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Semantik Anahtar Kelimeler (Kopyalamak için Tıkla)</h4>
              <div className="flex flex-wrap gap-1.5">
                {(seo.anahtar_kelimeler || []).map((keyword: string, idx: number) => (
                  <span key={idx} onClick={() => handleCopy(keyword, `kw-${idx}`)} className="text-xs bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded cursor-pointer flex items-center gap-1 transition-colors">
                    {keyword} {copiedField === `kw-${idx}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 opacity-40" />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GROWTH MANAGER */}
        {activeTab === "growth" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Instagram */}
              {growth.instagram && (
                <div className="bg-zinc-900/40 p-4 rounded-lg border border-zinc-800 space-y-2">
                  <span className="text-[10px] bg-purple-500/10 text-purple-400 font-mono px-2 py-0.5 rounded">Instagram</span>
                  <p className="text-xs text-zinc-300 font-medium">{growth.instagram.reklam_onerileri}</p>
                  <div className="text-[11px] text-zinc-500 space-y-1">
                    {growth.instagram.icerik_stratejisi?.slice(0, 2).map((s: string, i: number) => <p key={i}>• {s}</p>)}
                  </div>
                </div>
              )}

              {/* TikTok */}
              {growth.tiktok && (
                <div className="bg-zinc-900/40 p-4 rounded-lg border border-zinc-800 space-y-2">
                  <span className="text-[10px] bg-red-500/10 text-red-400 font-mono px-2 py-0.5 rounded">TikTok</span>
                  <p className="text-xs text-zinc-300 font-medium">{growth.tiktok.reklam_onerileri}</p>
                  <div className="text-[11px] text-zinc-500 space-y-1">
                    {growth.tiktok.icerik_stratejisi?.slice(0, 2).map((s: string, i: number) => <p key={i}>• {s}</p>)}
                  </div>
                </div>
              )}

              {/* Google Ads */}
              {growth.google_ads && (
                <div className="bg-zinc-900/40 p-4 rounded-lg border border-zinc-800 space-y-2">
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 font-mono px-2 py-0.5 rounded">Google Ads</span>
                  <p className="text-xs text-zinc-500"><strong className="text-zinc-400">Yöntemler:</strong> {growth.google_ads.kampanya_tipleri?.join(", ")}</p>
                </div>
              )}

              {/* E-Posta */}
              {growth.e_posta_pazarlamasi && (
                <div className="bg-zinc-900/40 p-4 rounded-lg border border-zinc-800 space-y-1">
                  <span className="text-[10px] bg-green-500/10 text-green-400 font-mono px-2 py-0.5 rounded">E-Posta Otomasyonu</span>
                  <p className="text-xs text-zinc-400">{growth.e_posta_pazarlamasi.otomasyon}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pricing / Valuation Badge Footer */}
      {pricing && (
        <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-lg flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#D1FF1A] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="text-zinc-400 font-semibold block mb-0.5">Yapay Zeka Değer Odaklı Taban Fiyat Önerisi:</span>
            <span className="text-zinc-300 leading-relaxed">{pricing}</span>
          </div>
        </div>
      )}
    </div>
  );
}
