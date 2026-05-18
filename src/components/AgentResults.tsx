import { useState } from "react";
import { Eye, Search, Megaphone, Copy, Check } from "lucide-react";

interface AgentResultsProps {
  data: any;
}

export default function AgentResults({ data }: AgentResultsProps) {
  const [activeTab, setActiveTab] = useState<"visual" | "seo" | "growth">("visual");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const visual = data?.gorselAnalizi || data?.visual_analysis || {};
  const seo = data?.seoMetasi2026 || data?.seo_strategy || {};
  const growth = data?.growth_campaign || data?.growthCampaign || {};

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="flex flex-col h-full justify-between gap-6">
      <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
        <button
          onClick={() => setActiveTab("visual")}
          className={`flex items-center justify-center gap-2 text-xs md:text-sm font-medium py-2.5 rounded-md transition-all ${
            activeTab === "visual" ? "bg-[#D1FF1A] text-black font-semibold" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Eye className="w-4 h-4" /> Görsel Analist
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`flex items-center justify-center gap-2 text-xs md:text-sm font-medium py-2.5 rounded-md transition-all ${
            activeTab === "seo" ? "bg-[#D1FF1A] text-black font-semibold" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Search className="w-4 h-4" /> 2026 SEO Uzmanı
        </button>
        <button
          onClick={() => setActiveTab("growth")}
          className={`flex items-center justify-center gap-2 text-xs md:text-sm font-medium py-2.5 rounded-md transition-all ${
            activeTab === "growth" ? "bg-[#D1FF1A] text-black font-semibold" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Megaphone className="w-4 h-4" /> Büyüme Müdürü
        </button>
      </div>

      <div className="flex-1 bg-zinc-900/30 border border-zinc-900 rounded-xl p-5 overflow-y-auto max-h-[500px]">
        {activeTab === "visual" && (
          <div className="space-y-5 transition-all duration-300 animate-fade-in">
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Tespit Edilen Konu</h4>
              <p className="text-sm text-zinc-200 font-medium">{visual.konu || visual.subject || "Belirtilmedi"}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Ana Unsurlar</h4>
              <div className="flex flex-wrap gap-2">
                {(visual.anaUnsurlar || visual.detected_features || []).map((item: string, i: number) => (
                  <span key={i} className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md font-mono">{item}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-zinc-900/50 border border-zinc-800/60 p-4 rounded-lg">
                <h5 className="text-xs font-bold text-[#D1FF1A] uppercase tracking-wider mb-1">Hedef Kitle</h5>
                <p className="text-xs text-zinc-400 leading-relaxed">{visual.hedefKitle || visual.target_audience_demographics}</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800/60 p-4 rounded-lg">
                <h5 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">Çıkarılan Ürün/Hizmet</h5>
                <p className="text-xs text-zinc-400 leading-relaxed">{visual.cikarilanUrunHizmet || visual.material_and_quality}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-5 transition-all duration-300 animate-fade-in">
            <div className="relative group bg-zinc-900/40 p-4 rounded-lg border border-zinc-800/80">
              <h4 className="text-xs font-semibold text-[#D1FF1A] uppercase tracking-wider mb-1">AI-First Başlık Önerisi</h4>
              <p className="text-base text-zinc-100 font-bold pr-8">{seo.baslik || seo.ai_first_title}</p>
              <button onClick={() => handleCopy(seo.baslik || seo.ai_first_title, "seoTitle")} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                {copiedField === "seoTitle" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Genişletilmiş Ürün Hikayesi</h4>
              <div
                className="text-xs text-zinc-400 bg-zinc-950 p-4 rounded-lg border border-zinc-900 leading-relaxed max-h-[180px] overflow-y-auto"
                style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
                dangerouslySetInnerHTML={{ __html: seo.aciklama || seo.product_description_html }}
              />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Long-Tail Anahtar Kelimeler</h4>
              <div className="flex flex-wrap gap-1.5">
                {(seo.anahtarKelimeler || seo.long_tail_keywords || []).map((keyword: string, idx: number) => (
                  <span key={idx} onClick={() => handleCopy(keyword, `kw-${idx}`)} className="text-xs bg-zinc-950 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded cursor-pointer flex items-center gap-1">
                    {keyword} {copiedField === `kw-${idx}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 opacity-50" />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "growth" && (
          <div className="space-y-5 transition-all duration-300 animate-fade-in">
            <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-800">
              <h4 className="text-xs font-semibold text-[#D1FF1A] uppercase tracking-wider mb-1">Değer Odaklı Fiyatlandırma Stratejisi</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">{growth.perceived_value_pricing_tip}</p>
            </div>
            <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-800">
              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">Otonom Kampanya Kurgusu</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{growth.promotional_campaign_idea}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-900">
                <h5 className="text-xs font-bold text-zinc-400 mb-2">Instagram / FB Reklam Metni</h5>
                <p className="text-xs text-zinc-500 whitespace-pre-wrap">{growth.ad_copy?.meta_instagram}</p>
              </div>
              <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-900">
                <h5 className="text-xs font-bold text-zinc-400 mb-2">TikTok Hook & Script</h5>
                <p className="text-xs text-zinc-500 whitespace-pre-wrap">{growth.ad_copy?.tiktok_hook_and_script}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
