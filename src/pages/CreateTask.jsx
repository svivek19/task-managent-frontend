import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../redux/features/employeeSlice";

export default function CreateTask() {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    assignTo: [],
    todoCheckList: [],
  });

  const [assignInput, setAssignInput] = useState("");
  const [todoInput, setTodoInput] = useState("");

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleAddAssignee = () => {
    if (assignInput.trim()) {
      const emailExists = task.assignTo.some(
        (person) => person.email === assignInput.trim()
      );

      if (!emailExists) {
        const colors = [
          "bg-blue-500",
          "bg-green-500",
          "bg-yellow-500",
          "bg-purple-500",
          "bg-pink-500",
          "bg-indigo-500",
          "bg-red-500",
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newAssignee = {
          email: assignInput.trim(),
          initials: assignInput.trim().substring(0, 2).toUpperCase(),
          color: randomColor,
        };

        setTask({ ...task, assignTo: [...task.assignTo, newAssignee] });
      }
      setAssignInput("");
    }
  };

  const removeAssignee = (emailToRemove) => {
    setTask((prevTask) => {
      return {
        ...prevTask,
        assignTo: prevTask.assignTo.filter(
          (person) => person.email !== emailToRemove
        ),
      };
    });
  };

  const handleAddTodoItem = () => {
    if (todoInput.trim()) {
      setTask({
        ...task,
        todoCheckList: [
          ...task.todoCheckList,
          { text: todoInput.trim(), completed: false },
        ],
      });
      setTodoInput("");
    }
  };

  const handleKeyPressTodo = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTodoItem();
    }
  };

  const handleToggleTodoItem = (index) => {
    const updatedList = [...task.todoCheckList];
    updatedList[index].completed = !updatedList[index].completed;
    setTask({ ...task, todoCheckList: updatedList });
  };

  const removeTodoItem = (index) => {
    const updatedList = [...task.todoCheckList];
    updatedList.splice(index, 1);
    setTask({ ...task, todoCheckList: updatedList });
  };

  const handleSubmit = () => {
    console.log("Submitted task:", task);
  };

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Create New Task
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Describe the task..."
              className="w-full border resize-none border-gray-300 px-4 py-2 rounded-md outline-none"
              rows={5}
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Priority Level
            </label>
            <select
              id="priority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign To
            </label>
            <div className="flex mb-2">
              <select
                id="assignTo"
                value={assignInput}
                onChange={(e) => setAssignInput(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-l-md outline-none"
              >
                <option value="">Select employee</option>
                {Array.isArray(employees) &&
                  employees.map((val, i) => (
                    <option key={i} value={val.email}>
                      {val.fullName} ({val.email})
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddAssignee}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            <div className="mt-2 border rounded-md border-gray-300 h-24 overflow-y-auto p-2">
              <div className="flex flex-wrap gap-2">
                {task.assignTo.map((person, idx) => (
                  <div
                    key={idx}
                    className={`${person.color} text-white px-3 py-1 rounded-full flex items-center text-sm shadow-sm`}
                  >
                    <div className="w-5 h-5 rounded-full bg-white text-gray-800 flex items-center justify-center mr-2 font-bold text-xs">
                      {person.initials}
                    </div>
                    <span className="mr-1">{person.email.split("@")[0]}</span>
                    <button
                      onClick={() => removeAssignee(person.email)}
                      className="ml-1 w-4 h-4 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50 text-white"
                      title="Remove"
                    >
                      <span className="text-xs">✕</span>
                    </button>
                  </div>
                ))}

                {task.assignTo.length === 0 && (
                  <div className="text-gray-500 text-sm italic py-4 text-center w-full">
                    No assignees added yet
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To-Do Checklist
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                onKeyUp={handleKeyPressTodo}
                placeholder="Add a new task item"
                className="w-full border border-gray-300 px-4 py-2 rounded-l-md outline-none"
              />
              <button
                type="button"
                onClick={handleAddTodoItem}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            <div className="mt-2 border rounded-md border-gray-300 h-48 overflow-y-auto">
              <div className="space-y-1 p-2">
                {task.todoCheckList.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-50 p-2 rounded-md"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleTodoItem(index)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span
                      className={`flex-grow ${
                        item.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {item.text}
                    </span>
                    <button
                      onClick={() => removeTodoItem(index)}
                      className="text-gray-500 cursor-pointer hover:text-red-500 ml-2"
                    >
                      <span>🗑️</span>
                    </button>
                  </div>
                ))}

                {task.todoCheckList.length === 0 && (
                  <div className="text-gray-500 text-sm italic py-6 text-center">
                    No items added yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 cursor-pointer w-fit bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors font-medium"
          >
            <span>📋</span>
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
