import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

serve(async (req) => {
  const a = Deno.env.get("GPT_KEY");

  const body = await req.json();
  if (!body?.product) {
    return new Response(
      JSON.stringify({
        error: "Não foi enviado um produto!",
        message: "Não foi enviado um produto!",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
  const gptResponse = await axiod.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Um caderno é descartado no lixo reciclável pois é predominantemente composto por papel, levando em consideração a predominância dos materiais e as seguintes classificações: Lixo-Orgânico Lixo Reciclável Lixo Eletrônico Resíduos Perigosos Lixo não Reciclável Em qual categoria podemos classificar o seguinte produto: ${body.product}? Retorne apenas a categoria no formato JSON contendo como atributos o nome, a categoria e uma justificativa para encaixá-lo na categoria retornada.`,
        },
      ],
      temperature: 0,
    },
    {
      headers: {
        Authorization: `Bearer ${a}`,
      },
    }
  );

  const responseData = JSON.parse(gptResponse.data.choices[0].message.content);
  return new Response(JSON.stringify(responseData), {
    headers: { "Content-Type": "application/json" },
  });
});
