import { useState } from "react";
import { Eye, Search, Megaphone, Copy, Check } from "lucide-react";

interface AgentResultsProps {
  data: any;
}

export default function AgentResults({ data }: AgentResultsProps) {
  const [activeTab, setActiveTab] = useState<"visual" | "seo" | "growth">("visual");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!data) return null;

  // STRICT BINDING TO THE NEW JSON PAYLOAD
  const visual = data.visual_analysis || {};
  const seo = data.seo_meta_2026 || {};
  const campaign = data.cross_platform_campaign_suggestions || {};

  const handleCopy = (text: string, fieldId: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="flex flex-col h-full justify-between gap-6 animate-fade-in">
      
      {/* TABS */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
        <button onClick={() => setActiveTab("visual")} className={`flex items-center justify-center gap-2 text-xs md:text-sm font-medium py-2.5 rounded-md transition-all ${activeTab === "visual" ? "bg-[#D1FF1A] text-black font-semibold" : "text-zinc-400 hover:text-zinc-200"}`}>
          <Eye className="w-4 h-4" /> Görsel Analist
        </button>
        <button onClick={() => setActiveTab("seo")} className={`flex items-center justify-center gap-2 text-xs md:text-sm font-medium py-2.5 rounded-md transition-all ${activeTab === "seo" ? "bg-[#D1FF1A] text-black font-semibold" : "text-zinc-400 hover:text-zinc-200"}`}>
          <Search className="w-4 h-4" /> 2026 SEO Uzmanı
        </button>
        <button onClick={() => setActiveTab("growth")} className={`flex items-center justify-center gap-2 text-xs md:text-sm font-medium py-2.5 rounded-md transition-all ${activeTab === "growth" ? "bg-[#D1FF1A] text-black font-semibold" : "text-zinc-400 hover:text-zinc-200"}`}>
          <Megaphone className="w-4 h-4" /> Büyüme Müdürü
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-zinc-900/30 border border-zinc-900 rounded-xl p-5 overflow-y-auto max-h-[500px]">
        
        {/* VISUAL TAB */}
        {activeTab === "visual" && (
          <div className="space-y-4">
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Ürün Tipi</span>
                <p className="text-sm font-bold text-zinc-200">{visual.product_type || "Belirtilmedi"}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 uppercase block">Stil</span>
                <p className="text-sm font-bold text-[#D1FF1A]">{visual.style || "Belirtilmedi"}</p>
              </div>
            </div>
            
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Tasarım Elementleri</span>
              <div className="flex flex-wrap gap-1.5">
                {(visual.design_elements || []).map((el: string, i: number) => (
                  <span key={i} className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded">✓ {el}</span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Materyal ve Renkler</span>
              <div className="flex flex-wrap gap-1.5">
                {(visual.materials || []).concat(visual.main_colors || []).map((item: string, i: number) => (
                  <span key={i} className="text-[11px] bg-zinc-950 text-zinc-400 px-2 py-1 rounded border border-zinc-800">{item}</span>
                ))}
              </div>
            </div>

            <div className="bg-zinc-950 p-3 rounded border border-zinc-900">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Hedef Kitle</span>
              <p className="text-xs text-zinc-400">{visual.target_audience}</p>
            </div>
          </div>
        )}

        {/* SEO TAB */}
        {activeTab === "seo" && (
          <div className="space-y-4">
            <div className="relative bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
              <span className="text-[10px] text-[#D1FF1A] uppercase font-bold block mb-1">2026 AI-First Başlık</span>
              <p className="text-sm font-bold text-white pr-8">{seo.title_tag}</p>
              <button onClick={() => handleCopy(seo.title_tag, "title")} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                {copiedField === "title" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="bg-zinc-950 p-4 rounded border border-zinc-900">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">Meta Açıklama / Hikaye</span>
              <p className="text-xs text-zinc-300 leading-relaxed">{seo.meta_description}</p>
            </div>

            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-2">Semantik Keywords</span>
              <div className="flex flex-wrap gap-1.5">
                {(seo.keywords || []).map((kw: string, i: number) => (
                  <span key={i} onClick={() => handleCopy(kw, `kw-${i}`)} className="cursor-pointer text-xs bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded flex items-center gap-1 transition-colors">
                    {kw} {copiedField === `kw-${i}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 opacity-30" />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GROWTH TAB */}
        {activeTab === "growth" && (
          <div className="space-y-4">
            <div className="bg-[#D1FF1A]/10 p-3 rounded-lg border border-[#D1FF1A]/20">
              <p className="text-sm text-[#D1FF1A] font-bold text-center">Kampanya: {campaign.campaign_theme}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {(campaign.platforms || []).map((platform: any, i: number) => (
                <div key={i} className="bg-zinc-950 p-4 rounded border border-zinc-900 space-y-2">
                  <span className="text-xs font-bold text-white bg-zinc-800 px-2 py-1 rounded inline-block">{platform.name}</span>
                  <ul className="space-y-1.5">
                    {(platform.strategy || []).slice(0, 3).map((strat: string, idx: number) => (
                      <li key={idx} className="text-xs text-zinc-400 flex items-start gap-1.5">
                        <span className="text-zinc-600 mt-0.5">•</span> <span>{strat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}