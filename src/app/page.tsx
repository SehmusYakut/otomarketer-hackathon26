"use client";
import AgentResults from "../components/AgentResults";

import { useEffect, useState } from "react";
import { OtoMarketerResponse } from "@/types/marketing";
import { Sparkles, Upload, Loader2, CheckCircle2, X } from "lucide-react";

export default function Dashboard() {
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [data, setData] = useState<OtoMarketerResponse | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const sampleImageUrl =
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200";

  const sampleData: OtoMarketerResponse = {
    visual_analysis: {
      detected_features: ["premium sneaker", "beyaz taban", "siyah-gri üst", "spor siluet"],
      color_palette: ["siyah", "gri", "beyaz", "kırık beyaz"],
      material_and_quality:
        "Mat dokulu sentetik deri ve nefes alabilir file kombinasyonu; yüksek kontrastlı premium görünüm.",
      target_audience_demographics:
        "18-32 yaş arası şehirli sneaker meraklıları; aktif yaşam tarzı, trend ve performans odaklı kitle.",
    },
    seo_strategy: {
      ai_first_title: "UrbanFlex Prime: Şehirde Premium Konfor Sunan Sneaker",
      product_description_html:
        "<p><strong>UrbanFlex Prime</strong>, şehir temposuna ayak uyduran premium sneaker deneyimi sunar. Hafif tabanı ve nefes alabilir üst yüzeyi ile gün boyu konfor sağlarken, minimal çizgileri ile her kombine uyum verir.</p><ul><li>Günlük kullanım ve performans için dengeli tasarım</li><li>Şehir stiline uyumlu premium görünüm</li><li>Uzun süreli konfor ve dayanıklılık</li></ul>",
      long_tail_keywords: [
        "premium sneaker erkek",
        "şehir içi konfor ayakkabı",
        "nefes alabilir spor ayakkabı",
        "minimal tasarım sneaker",
        "günlük kullanım performans ayakkabısı",
      ],
      structured_data_json_ld: {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "UrbanFlex Prime Sneaker",
        "image": [sampleImageUrl],
        "description": "Şehir yaşamına uygun premium sneaker; hafif taban ve nefes alabilir üst yüzey.",
        "brand": { "@type": "Brand", "name": "OtoMarketer" },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "TRY",
          "price": "1250",
          "availability": "https://schema.org/InStock",
        },
      },
    },
    growth_campaign: {
      perceived_value_pricing_tip:
        "Fiyatı premium algısını destekleyen sınırlı stok ve kalite vurgusu ile konumlandırın.",
      promotional_campaign_idea:
        "\"Şehir Ritmi\" kampanyası: 72 saatlik özel lansman indirimi ve influencer eşleştirmeleri.",
      ad_copy: {
        meta_instagram:
          "Şehirde premium konforla fark yarat. UrbanFlex Prime ile her adımda stil ve performans birleşiyor.",
        tiktok_hook_and_script:
          "Hook: Gün boyu konfor, tek sneaker. Script: UrbanFlex Prime ile şehir ritmine uyum sağla!",
      },
    },
  };

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSampleProduct = () => {
    setPrice("1250 TL");
    setImage(null);
    setImagePreview(sampleImageUrl);
    setData(sampleData);
  };

  const handleRemoveImage = () => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setImage(file);
    setImagePreview(objectUrl);
  };

  const handleRunAgents = async () => {
    if (!image) return alert("Lütfen önce bir ürün görseli yükleyin!");
    
    setLoading(true);
    // Adım adım otonom ajan hissini simüle eden UX akışı
    setCurrentStep("Ajan 1: Görsel Analiz Motoru Devrede...");
    
    const formData = new FormData();
    formData.append("image", image);
    formData.append("price", price);

    try {
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      
      setCurrentStep("Ajan 2: 2026 SEO ve Semantik İçerikler Üretiliyor...");
      const result = await res.json();
      
      setCurrentStep("Ajan 3: Büyüme ve Kampanya Senaryoları Kurgulanıyor...");
      if (res.ok) {
        setData(result);
      } else {
        alert(result.error || "Bir hata oluştu.");
      }
    } catch (err) {
      alert("Bağlantı hatası gerçekleşti.");
    } finally {
      setLoading(false);
      setCurrentStep("");
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-white p-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
            Oto<span className="text-[#D1FF1A]">Marketer</span> <Sparkles className="w-6 h-6 text-[#D1FF1A]" />
          </h1>
          <p className="text-zinc-400 text-sm">Mikro Satıcılar İçin Otonom Yapay Zeka Pazarlama Departmanı</p>
        </div>
        <div className="text-xs bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-zinc-500">
          Hackathon'26 MVP Alpha
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sol Panel: Ingestion Form */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-xl p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-200">Ürün Girdileri</h2>
            <button
              type="button"
              onClick={handleSampleProduct}
              className="text-xs text-zinc-200 bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800 px-3 py-1 rounded-full transition-colors"
            >
              ✨ Örnek Ürünle Dene
            </button>
          </div>
          
          {/* Drag & Drop File Upload */}
          <div className="relative border-2 border-dashed border-zinc-800 hover:border-[#D1FF1A] transition-colors rounded-lg p-8 text-center cursor-pointer flex flex-col items-center justify-center gap-3 bg-zinc-900/50">
            {!imagePreview && (
              <>
                <Upload className="w-10 h-10 text-zinc-500" />
                <p className="text-sm text-zinc-400">Ürün fotoğrafını sürükleyin veya seçin</p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileInput"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageChange(file);
              }}
            />
            {!imagePreview && (
              <label
                htmlFor="fileInput"
                className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded cursor-pointer transition-colors"
              >
                Dosya Seç
              </label>
            )}
            {imagePreview && (
              <div className="relative w-full">
                <img
                  src={imagePreview}
                  alt="Ürün önizleme"
                  className="w-full h-48 object-cover rounded-xl border border-zinc-800"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 flex items-center gap-1 text-[10px] uppercase tracking-wide bg-red-500/90 hover:bg-red-500 text-white px-2 py-1 rounded-full"
                >
                  <X className="w-3 h-3" /> Kaldır
                </button>
              </div>
            )}
          </div>

          {/* Fiyat Girişi */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400 font-medium">Hedef Satış Fiyatı (Opsiyonel)</label>
            <input 
              type="text" 
              placeholder="Örn: 450 TL" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#D1FF1A] text-zinc-100"
            />
          </div>

          <button
            onClick={handleRunAgents}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#D1FF1A] via-[#e6ff6a] to-[#D1FF1A] text-black hover:shadow-[0_0_18px_rgba(209,255,26,0.35)] transition-all duration-300 font-semibold text-sm py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 animate-cta-pulse"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Otonom Büyüme Ajanlarını Çalıştır
          </button>
        </div>

        {/* Sağ Panel: Ajan Dashboard Çıktıları */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-xl p-6 min-h-[500px] flex flex-col justify-between">
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
              <Loader2 className="w-12 h-12 text-[#D1FF1A] animate-spin" />
              <p className="text-zinc-300 font-medium text-lg animate-pulse">{currentStep}</p>
              <p className="text-xs text-zinc-500">Ajanlar arası mutabakat sağlanıyor...</p>
            </div>
          )}

          {!loading && !data && (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 text-sm gap-2">
              <p>Henüz analiz başlatılmadı.</p>
              <p className="text-xs text-zinc-600">Sol panelden ürün görseli yükleyip ajanları tetikleyin.</p>
            </div>
          )}

          {!loading && data && (
            <div className="flex-1 flex flex-col gap-6">
              {/* Buraya Prompt 4 ile oluşturacağın Tab yapıları ve ajan sonuç kartları render edilecek */}
              <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D1FF1A]" />
                <p className="text-sm font-medium text-zinc-300">Ajanlar görevini tamamladı! Çıktılar hazır.</p>
              </div>
              <AgentResults data={data} />
            </div>
          )}

          <div className="mt-6 border-t border-zinc-900 pt-4 text-xs text-zinc-400">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                <span>Core Engine: Gemini-2.5-flash</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]" />
                <span>Pipeline: LangGraph Autonomous Orchestration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.7)]" />
                <span>Output: Structured JSON Verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}