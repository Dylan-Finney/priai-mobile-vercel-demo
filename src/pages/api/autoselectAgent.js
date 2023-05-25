
import { Configuration, OpenAIApi } from "openai";
import { OpenAIStreamText, OpenAIStreamPayload } from "../../utils/OpenAIStream";

// const configuration = new Configuration({
//   apiKey: process.env.STAGE === "dev" ? process.env.OPENAI_API_KEY_DEV : process.env.OPENAI_API_KEY_PROD,
// });

// const openai = new OpenAIApi(configuration);

export const config = {
  runtime: "edge",
};





function getPrompt(prompt, chat, agents) {
    return `Current Conversation Context:
    ${chat.map((message) => {
        const role = message.name == "User" ? "Q" : "A";
        const m = { role: role, content: message.message };
        return `${m.role}: ${m.content}
`
      })}
You have access to the following agents: ${agents.join(", ")}.
The user has entered: "${prompt}"
What is the best agent to answer this question?
If none of the agents are the best, respond with "None"
Respond with only the answer.
A: `
}

const handler = async (req) => {
  const result = await req.json();
  const chat = result.chat;
  const prompt = result.prompt;
  const agents = result.agents;
  console.log(agents)



  const payload = {
    model: "text-davinci-003",
    prompt: getPrompt(prompt, chat, agents),
    max_tokens: 999,
    temperature: 0,
    stream: true,
    // finish_reason: "stop"
  };
  console.log(payload)
  // console.log( configuration)

  const stream = await OpenAIStreamText(payload);
  console.log(stream.status)
  if (stream.status > 399){
    return new Response(
      JSON.stringify(stream),
      {
        status: 500,
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  } else {
    return new Response(stream);
  }
  
  
};

export default handler;
