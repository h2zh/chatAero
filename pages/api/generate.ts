import type { NextApiRequest, NextApiResponse } from 'next';
import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_CHATGPT_KEY
})
const openai =  new OpenAIApi(configuration)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    console.log(req.body.messages)
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // text-davinci-003
      messages: req.body.messages,
      temperature: 0.1,
    })
    console.log(completion.data.choices)
    res.status(200).json({ result: completion.data })
  }