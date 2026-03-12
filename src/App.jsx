import { useState, useEffect } from "react";
import { Plus, ClipboardList, Trash2, CheckCircle, Circle, LogOut } from "lucide-react";
import Login from "./Login.jsx";
import "./Login.css";

const DEFAULT_TODOS = [
    { id: crypto.randomUUID(), text: "Set up React project", completed: true },
    { id: crypto.randomUUID(), text: "Design task management UI", completed: true },
    { id: crypto.randomUUID(), text: "Implement add / delete tasks", completed: false },
    { id: crypto.randomUUID(), text: "Add filter (All / Active / Completed)", completed: false },
    { id: crypto.randomUUID(), text: "Persist tasks using localStorage", completed: false },
    ];

    export default function App() {

    const [currentUser, setCurrentUser] = useState(null);

    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("MY_TODOS");

        if (saved) {
        try {
            const parsed = JSON.parse(saved);
            return parsed.length ? parsed : DEFAULT_TODOS;
        } catch {
            return DEFAULT_TODOS;
        }
        }

        return DEFAULT_TODOS;
    });

    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("MY_TODOS", JSON.stringify(todos));
    }, [todos]);

    if (!currentUser) {
        return <Login onLogin={(email) => setCurrentUser(email)} />;
    }

    const addTodo = (e) => {
        e.preventDefault();

        if (!inputValue.trim()) return;

        setTodos((prev) => [
        ...prev,
        {
            id: crypto.randomUUID(),
            text: inputValue.trim(),
            completed: false
        }
        ]);

        setInputValue("");
    };

    const toggleTodo = (id) => {
        setTodos((prev) =>
        prev.map((todo) =>
            todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
        );
    };

    const deleteTodo = (id) => {
        setTodos((prev) =>
        prev.filter((todo) => todo.id !== id)
        );
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    const activeCount = todos.filter((t) => !t.completed).length;

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

            {/* Header */}
            <div className="bg-indigo-600 p-6 text-white flex justify-between items-start">

            <div>
                <div className="flex items-center gap-3 mb-2">
                <ClipboardList size={28} />
                <h1 className="text-2xl font-bold">TaskFlow</h1>
                </div>

                <p className="text-indigo-100 text-sm">
                {currentUser}
                </p>
            </div>

            <button
                onClick={logout}
                className="p-2 hover:bg-indigo-500 rounded-lg transition-colors"
                aria-label="Logout"
            >
                <LogOut size={20} />
            </button>

            </div>

            <div className="p-6">

            {/* Add Task */}
            <form onSubmit={addTodo} className="flex gap-2 mb-8">

                <input
                type="text"
                placeholder="Add a new task..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                type="submit"
                className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
                >
                <Plus size={24} />
                </button>

            </form>

            {/* Filters */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg mb-6">

                {["all", "active", "completed"].map((f) => (

                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${
                    filter === f
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                    {f}
                </button>

                ))}

            </div>

            {/* Task List */}
            <div className="space-y-3">

                {filteredTodos.map((todo) => (

                <div
                    key={todo.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 group hover:border-indigo-200 transition-all"
                >

                    <div className="flex items-center gap-3">

                    <button
                        onClick={() => toggleTodo(todo.id)}
                        className="transition-transform active:scale-90"
                        aria-label="Toggle task"
                    >
                        {todo.completed
                        ? <CheckCircle size={22} className="text-indigo-600" />
                        : <Circle size={22} className="text-slate-300" />
                        }
                    </button>

                    <span
                        className={`font-medium ${
                        todo.completed
                            ? "line-through text-slate-400"
                            : "text-slate-700"
                        }`}
                    >
                        {todo.text}
                    </span>

                    </div>

                    <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    aria-label="Delete task"
                    >
                    <Trash2 size={18} />
                    </button>

                </div>

                ))}

                {filteredTodos.length === 0 && (

                <div className="text-center py-12 text-slate-400 text-sm italic">
                    No tasks here yet!
                </div>

                )}

            </div>

            </div>

            <div className="bg-slate-50 p-4 border-t text-center text-xs text-slate-400 font-medium">
            {activeCount} {activeCount === 1 ? "item" : "items"} remaining
            </div>

        </div>

        </div>
    );
}