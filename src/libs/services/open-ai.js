import OpenAI from "openai";
import { json } from "stream/consumers";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to create a new thread
export const createNewThread = async () => {
  try {
    const thread = await openai.beta.threads.create();
    return thread;
  } catch (error) {
    console.error("Error creating new thread:", error);
    throw error;
  }
};

// Function to send a message and get a response from the OpenAI Assistant
export const sendMessage = async (threadId, content) => {
  try {
    console.log("Thread ID:", threadId, "Content:", content);
    const message = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
    });

    // Start a new run to get the assistant's response
    const run = await startRun(threadId);

    // Poll for run status
    const assistantResponse = await pollRunStatus(run.id, threadId);

    return assistantResponse;
  } catch (error) {
    console.error("Error sending message and getting response:", error);
    throw error;
  }
};

// Function to retrieve an assistant by ID
export const getAssistant = async () => {
  try {
    if (!process.env.ASSISTANT_ID) return "Please Provide Assistant ID";

    const assistant = await openai.beta.assistants.retrieve(
      process.env.ASSISTANT_ID
    );
    return assistant;
  } catch (error) {
    console.error("Error retrieving assistant:", error);
    throw error;
  }
};

// Function to start a run on a thread
export const startRun = async (threadId) => {
  try {
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: process.env.ASSISTANT_ID,
    });
    return run;
  } catch (error) {
    console.error("Error starting run:", error);
    throw error;
  }
};

// Function to get responses from a thread
export const getResponses = async (threadId) => {
  try {
    const response = await openai.beta.threads.messages.list(threadId);

    if (!response || !response.data) {
      throw new Error("Invalid response format");
    }

    let messages = [];

    response.body.data.forEach((message) => {
      messages.push(message.content);
    });

    return {
      messages,
    };
  } catch (error) {
    console.error("Error getting responses:", error);
    throw error;
  }
};

// Function to delete a thread
export const deleteThread = async (threadId) => {
  try {
    const result = await openai.beta.threads.delete(threadId);
    return result;
  } catch (error) {
    console.error("Error deleting thread:", error);
    throw error;
  }
};

// Polling function to check the run status
const pollRunStatus = async (runId, threadId) => {
  try {
    while (true) {
      const runStatus = await openai.beta.threads.runs.retrieve(
        threadId,
        runId
      );

      if (runStatus.status === "completed") {
        const responses = await getResponses(threadId);

        return responses.messages[0][0].text.value;
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  } catch (error) {
    console.error("Error polling run status:", error);
    throw error;
  }
};
