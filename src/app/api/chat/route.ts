import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const dynamic = 'force-dynamic'

const token = process.env.GITHUB_KEY;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

const openai = new OpenAI({ baseURL: endpoint, apiKey: token });

export async function POST(req: Request) {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
        model,
        stream: true,
        messages,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}