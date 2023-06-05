import { Configuration, OpenAIApi } from "openai";
import {
  OpenAIStreamText,
  OpenAIStreamPayload,
  OpenAIStreamChat,
} from "../../utils/OpenAIStream";

// const configuration = new Configuration({
//   apiKey: process.env.STAGE === "dev" ? process.env.OPENAI_API_KEY_DEV : process.env.OPENAI_API_KEY_PROD,
// });

// const openai = new OpenAIApi(configuration);

export const config = {
  runtime: "edge",
};

function getPrompt(prompt, chat, agents, username) {
  return `Context of the conversation, pairing of the agent to the user's question:
    ${chat.map((message) => {
      const role = message.speaker === username ? "Question" : "Agent";
      const m = {
        role: role,
        content: role === "Question" ? message.message : message.speaker,
      };
      return `${m.role}: ${m.content}
`;
    })}
You only have access to the following agents: ["${agents.join('", "')}"].
The user has entered: "${prompt}"
What is the best agent to answer this question based on their expertise and qualifications? The agent doesn't need to be an expert in all topics in the prompt to be somewhat suited, only one. Keep in mind of the context of the conversation, e.g. "You got anymore?" implies the use of the previous agent. 
If none of the agents are the best, respond with "None". This should only happen when none of the agents are experts in any part of the prompt.
Respond with only the answer.
A: `;
}

const handler = async (req) => {
  const result = await req.json();
  console.log(JSON.stringify(result));
  // const chat = result.chat;
  const prompt = result.prompt;
  const type = result.type;
  // const agents = result.agents;
  // const username = result.username;
  //   console.log(agents)

  const payload = {
    model: "gpt-3.5-turbo-0301",
    messages: [
      {
        role: "system",
        content: `Categorize the prompt with one of 3 categories ["Preferences", "None"]
    If the prompt requires access to user ${type} details, different from data or raw data, but would include payments, plans, personal milestones, etc, respond with Preferences.
    If the prompt requires access to user ${type} preferences, such as giving a recommendation, respond with Preferences.`,
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 999,
    temperature: 0.7,
    stream: true,
    // finish_reason: "stop"
  };
  //   console.log(payload)
  // console.log( configuration)

  const stream = await OpenAIStreamChat(payload);
  // console.log(stream.status)
  if (stream.status > 399) {
    return new Response(JSON.stringify(stream), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  } else {
    return new Response(stream);
  }
};

export default handler;
