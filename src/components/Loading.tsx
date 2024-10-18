const Loading = () => (
  <div className="fixed inset-0 flex space-x-2 justify-center items-center bg-black/10 z-50">
    <span className="sr-only">Loading...</span>
    <div className="h-4 w-4 bg-transparent ring-2 ring-black dark:ring-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="h-4 w-4 bg-transparent ring-2 ring-black dark:ring-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="h-4 w-4 bg-transparent ring-2 ring-black dark:ring-white rounded-full animate-bounce"></div>
  </div>
);

export default Loading;
