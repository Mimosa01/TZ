type ErrorProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorMessage({ message, onRetry }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-100 text-red-700 rounded-md">
      <p className="mb-4 font-semibold">Ошибка: {message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Повторить попытку
        </button>
      )}
    </div>
  );
}
