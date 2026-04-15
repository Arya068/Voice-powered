function TaskItem({ task, index, onToggle, onDelete, darkMode }) {
  return (
    <div className={`flex items-center justify-between rounded-xl px-4 py-3 shadow-sm border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
      <div className="flex items-center gap-3">
        <span className="text-purple-400 font-bold text-sm w-6">
          {index + 1}.
        </span>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4 accent-purple-600 cursor-pointer"
        />
        <span
          className={`text-sm ${
            task.done ? "line-through text-gray-400" : darkMode ? "text-gray-100" : "text-gray-700"
          }`}
        >
           {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-400 hover:text-red-600 text-lg transition-colors"
      >
        🗑
      </button>
    </div>
  )
}

export default TaskItem