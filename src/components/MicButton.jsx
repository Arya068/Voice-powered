function MicButton({ listening, onClick }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onClick}
        className={`w-20 h-20 rounded-full text-white text-3xl shadow-lg transition-all duration-300 ${
          listening
            ? "bg-red-500 animate-pulse"
            : "bg-gray-600 hover:bg-gray-700"
        }`}
      >
        🎙️
      </button>
      <p className="text-sm text-gray-500">
        {listening ? "Listening... click to stop" : "Click to speak"}
      </p>
    </div>
  )
}

export default MicButton