import OpenAI from "openai";

export class ChatGPT {
  static async chat(prompt: string): Promise<string> {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "assistant", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const results = completion.choices;

    if (results.length === 0) {
      console.log("No results");
      return "";
    }

    const reply = results[0].message.content;

    if (!reply) return "";

    return reply;
  }

  static async tts(input: string) {
    if (!input) return new ArrayBuffer(0);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const mp3 = await openai.audio.speech.create({
      model: "tts-1-hd",
      voice: "echo",
      input: input,
    });

    const audio = await mp3.arrayBuffer();
    return audio;
  }
}
