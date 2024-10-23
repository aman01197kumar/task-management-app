import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [showEditInput, setShowEditInput] = useState(null);

  const inputHandler = (e) => {
    setText(e.target.value);
  };

  const handleAddTask = async () => {
    if (text) {
      try {
        const res = await axios.post("http://localhost:4000/task/tasks", {
          task_name: text,
        });
        setTodoList((prev) => [
          ...prev,
          {
            _id: res?.data?._id,
            task_name: res?.data?.task_name,
          },
        ]);
        setText("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getTaskList = async () => {
    try {
      const res = await axios.get("http://localhost:4000/task/tasks");
      const newList = res?.data?.map(({ _id, task_name }) => ({
        _id,
        task_name,
      }));
      setTodoList(newList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const removeTaskHandler = async (id) => {
    await axios.delete(`http://localhost:4000/task/tasks/${id}`);
    const filteredTask = todoList.filter((task) => task._id !== id);
    setTodoList(filteredTask);
  };

  const editTaskHandler = async (id) => {
    if (showEditInput === id) {
      try {
        const payload = {
          task_name: editText, // Ensure this matches your API's expected field
        };
        await axios.put(`http://localhost:4000/task/tasks/${id}`, payload);

        const updatedTasks = todoList.map((task) =>
          task._id === id ? { ...task, task_name: editText } : task
        );
        setTodoList(updatedTasks);
        setShowEditInput(null);
        setEditText("");
      } catch (err) {
        console.error("Error updating task:", err);
      }
    } else {
      setShowEditInput(id);
      const taskToEdit = todoList.find((task) => task._id === id);
      setEditText(taskToEdit?.task_name || ""); // Assuming task_name holds the text
    }
  };

  const removeAllHandler = async () => {
    try {
      const res = await axios.delete("http://localhost:4000/task/removeAll");
      console.log(res?.data)
      setTodoList([]); // Clear the todoList in the frontend
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-neutral-400 min-h-screen flex items-center justify-center">
      <div className="p-10 bg-pink-600 rounded-lg shadow-lg space-y-6 w-full sm:m-4">
        <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:items-center sm:justify-center">
          <input
            placeholder="Enter Task"
            className="sm:w-3/5 sm:mt-2 p-2 rounded border border-gray-300 focus:outline-none text-neutral-600 font-semibold"
            onChange={inputHandler}
            value={text}
          />
          <div className="flex space-x-4">
            <button
              className="bg-red-200 p-2 font-semibold text-pink-600 rounded hover:bg-red-300"
              onClick={handleAddTask}
            >
              Add Task
            </button>
            <button
              className="bg-yellow-200 p-2 rounded font-semibold text-yellow-600 hover:bg-yellow-300"
              onClick={removeAllHandler}
            >
              Remove All
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {todoList.map((task) => (
            <div
              className="bg-pink-300 p-3 rounded-md flex items-center justify-between"
              key={task._id}
            >
              {showEditInput === task._id ? (
                <input
                  className="sm:w-3/5 p-2 rounded border border-gray-300 focus:outline-none"
                  onChange={(e) => setEditText(e.target.value)}
                  value={editText}
                />
              ) : (
                <div className="text-lg text-white font-semibold w-2/5">
                  {task.task_name}
                </div>
              )}
              <div className="flex space-x-2">
                <button
                  className="bg-blue-400 font-semibold text-white p-2 rounded-lg w-full"
                  onClick={() => editTaskHandler(task._id)}
                >
                  {showEditInput === task._id ? "Save" : "Edit"}
                </button>
                <button
                  className="bg-red-400 text-white p-2 font-semibold rounded-lg hover:underline"
                  onClick={() => removeTaskHandler(task._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
