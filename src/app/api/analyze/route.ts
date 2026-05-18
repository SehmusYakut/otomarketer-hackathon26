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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Bilinmeyen hata";
    console.error("API Hatasi:", error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}