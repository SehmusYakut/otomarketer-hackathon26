import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const aiKey = process.env.GEMINI_API_KEY;
// 2026 SDK yapısına uygun modern initialization
const ai = new GoogleGenAI({ apiKey: aiKey });

const SYSTEM_INSTRUCTION = `
You are "OtoMarketer", an autonomous, multi-agent AI marketing engine. 
You must strictly respond with a single, valid JSON object matching the requested schema. 
Do not wrap your output in markdown code blocks. The current year is 2026.
`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;
    const price = formData.get("price") as string;
    
    if (!imageFile) {
      return NextResponse.json({ error: "Görsel yüklenmesi zorunludur." }, { status: 400 });
    }

    // Görseli Gemini'ın anlayacağı base64 formatına çeviriyoruz
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const base64Image = buffer.toString("base64");

    // Gemini 2.5 Flash API Çağrısı
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: imageFile.type,
              },
            },
            {
              text: `Analyze this product image. Base price configured by seller is ${price}. Generate full visual analysis, 2026 SEO meta-data, and cross-platform growth campaigns.`,
            },
          ],
        },
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // Modelin kesinlikle JSON dönmesini zorunlu kılıyoruz (Teknik Puan & Doğruluk)
        responseMimeType: "application/json", 
        temperature: 0.2,
      }
    });

    const responseText = response.text;
    if (!responseText) throw new Error("Yapay zekadan boş çıktı döndü.");

    const parsedJson = JSON.parse(responseText);
    return NextResponse.json(parsedJson);

  } catch (error: any) {
    console.error("Hackathon API Error:", error);
    return NextResponse.json({ error: error.message || "İç sunucu hatası" }, { status: 500 });
  }
}