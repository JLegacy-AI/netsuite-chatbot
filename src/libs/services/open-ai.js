import OpenAI from "openai";

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
    const message = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
    });

    // Start a new run to get the assistant's response
    const run = await startRun(threadId);

    // Wait for the response and get the messages from the thread
    const responses = await getResponses(threadId);

    // Find the assistant's response in the messages
    const assistantResponse = responses.find((msg) => msg.role === "assistant");

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
    const run = await openai.beta.threads.runs.create({
      thread_id: threadId,
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
    const responses = await openai.beta.threads.messages.list({
      thread_id: threadId,
      order: "asc",
    });
    return responses.data;
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
