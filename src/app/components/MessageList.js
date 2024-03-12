"use client";
import { useEffect, useRef } from "react";
import { PaleyMessage } from "./PaleyMessage";
import { UserMessage } from "./UserMessage";

const initialMessage = {
  text: "Welcome, bonjour, and välkommen! You can speak to me in any language and I will both converse with you and try to point out your mistakes or where there is another way to say what I think you mean in a more common way. Try saying something to me in a language of your choice",
  isUserMsg: false,
};
export function MessageList({ messages }) {
  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="flex-grow overflow-y-auto p-4">
      <div className="flex snap-end flex-col space-y-2 overflow-y-auto">
        {/* Received message */}
        <PaleyMessage message={initialMessage.text} />
        {messages?.map((msg, index) =>
          msg.isUserMsg ? (
            <UserMessage key={index} message={msg.text} />
          ) : (
            <PaleyMessage key={index} message={msg.text} />
          ),
        )}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
}
