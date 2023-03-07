import { nanoid } from "nanoid";
import { useState } from "react";
import { FiTrash, FiPlus } from "react-icons/fi";

const App = () => {

  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) || []);
  const [newTask, setNewTask] = useState("");

  const addTodos = (task) => {
    const todo = { id: nanoid(), task, completed: false };
    setTodos((prevTodos) => {
      const newTodo = [todo, ...prevTodos];
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    });
  }

  const complete = (todoId) => {
    setTodos(prev => {
      const updatedTask = prev.map((x) => x.id === todoId ? { ...x, completed: !x.completed } : x);
      localStorage.setItem("todos", JSON.stringify(updatedTask));
      return updatedTask;
    });
  }

  const deleteTodos = (todoId) => {
    setTodos(prev => {
      const deleteTask = prev.filter((x) => x.id !== todoId);
      localStorage.setItem("todos", JSON.stringify(deleteTask));
      return deleteTask;
    });
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-pink-300 overflow-y-scroll">
        <h1 className="text-green-900 opacity-30 text-9xl content-center">
          todos
        </h1>
        <div className="flex items-center border border-gray-200 rounded-lg h-12 w-1/3 mt-10 bg-slate-100 text-black">
          <input
            onChange={(e) => setNewTask(e.target.value)}
            type="search"
            className="w-full px-5 bg-transparent outline-none"
            placeholder="Add todo..."
            value={newTask}
          />
          <button
            onClick={() => {
              addTodos(newTask)
              setNewTask("")
            }}
            className="text-white rounded-r-lg w-12 flex justify-center items-center bg-green-500 h-full border border-green-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-500 dark:focus:ring-green-500"
          >
            <FiPlus />
          </button>
        </div>
        {todos.map((_todo) => {
          return (
            <div key={_todo.id} className="flex justify-center items-center border-b-2 border-green-300 mt-10 pb-2">
              <div class="flex justify-start items-center content-start w-[600px] ">
                <input
                  onChange={() => complete(_todo.id)}
                  checked={_todo.completed}
                  id="check-box"
                  type="checkbox"
                  class='w-6 h-6 mr-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label
                  htmlFor="default-checkbox"
                  class={`text-3xl font-medium text-gray-900 dark:text-white ${_todo.completed && "line-through"}`}
                >
                  {_todo.task}
                </label>
              </div>
              <button
                onClick={() => deleteTodos(_todo.id)}
                className="p-2.5 text-sm font-medium text-white bg-green-500 rounded-full border border-green-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-500 dark:focus:ring-green-500"
              >
                <FiTrash />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
