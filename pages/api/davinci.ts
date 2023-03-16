import type { NextApiRequest, NextApiResponse } from 'next';
import {Configuration, OpenAIApi} from 'openai';

type ResponseData = {
    text: string;
}

interface GenerateApiRequest extends NextApiRequest {
    body: {
        prompt: string;
    }
}

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_CHATGPT_KEY
})
const openai =  new OpenAIApi(configuration)

export default async function handler(req:GenerateApiRequest, res: NextApiResponse<ResponseData>) {
    const prompt = req.body.prompt;

    if (!prompt || prompt === ''){
        return new Response('Please send your prompt', {status: 400})
    }
    
    // https://www.twilio.com/blog/ultimate-guide-openai-gpt-3-language-model
    const aiResult = await openai.createCompletion({
        "model": "text-davinci-003",
        "prompt": `${prompt}`,
        "max_tokens": 1024,
        "temperature": 0.1, // 0-1, the randomness of the generated text
        "frequency_penalty": 1, // -2-2, prevent word repetitions
        "presence_penalty": 1, // -2-2, prevent topic repetitions
    })

    const response = aiResult.data.choices[0].text?.trim() || 'Sorry, there was a problem.';
    console.log(aiResult.data.choices)
    
    res.status(200).json({text: response})
}