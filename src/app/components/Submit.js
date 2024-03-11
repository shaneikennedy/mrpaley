"use client";
import { useState } from "react";

export function Submit({ inputDisabled, handleMessage }) {
  let [input, setInput] = useState("");
  const onChange = (e) => setInput(e.target.value);
  return (
    <form
      action={(data) => {
        handleMessage(data);
        setInput("");
      }}
      className="flex items-center rounded-b-lg bg-gray-700 px-4 py-2"
    >
      <input
        name="userMsg"
        type="text"
        value={input}
        onChange={onChange}
        placeholder="Type your message..."
        className="w-full rounded-full bg-gray-600 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={inputDisabled}
        className="ml-2 rounded-full bg-blue-500 px-4 py-2 text-white"
      >
        Send
      </button>
    </form>
  );
}
