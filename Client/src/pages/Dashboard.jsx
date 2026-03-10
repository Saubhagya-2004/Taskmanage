import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [filter, setFilter] = useState('All');
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:3000/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error('Error fetching tasks', err);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        try {
            const res = await axios.post('http://localhost:3000/tasks', { title, description });
            setTasks([res.data, ...tasks]);
            setTitle('');
            setDescription('');
        } catch (err) {
            console.error('Error adding task', err);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
        try {
            const res = await axios.patch(`http://localhost:3000/tasks/${id}/status`, { status: newStatus });
            setTasks(tasks.map(t => t._id === id ? res.data : t));
        } catch (err) {
            console.error('Error updating status', err);
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        return task.status === filter;
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            Task Portal
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 font-medium">Hello, {user.username}</span>
                            <button
                                onClick={logout}
                                className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Add Task Section */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Task</h2>
                    <form onSubmit={handleAddTask} className="flex gap-4 items-start flex-col sm:flex-row">
                        <div className="flex-1 w-full space-y-3">
                            <input
                                type="text"
                                placeholder="Task title (required)"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Description (optional)"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full sm:w-auto h-[52px] bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            Add Task
                        </button>
                    </form>
                </section>

                {/* Filters & Tasks Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
                        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                            {['All', 'Pending', 'Completed'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === f
                                            ? 'bg-blue-100 text-blue-800 shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {filteredTasks.length === 0 ? (
                            <div className="bg-white p-12 rounded-2xl border border-gray-200 border-dashed text-center">
                                <p className="text-gray-500 font-medium">No tasks found. Create one above!</p>
                            </div>
                        ) : (
                            filteredTasks.map(task => (
                                <div
                                    key={task._id}
                                    className={`bg-white p-5 rounded-xl border flex items-center justify-between gap-4 transition-all shadow-sm hover:shadow-md ${task.status === 'Completed' ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}
                                >
                                    <div className="flex-1">
                                        <h3 className={`font-semibold text-lg ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p className={`mt-1 text-sm ${task.status === 'Completed' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {task.description}
                                            </p>
                                        )}
                                        <span className="text-xs text-gray-400 mt-3 inline-block font-medium">
                                            Created: {new Date(task.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                        <span
                                            className={`text-xs font-bold px-3 py-1 rounded-full ${task.status === 'Completed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                        >
                                            {task.status}
                                        </span>
                                        <button
                                            onClick={() => toggleStatus(task._id, task.status)}
                                            className={`text-sm px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${task.status === 'Completed'
                                                    ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    : 'bg-green-600 border border-green-600 text-white hover:bg-green-700'
                                                }`}
                                        >
                                            {task.status === 'Completed' ? 'Mark Pending' : 'Mark Completed'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
