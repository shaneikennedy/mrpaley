import Image from "next/image";
import admin from "../../../public/admin.jpeg";

export function AdminMessage({ message }) {
  return (
    <div className="flex items-start">
      <Image
        src={admin}
        alt="Admin message"
        className="mr-2 h-8 w-8 rounded-full"
      />
      <div className="rounded-lg bg-gray-600 px-4 py-2">
        <p className="text-gray-200">{message}</p>
      </div>
    </div>
  );
}
