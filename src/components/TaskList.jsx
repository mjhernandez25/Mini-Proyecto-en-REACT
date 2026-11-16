import TaskItem from './TaskItem.jsx';

const emptyMessages = {
    all: {
        title: 'Your list is empty',
        description: 'Add your first task and and start to organizate',
    },
    active: {
        title: 'No tasks pending',
        description: 'You are up to date for now',
    },
    completed: {
        title: 'No tasks completed still',
        description: 'When you end a task, it will appear here'
    },
};

export default function  TaskList({tasks, currentFilter, onToggleTask, onDeleteTask}) {
    if (tasks.length === 0) {
        const message = emptyMessages[currentFilter];
        return (
            <div className='empty-state' role='status'>
                <div className="empty-icon" aria-hidden="true">🧭</div>
                <h2>{message.title}</h2>
                <p>{message.description}</p>
            </div>
        );
    }

    return (
        <ul className="task-list" aria-label="Task list">
            {tasks.map((task) => (
                <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
            />
            ))}
        </ul>
    );
}
