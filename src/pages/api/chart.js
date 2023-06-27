import { Configuration, OpenAIApi } from "openai";
import { OpenAIStreamChat } from "../../utils/OpenAIStream";

// const configuration = new Configuration({
//   apiKey: process.env.STAGE === "dev" ? process.env.OPENAI_API_KEY_DEV : process.env.OPENAI_API_KEY_PROD,
// });

// const openai = new OpenAIApi(configuration);

export const config = {
  runtime: "edge",
};

function getPrompt(response) {
  return [
    {
      role: "assistant",
      content: `---Prompt---
  ${response}
  ---
  Can the data in this prompt be shown in a graph? If so, generate code for the best suited chart for this data from react-chartjs-2 and chart.js, e.g. Doughnut, Scattar, Bar, Line, Pie, etc. Only respond with that code. If not, respond exactly with "No".
  ---Example Code---
  <Doughnut data={{
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }} /> 
  ---
   <Bar data={{
            labels: ['REM Sleep', 'Deep Sleep', 'Light Sleep'],
            datasets: [
              {
                label: 'Sleep Duration',
                data: [100, 70, 265],
                backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }} 
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
    />
  ---`,
    },
  ];
}

const handler = async (req) => {
  const result = await req.json();
  console.log(result);
  // const chat = result.chat;
  const response = result.response;
  //   console.log(agents)

  const payload = {
    model: process.env.STAGE === "dev" ? "gpt-3.5-turbo-0301" : "gpt-4",
    messages: getPrompt(response),
    max_tokens: 2048,
    temperature: 0,
    stream: true,
    // finish_reason: "stop"
  };
  //   console.log(payload)
  // console.log( configuration)

  const stream = await OpenAIStreamChat(payload);
  console.log(stream);
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
