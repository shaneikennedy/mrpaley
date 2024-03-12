export function PaleyMessage({ message }) {
  return (
    <div className="flex items-start">
      <img
        src="mrpaley.jpeg"
        alt="Mr. Paley"
        className="mr-2 h-8 w-8 rounded-full"
      />
      <div className="rounded-lg bg-gray-600 px-4 py-2">
        <p className="text-gray-200">{message}</p>
      </div>
    </div>
  );
}
