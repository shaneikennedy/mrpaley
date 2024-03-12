"use client";
import React, { useState } from "react";
import { MessageList } from "./components/MessageList";
import { createThread, listThread, sendMessage } from "./openai";
import { Submit } from "./components/Submit";

export function ChatInterface() {
  let [threadId, setThreadId] = useState(null);
  async function handleSendMessage(formData) {
    if (threadId === null) {
      try {
        threadId = await createThread();
        setThreadId(threadId);
      } catch (e) {
        alert("Problems starting the conversation :(");
        return;
      }
    }
    setInputDisabled(true);
    const message = formData.get("userMsg");
    try {
      const runId = await sendMessage(message, threadId);
      setMessages(await listThread(threadId, runId));
    } catch (e) {
      alert("Problems sending your message, please try again :(");
      setMessages(messages);
    }
    setInputDisabled(false);
  }
  let [inputDisabled, setInputDisabled] = useState(false);
  let [messages, setMessages] = useState([]);

  function pushMessage(content) {
    setMessages([...messages, { isUserMsg: true, text: content }]);
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="flex h-full w-full max-w-lg flex-col rounded-lg bg-gray-800 shadow-lg">
        {/* Chat header */}
        <div className="rounded-t-lg bg-gray-700 px-4 py-2">
          <h2 className="text-lg font-semibold text-gray-200">Mr. Paley</h2>
        </div>
        {/* Chat messages */}
        <MessageList messages={messages} />
        {/* Chat input */}
        <Submit
          inputDisabled={inputDisabled}
          handleMessage={handleSendMessage}
          updateMessages={pushMessage}
        />
      </div>
    </div>
  );
}

export default ChatInterface;
