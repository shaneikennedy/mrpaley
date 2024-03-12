"use server";
import { OpenAI } from "openai";

const openai = new OpenAI();

const assistantId = "asst_c5HjkhwwZFsrLf9Lst54EJTk";

export async function createThread() {
  const thread = await openai.beta.threads.create();
  return thread.id;
}

export async function listThread(threadId, runId = null) {
  if (runId !== null) {
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);
    if (run.status !== "completed") {
      return listThread(threadId, runId);
    }
  }
  const response = await openai.beta.threads.messages.list(threadId, {
    order: "asc",
  });
  return response.data.map((obj) => ({
    id: obj.id,
    isUserMsg: obj.role == "user",
    text: obj.content[0]?.text.value,
  }));
}

export async function sendMessage(content, threadId) {
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content,
  });
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });
  return run.id;
}
