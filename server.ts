import express, { Request, Response } from "express";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const apiKey = process.env.API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const port = process.env.PORT || 4000;

app.post("/check-fullName", async (req: Request, res: Response) => {
  const { input } = req.body;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      'You are a language model trained to recognize and extract full names from sentences. Your task is to identify and extract the full name from the response. Ignore any other information provided. If you cannot extract a full name from the input, respond with \'I can\'t extract a full name from that input.\'\n\nExample 1:\nInput: "My name is John Smith."\nOutput: "John Smith"\n\nExample 2:\nInput: "I am Maria Clara Silva."\nOutput: "Maria Clara Silva"\n\nExample 3:\nInput: "I\'m called Peter Parker."\nOutput: "Peter Parker"\n\nExample 4:\nInput: "I don\'t have a name."\nOutput: "I can\'t extract a full name from that input."\n\n---\n\nInput: "{sentence_with_name}"\nOutput: "{full_name or \'I can\'t extract a full name from that input.\'}"',
  });

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  console.log(input);
  try {
    const result = await chatSession.sendMessage(input);
    const textResponse = await result.response.text();
    res.send({ textResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/check-firstName", async (req: Request, res: Response) => {
  const { input } = req.body;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are a language model trained to recognize and extract people's names from sentences. Your task is to identify and extract the first name from the response to the question 'What is your name?'. If there is a full name, extract only the first name. Ignore any other information provided.
  
  Example 1:
  Input: "My name is John Smith."
  Output: "John"
  
  Example 2:
  Input: "I am Maria Clara."
  Output: "Maria"
  
  Example 3:
  Input: "I'm called Peter."
  Output: "Peter"
  
  ---
  
  Input: "{sentence_with_name}"
  Output: "{first_name or 'I'm here to help with your assessment. Could you please provide your first name?'}"`,
  });

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  console.log(input);
  try {
    const result = await chatSession.sendMessage(input);
    const textResponse = await result.response.text();
    res.send({ textResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/check-lastName", async (req: Request, res: Response) => {
  const { input } = req.body;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      'You are a language model trained to recognize and extract people\'s last names from sentences. Your task is to identify and extract the last name from the response to the question \'What is your name?\'. If there is a full name, extract only the last name. Ignore any other information provided. If you cannot extract a last name from the input, respond with \'I\'m here to help with your assessment. Could you please provide your last name?\'\n\nExample 1:\nInput: "My name is John Smith."\nOutput: "Smith"\n\nExample 2:\nInput: "I am Maria Clara Silva."\nOutput: "Silva"\n\nExample 3:\nInput: "I\'m called Peter Parker."\nOutput: "Parker"\n\nExample 4:\nInput: "I don\'t have a name."\nOutput: "I can\'t extract a last name from that input."\n\n---\n\nInput: "{sentence_with_name}"\nOutput: "{last_name or \'I\'m here to help with your assessment. Could you please provide your last name?\'}"',
  });

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(input);
    const textResponse = await result.response.text();
    console.log(textResponse);
    res.send({ textResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/check-email", async (req: Request, res: Response) => {
  const { input } = req.body;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      'You are a language model trained to recognize and extract email addresses from sentences. Your task is to identify and extract the email address from the response. Ignore any other information provided. If you cannot extract an email address from the input, respond with \'I\'m here to help with your assessment. Could you please provide your email address?\'\n\nExample 1:\nInput: "My email is john.smith@example.com."\nOutput: "john.smith@example.com"\n\nExample 2:\nInput: "You can contact me at maria.clara@example.com."\nOutput: "maria.clara@example.com"\n\nExample 3:\nInput: "Send it to peter.parker@example.com."\nOutput: "peter.parker@example.com"\n\nExample 4:\nInput: "I don\'t have an email."\nOutput: "I can\'t extract an email address from that input."\n\n---\n\nInput: "{sentence_with_email}"\nOutput: "{email or \'I\'m here to help with your assessment. Could you please provide your email address?\'}"',
  });

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(input);
    const textResponse = await result.response.text();
    console.log(textResponse);
    res.send({ textResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/check-phoneNumber", async (req: Request, res: Response) => {
  const { input } = req.body;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      'You are a language model trained to recognize and extract phone numbers from sentences. Your task is to identify and extract the phone number from the response. Ignore any other information provided. If you cannot extract a phone number from the input, respond with \'I\'m here to help with your assessment. Could you please provide your phone number?\'\n\nExample 1:\nInput: "My phone number is (123) 456-7890."\nOutput: "(123) 456-7890"\n\nExample 2:\nInput: "You can reach me at +1-800-555-1234."\nOutput: "+1-800-555-1234"\n\nExample 3:\nInput: "Call me at 987-654-3210."\nOutput: "987-654-3210"\n\nExample 4:\nInput: "I don\'t have a phone number."\nOutput: "I can\'t extract a phone number from that input."\n\n---\n\nInput: "{sentence_with_phone_number}"\nOutput: "{phone_number or \'I\'m here to help with your assessment. Could you please provide your phone number?\'}"',
  });

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(input);
    const textResponse = await result.response.text();
    console.log(textResponse);
    res.send({ textResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/check-zipCode", async (req: Request, res: Response) => {
  const { input } = req.body;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      'You are a language model trained to recognize and extract zip codes from sentences. Your task is to identify and extract the zip code from the response. Ignore any other information provided. If you cannot extract a zip code from the input, respond with \'I\'m here to help with your assessment. Could you please provide your zip code?\'\n\nExample 1:\nInput: "My zip code is 12345."\nOutput: "12345"\n\nExample 2:\nInput: "You can send it to 98765-4321."\nOutput: "98765-4321"\n\nExample 3:\nInput: "The postal code here is 54321."\nOutput: "54321"\n\nExample 4:\nInput: "I don\'t have a zip code."\nOutput: "I can\'t extract a zip code from that input."\n\n---\n\nInput: "{sentence_with_zip_code}"\nOutput: "{zip_code or \'I\'m here to help with your assessment. Could you please provide your zip code?\'}"',
  });

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(input);
    const textResponse = await result.response.text();
    console.log(textResponse);
    res.send({ textResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
