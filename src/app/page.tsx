"use client";

import { useState } from "react";
import { OtoMarketerResponse } from "@/types/marketing";
import { Sparkles, Upload, Loader2, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [data, setData] = useState<OtoMarketerResponse | null>(null);

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
          <h2 className="text-xl font-semibold text-zinc-200">Ürün Girdileri</h2>
          
          {/* Drag & Drop File Upload */}
          <div className="border-2 border-dashed border-zinc-800 hover:border-[#D1FF1A] transition-colors rounded-lg p-8 text-center cursor-pointer flex flex-col items-center justify-center gap-3 bg-zinc-900/50">
            <Upload className="w-10 h-10 text-zinc-500" />
            <p className="text-sm text-zinc-400">Ürün fotoğrafını sürükleyin veya seçin</p>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="fileInput" 
              onChange={(e) => e.target.files && setImage(e.target.files[0])} 
            />
            <label htmlFor="fileInput" className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded cursor-pointer transition-colors">
              Dosya Seç
            </label>
            {image && <p className="text-xs text-[#D1FF1A] font-medium">✓ {image.name}</p>}
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
            className="w-full bg-[#D1FF1A] text-black hover:bg-[#b8e014] transition-colors font-semibold text-sm py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
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
              <pre className="text-xs bg-zinc-900 p-4 rounded overflow-auto max-h-[400px] text-zinc-400 border border-zinc-800">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}