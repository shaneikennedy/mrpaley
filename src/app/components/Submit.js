"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export function Submit({ handleMessage, updateMessages }) {
  let [input, setInput] = useState("");
  const status = useFormStatus();
  const onChange = (e) => setInput(e.target.value);
  return (
    <form
      onSubmit={() => {
        updateMessages(input);
        setInput("");
      }}
      action={handleMessage}
    >
      <Elipsis />
      <div className="flex items-center rounded-b-lg bg-gray-700 px-4 py-2">
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
          className="ml-2 rounded-full bg-blue-500 px-4 py-2 text-white"
        >
          Send
        </button>
      </div>
    </form>
  );
}

function Elipsis() {
  const { pending } = useFormStatus();
  return (
    <section>
      {pending && (
        <div className="left-2 mb-2 ml-4 flex w-full text-gray-400">
          <div className="mr-1 h-3 w-3 animate-bounce rounded-full bg-gray-100"></div>
          <div className="mr-1 h-3 w-3 animate-bounce rounded-full bg-gray-100 delay-75"></div>
          <div className="mr-1 h-3 w-3 animate-bounce rounded-full bg-gray-100 delay-150"></div>
        </div>
      )}
    </section>
  );
}
