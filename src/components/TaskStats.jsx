export default function TaskStats({pendingCount, totalCount}) {
    return (
        <footer className="task-stats" aria-live="polite">
            <span>
                <strong>{pendingCount}</strong> {pendingCount === 1 ? 'Pending task' : 'Pending tasks'}
            </span>
        </footer>
    );
}
