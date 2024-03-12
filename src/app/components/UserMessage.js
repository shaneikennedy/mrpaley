export function UserMessage({ message }) {
  return (
    <div className="flex justify-end">
      <div className="rounded-lg bg-blue-500 px-4 py-2 text-white">
        <p>{message}</p>
      </div>
    </div>
  );
}
