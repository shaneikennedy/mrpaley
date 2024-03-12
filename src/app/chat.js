"use client";
import React, { useState } from "react";
import { MessageList } from "./components/MessageList";
import { createThread, listThread, sendMessage } from "./openai";
import { Submit } from "./components/Submit";

export function ChatInterface() {
  let [threadId, setThreadId] = useState(null);
  async function handleSendMessage(formData) {
    // Create thread
    if (threadId === null) {
      try {
        threadId = await createThread();
        setThreadId(threadId);
      } catch (e) {
        alert("Problems starting the conversation :(");
        return;
      }
    }

    // Send the message
    setInputDisabled(true);
    const message = formData.get("userMsg");
    let runId = null;
    try {
      runId = await sendMessage(message, threadId);
    } catch (e) {
      alert("Problems sending your message, please try again :(");
      setMessages(messages);
      return;
    }

    // Retrieve the thread on the server
    try {
      const newMessages = await listThread(threadId, runId);
      setMessages(newMessages);
    } catch (e) {
      alert(
        "Mr. Paley is taking too long to get back to you, try waiting a few seconds and then refreshing the messages.",
      );
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
