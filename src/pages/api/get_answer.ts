import { Request, Response } from "express";

import axios from "axios";
import { prompts } from "../../lib/prompts";

// const model = "gpt-3.5-turbo"; // for local rapid test
const model = "gpt-4";

const call_gpt = async (system: string, prompt: string, key: string) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  };
  const data = {
    model,
    messages: [
      {
        role: "system",
        content: system,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };
  console.log("before axios.post");
  const response = await axios.post(url, data, { headers: headers });
  console.log("after axios.post");
  // console.log(response.data);
  return response.data.choices[0].message.content;
};

const handler = async (req: Request, res: Response) => {
  console.log("handler 1");
  const { q, key } = req.body;
  console.log("handler 2");
  const r1 = await call_gpt(prompts[0], q, key);
  console.log("handler 3");
  const r2 = await call_gpt(prompts[1], q, key);
  const r3 = await call_gpt(prompts[2], q, key);
  const ret = {
    id: "",
    topic: q,
    viewpoints: [
      {
        name: "Synthetic Technocracy",
        text: r1,
      },
      {
        name: "Corporate Libertarianism",
        text: r2,
      },
      {
        name: "Digital Democracy",
        text: r3,
      },
    ],
  };
  res.status(200).json({ response: JSON.stringify(ret) });
};

export default handler;
