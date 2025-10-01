const Loading = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center space-x-2 bg-black/10">
    <span className="sr-only">Loading...</span>
    <div className="h-4 w-4 animate-bounce rounded-full bg-transparent ring-2 ring-black [animation-delay:-0.3s] dark:ring-white"></div>
    <div className="h-4 w-4 animate-bounce rounded-full bg-transparent ring-2 ring-black [animation-delay:-0.15s] dark:ring-white"></div>
    <div className="h-4 w-4 animate-bounce rounded-full bg-transparent ring-2 ring-black dark:ring-white"></div>
  </div>
);

export default Loading;
