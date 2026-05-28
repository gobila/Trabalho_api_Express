import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env para o process.env
dotenv.config();

// 1. Função auxiliar para o Gemini
async function generateWorkoutGemini(prompt: string, apiKey: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
    });
    
    if (!response.text) {
        throw new Error("Gemini returned an empty response.");
    }
    return response.text;
}

// 2. Função auxiliar para OpenAI e provedores compatíveis (Groq, Qwen)
async function generateWorkoutOpenAICompatible(
    prompt: string, 
    apiKey: string, 
    baseUrl: string | undefined, 
    modelName: string
): Promise<string> {
    const client = new OpenAI({
        apiKey: apiKey,
        baseURL: baseUrl // Se for undefined, a biblioteca usa o padrão da OpenAI
    });

    const response = await client.chat.completions.create({
        model: modelName,
        messages: [{ role: 'user', content: prompt }]
    });

    return response.choices[0].message.content || '';
}

// 3. Função centralizadora exportada
export async function generateWorkoutWithAI(provider: string, prompt: string): Promise<string> {
    const targetProvider = provider.toLowerCase();
    let apiKey: string | undefined;

    switch (targetProvider) {
        case 'gemini':
            apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) throw new Error("GEMINI_API_KEY key is not configured in .env file");
            return await generateWorkoutGemini(prompt, apiKey);

        case 'openai':
            apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey) throw new Error("OPENAI_API_KEY key is not configured in .env file");
            return await generateWorkoutOpenAICompatible(prompt, apiKey, undefined, 'gpt-4o-mini');

        case 'groq':
            apiKey = process.env.GROQ_API_KEY;
            if (!apiKey) throw new Error("GROQ_API_KEY key is not configured in .env file");
            return await generateWorkoutOpenAICompatible(
                prompt, 
                apiKey, 
                'https://api.groq.com/openai/v1', 
                'llama-3.1-8b-instant'
            );

        case 'qwen':
            apiKey = process.env.QWEN_API_KEY;
            if (!apiKey) throw new Error("QWEN_API_KEY key is not configured in .env file");
            return await generateWorkoutOpenAICompatible(
                prompt, 
                apiKey, 
                'https://dashscope.aliyuncs.com/compatible-mode/v1', 
                'qwen-plus'
            );

        default:
            throw new Error(`Provider '${provider}' is not supported.`);
    }
}
