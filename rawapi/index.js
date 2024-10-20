const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateAIContent = async (prompt) => {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
};

// generateAIContent("What are the EPL fixtures stated for today and their WAT time?");

const generateAIStreamContent = async (prompt) => {
    const result = await model.generateContentStream(prompt);

    // Print text as it comes in.
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        process.stdout.write(chunkText);
    }
};

generateAIStreamContent("Tell me what you know about Ahmed Davids");