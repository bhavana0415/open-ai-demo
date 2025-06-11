import {
    Message as VercelChatMessage,
    StreamingTextResponse,
    createStreamDataTransformer
} from 'ai';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RunnableSequence } from '@langchain/core/runnables'
import { formatDocumentsAsString } from 'langchain/util/document';

const loader = new JSONLoader(
    "src/data/states.json",
    ["/state", "/code", "/nickname", "/website", "/admission_date", "/admission_number", "/capital_city", "/capital_url", "/population", "/population_rank", "/constitution_url", "/twitter_url"],
);

export const dynamic = 'force-dynamic'

const token = process.env.GITHUB_KEY;
const endpoint = "https://models.github.ai/inference";

/**
 * Enhanced memory formatter that includes both user and assistant messages
 */
const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are a helpful assistant. Use the following context when relevant. 
You should also remember facts from the conversation history.
==============================
Context: {context}
==============================
Current conversation: {chat_history}

user: {question}
assistant:`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Include ALL previous messages (both user and assistant) in the history
        const formattedPreviousMessages = messages.map(formatMessage);

        const currentMessageContent = messages[messages.length - 1].content;

        const docs = await loader.load();

        const prompt = PromptTemplate.fromTemplate(TEMPLATE);

        const model = new ChatOpenAI({
            apiKey: token,
            model: 'openai/gpt-4.1',
            configuration: {
                baseURL: endpoint,
            },
            temperature: 0,
            streaming: true,
            verbose: true,
        });

        const parser = new HttpResponseOutputParser();

        const chain = RunnableSequence.from([
            {
                question: (input) => input.question,
                chat_history: (input) => input.chat_history,
                context: () => formatDocumentsAsString(docs),
            },
            prompt,
            model,
            parser,
        ]);

        const stream = await chain.stream({
            // Pass the complete chat history including assistant responses
            chat_history: formattedPreviousMessages.join('\n'),
            question: currentMessageContent,
        });

        return new StreamingTextResponse(
            stream.pipeThrough(createStreamDataTransformer()),
        );
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: e.status ?? 500 });
    }
}