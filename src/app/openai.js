"use server";
import { OpenAI } from "openai";
import polly from "polly-js";

const openai = new OpenAI();

const assistantId = "asst_c5HjkhwwZFsrLf9Lst54EJTk";

const retry = (fn) => {
  return polly()
    .waitAndRetry(3)
    .executeForPromise(async () => {
      try {
        return await fn();
      } catch (e) {
        return Promise.reject(e);
      }
    });
};

const retryForStatus = (fn, status) => {
  return polly()
    .waitAndRetry(10)
    .executeForPromise(async () => {
      try {
        let response = await fn();
        if (response.status !== status) {
          return Promise.reject(response);
        }
      } catch (e) {
        return Promise.reject(e);
      }
    });
};

export async function createThread() {
  const thread = await retry(async () => await openai.beta.threads.create());
  return thread.id;
}

export async function listThread(threadId, runId = null) {
  if (runId !== null) {
    const thread = await retryForStatus(
      async () => await openai.beta.threads.runs.retrieve(threadId, runId),
      "completed",
    );
  }
  const response = await retry(
    async () =>
      await openai.beta.threads.messages.list(threadId, {
        order: "asc",
      }),
  );
  return response.data.map((obj) => ({
    id: obj.id,
    isUserMsg: obj.role == "user",
    text: obj.content[0]?.text.value,
  }));
}

export async function sendMessage(content, threadId) {
  await retry(
    async () =>
      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content,
      }),
  );
  const run = await retry(
    async () =>
      await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
      }),
  );
  return run.id;
}
