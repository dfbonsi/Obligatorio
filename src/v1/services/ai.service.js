import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    return response.output[0].content[0].text;

  } catch (error) {
    //console.error("Error IA:", error.message);
     throw error;
  }
}