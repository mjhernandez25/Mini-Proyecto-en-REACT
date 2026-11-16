import {useState} from 'react';

export default function TaskForm({onAddTask}) {
    const [text, setText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const cleanText = text.trim();
        if (!cleanText) return;
        onAddTask(cleanText);
        setText('');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="new-task">Type a new task</label>
            <input
             id="new-task"
             type="text"
             value={text}
             onChange={(event) => setText(event.target.value)}
             placeholder="What to do now?"
             maxLength={120}
             autoComplete="off"/>
             <button className="add-button" type="submit" disabled={!text.trim()}>
                <span aria-hidden="true">+</span> Add
             </button>
            </form>
    );
}