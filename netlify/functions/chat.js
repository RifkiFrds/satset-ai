import Replicate from "replicate";

export const handler = async (event) => {
  try {
    const { messages } = JSON.parse(event.body);

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const prompt = messages.map(m => `${m.role}: ${m.content}`).join("\n");

    const output = await replicate.run(
      "ibm-granite/granite-3.3-8b-instruct",
      {
        input: {
          prompt: prompt,
          max_new_tokens: 400,
          temperature: 0.6,
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        reply: output.join(""),
      }),
    };

  } catch (err) {
    console.log("CHAT ERROR:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
