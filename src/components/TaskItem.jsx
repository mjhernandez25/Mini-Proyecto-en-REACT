export default function TaskItem({task, onToggle, onDelete}) {
    return (
        <li className={`task-item${task.completed ? ' is-completed' : ''}`}>
        <label className="task-label">
            <input
             className="task-checkbox"
             type="checkbox"
             checked={task.completed}
             onChange={() => onToggle(task.id)}
             aria-label={`${task.completed ? 'Check as pending' : 'Check as complete'}: ${task.text}`}
            />
            <span className="custom-check" aria-hidden="true">✔</span>
            <span className="task-text">{task.text}</span>
        </label>
        <button
         className="delete-button"
         type="button"
         onClick={() => onDelete(task.id)}
         aria-label={`Delete Task: ${task.text}`}
         title="Delete Task"
         >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" />
            </svg>
         </button>
        </li>
    );
}