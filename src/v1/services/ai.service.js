import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.IA_API_KEY);

export async function generarDescripcionIA(data) {
  try {
    const prompt = `
    Genera una descripción atractiva para una propiedad en alquiler:

    Título: ${data.title}
    Ciudad: ${data.location.city}
    Zona: ${data.location.zone}
    Habitaciones: ${data.rooms}
    Baños: ${data.bathrooms}
    Precio por noche: ${data.price_by_night}
    `;

    const iaModel = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: {
        role: "system",
        parts: [{ text: "Eres un editor de estilo experto. Tu única función es generar una unica descripcion. Devuelve solo el texto corregido, sin introducciones ni despedidas." }]
      }
    });

    const result = await iaModel.generateContent(prompt);
    return result.response.text().trim();

  } catch (error) {
    //console.error("Error IA:", error.message);
     throw error;
  }
}




