import { ChatInterface } from "./chat";
import { createThread } from "./openai";

export default async function Home() {
  const threadId = await createThread();
  return <ChatInterface threadId={threadId} />;
}
