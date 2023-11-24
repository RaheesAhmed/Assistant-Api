import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(express.static('static'));
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI(apiKey);

let assistant_id;

// Create an Assistant
async function createAssistant() {
  const assistantResponse = await openai.beta.assistants.create({
    name: "Professional Chinese Teacher", // adjust name as per requirement
    instructions: "You are a professional Chinese Teacher capable of teaching Chinese, answering related questions, and creating original content.Always Behave Like Professional and friendly chinese teacher.",
    tools: [{ type: "code_interpreter" }], // adjust tools as per requirement
    model: "gpt-4-1106-preview", // or any other GPT-3.5 or GPT-4 model
  });
  assistant_id = assistantResponse.id;
  console.log(`Assistant ID: ${assistant_id}`);
}

createAssistant();
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });

// Endpoint to handle chat
app.post("/chat", async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(400).json({ error: "Message field is required" });
    }
    const userMessage = req.body.message;

    // Create a Thread
    const threadResponse = await openai.beta.threads.create();
    const threadId = threadResponse.id;

    // Add a Message to a Thread
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: userMessage,
    });

    // Run the Assistant
    const runResponse = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistant_id,
    });

    // Check the Run status
    let run = await openai.beta.threads.runs.retrieve(threadId, runResponse.id);
    while (run.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      run = await openai.beta.threads.runs.retrieve(threadId, runResponse.id);
    }

    // Display the Assistant's Response
const messagesResponse = await openai.beta.threads.messages.list(threadId);
const assistantResponses = messagesResponse.data.filter(msg => msg.role === 'assistant');
const response = assistantResponses.map(msg => 
  msg.content
    .filter(contentItem => contentItem.type === 'text')
    .map(textContent => textContent.text.value)
    .join('\n')
).join('\n');

res.json({ response });

  } catch (error) {
    console.error("Error processing chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
