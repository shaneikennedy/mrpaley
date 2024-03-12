"use client";
import React, { useState } from "react";
import { MessageList } from "./components/MessageList";
import { createThread, listThread, sendMessage } from "./openai";
import { Submit } from "./components/Submit";
import mrpaley from "../../public/mrpaley.jpeg";
import Image from "next/image";

export function ChatInterface() {
  let [threadId, setThreadId] = useState(null);
  let [messages, setMessages] = useState([]);

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
    const message = formData.get("userMsg");
    let runId = null;
    try {
      runId = await sendMessage(message, threadId);
    } catch (e) {
      pushMessage("Problems sending your message, please try again :(", null);
      return;
    }

    // Retrieve the thread on the server
    try {
      const newMessages = await listThread(threadId, runId);
      setMessages(newMessages);
    } catch (e) {
      pushMessage(
        "Mr. Paley is taking too long to get back to you, try waiting a few seconds and then refreshing the messages.",
        null,
      );
    }
  }

  function pushMessage(content, isUser = true) {
    setMessages([...messages, { isUserMsg: isUser, text: content }]);
  }

  function refreshMessages() {
    listThread(threadId).then((msgs) => setMessages(msgs));
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="flex h-full w-full max-w-lg flex-col rounded-lg bg-gray-800 shadow-lg">
        {/* Chat header */}
        <div className="sticky flex items-center rounded-t-lg bg-gray-700 px-4 py-2">
          <Image
            src={mrpaley}
            alt="Mr. Paley"
            className="mr-2 h-8 w-8 rounded-full"
          />
          <h2 className="text-lg font-semibold text-gray-200">Mr. Paley</h2>
        </div>
        {/* Chat messages */}
        <MessageList messages={messages} />
        {/* Chat input */}
        {messages.length > 0 && (
          <button className="mb-1 text-gray-200" onClick={refreshMessages}>
            Refresh messages
          </button>
        )}
        <Submit
          handleMessage={handleSendMessage}
          updateMessages={pushMessage}
        />
      </div>
    </div>
  );
}

export default ChatInterface;
