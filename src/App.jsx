import {useEffect, useMemo, useState} from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import TaskFilter from './components/TaskFilter.jsx';
import TaskStats from './components/TaskStats.jsx';

const STORAGE_KEY = 'my-tasks-react';

// Hernandez Lizarraga 2-4

function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        if (!savedTasks) return [];

        const parsedTasks = JSON.parse(savedTasks);
        return Array.isArray(parsedTasks)
         ? parsedTasks.filter(
            (task) =>
                task &&
            (typeof task.id === 'string' || typeof task.id === 'number') &&
            typeof task.text === 'string' &&
            typeof task.completed === 'boolean',
         )
        :[];
    } catch {
      return [];
    }
}

export default function App() {
    const [tasks, setTasks] = useState(loadTasks);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }   catch (error) {
            console.errors('Tasks could not be saved', error);
        }
    }, [tasks]);

    const addTask = (text) => {
        const cleanText = text.trim();
        if (!cleanText) return;

        setTasks((currentTasks) => [
            {id: Date.now(), text: cleanText, completed: false},
            ...currentTasks,
        ]);
    };

    const toggleTask = (id) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed} : task,
            ),
        );
    };

    const deleteTask = (id) => {
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        });
    }, [tasks, filter]);

    const pendingCount = tasks.filter((task) => !task.completed).length;

    return (
        <main className="page-shell">
            <section className="task-card" aria-labelledby="page-title">
            <header className="card-header">
                <div className="eyebrow"><span className="eyebrow-dot" /> Organize tasks</div>
                <h1 id="page-title">My tasks<span className="title-period">.</span></h1>
                </header>

                <TaskForm onAddTask={addTask} />
                <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
                <TaskList
                 tasks={filteredTasks}
                 currentFilter={filter}
                 onToggleTask={toggleTask}
                 onDeleteTask={deleteTask}
                />
                <TaskStats pendingCount={pendingCount} totalCount={tasks.lenght} />
            </section>
            <p className="storage-note"><span aria-hidden="true">📩</span> Tasks can be Saved </p>
        </main>
    );
}
