import TaskItem from "./TaskItem"

function TaskList({ tasks, onToggle, onDelete, darkMode }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6 text-sm">
        No tasks yet. Speak or type to add one!
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3 mt-6">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onToggle={onToggle}
          onDelete={onDelete}
          darkMode={darkMode}
        />
      ))}
    </div>
  )
}

export default TaskList