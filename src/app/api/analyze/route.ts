import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const aiKey = process.env.GEMINI_API_KEY;
// 2026 SDK yapısına uygun modern initialization
const ai = new GoogleGenAI({ apiKey: aiKey });

const SYSTEM_INSTRUCTION = `
You are "OtoMarketer", a highly cost-efficient, autonomous AI marketing engine for e-commerce. You orchestrate three internal persona steps sequentially.

CRITICAL PERFORMANCE & COST-EFFICIENCY RULES:
1. STRICT JSON ONLY: Output ONLY raw, valid JSON. No markdown wrappers.
2. TOKEN CONSTRAINTS: Keep generated text dense, impactful, and concise. Do not use fluff words. Adhere strictly to the length limits specified. Limit platforms to the top 3 highest-ROI channels.
3. LANGUAGE SPLIT: JSON keys MUST be exactly as defined in English. All generated values MUST be in flawless, persuasive TURKISH.

EXPECTED JSON SCHEMA:
{
  "visual_analysis": {
    "product_type": "string (Dense Turkish name, max 5 words)",
    "style": "string (Aesthetics summary)",
    "design_elements": ["string (Max 4 visual bullet points)"],
    "materials": ["string"],
    "main_colors": ["string"],
    "target_audience": "string (Concise demographic hook, max 20 words)"
  },
  "seo_meta_2026": {
    "title_tag": "string (SGE-optimized, highly clickable, max 60 chars)",
    "meta_description": "string (High-converting marketing pitch, max 150 chars)",
    "keywords": ["string (Max 8 highly-searched semantic Turkish keywords)"]
  },
  "cross_platform_campaign_suggestions": {
    "campaign_theme": "string (Creative Turkish campaign slogan, max 6 words)",
    "platforms": [
      {
        "name": "string (Top 3 only, e.g., 'Instagram Reels')",
        "strategy": ["string (Exactly 2 hyper-actionable, concise growth tactics per platform)"]
      }
    ]
  }
}
`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY bulunamadı." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const imageFile = formData.get("image");
    const price = formData.get("price");

    if (!(imageFile instanceof File)) {
      return NextResponse.json(
        { error: "Görsel yüklenmesi zorunludur." },
        { status: 400 }
      );
    }

    const fiyatBilgisi =
      typeof price === "string" && price.trim().length > 0
        ? price.trim()
        : "belirtilmedi";

    // Gorseli Gemini'nin anlayacagi base64 formatina ceviriyoruz
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: imageFile.type || "image/png",
              },
            },
            {
              text: `Bu urun gorselini analiz et. Saticinin belirttigi taban fiyat: ${fiyatBilgisi}. Tam bir gorsel analiz, 2026 SEO metasi ve platformlar arasi kampanya onerileri uret.`,
            },
          ],
        },
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // Modelin kesinlikle JSON dönmesini zorunlu kılıyoruz (Teknik Puan & Doğruluk)
        responseMimeType: "application/json", 
        temperature: 0.2,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Yapay zekadan bos cikti dondu.");
    }

    const parsedJson = JSON.parse(responseText);
    return NextResponse.json(parsedJson);
  } catch (error: any) {
    const message = error?.message || "Bilinmeyen hata";
    console.error("API Hatasi:", error);
    
    if (message.includes("503") || error?.status === 503) {
      return NextResponse.json(
        { error: "Google AI sunucuları şu an yoğun talep altında. Lütfen 10 saniye sonra tekrar deneyin." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}