import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../redux/features/employeeSlice";
import {
  createTaskThunk,
  getTaskById,
  updateTask,
} from "../redux/features/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function CreateTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);
  const { currentTask } = useSelector((state) => state.task);

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    assignTo: [],
    todoCheckList: [],
  });

  const [assignInput, setAssignInput] = useState({ email: "", fullName: "" });
  const [todoInput, setTodoInput] = useState("");

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleAddAssignee = () => {
    if (assignInput.email.trim()) {
      const emailExists = task.assignTo.some(
        (person) => person.email === assignInput.email.trim()
      );

      if (!emailExists) {
        const colors = [
          "bg-blue-100 text-blue-800 font-semibold border-blue-500 rounded-md",
          "bg-green-100 text-green-800 font-semibold border-green-500 rounded-md",
          "bg-yellow-100 text-yellow-800 font-semibold border-yellow-500 rounded-md",
          "bg-purple-100 text-purple-800 font-semibold border-purple-500 rounded-md",
          "bg-pink-100 text-pink-800 font-semibold border-pink-500 rounded-md",
          "bg-indigo-100 text-indigo-800 font-semibold border-indigo-500 rounded-md",
          "bg-red-100 text-red-800 font-semibold border-red-500 rounded-md",
        ];

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newAssignee = {
          email: assignInput.email.trim(),
          fullName: assignInput.fullName,
          initials: assignInput.fullName
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase(),
          color: randomColor,
          status: "pending",
        };

        setTask({ ...task, assignTo: [...task.assignTo, newAssignee] });
      }

      setAssignInput({ email: "", fullName: "" });
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
    const formattedTask = {
      ...task,
      assignTo: task.assignTo.map((person) => ({
        email: person.email,
        fullName: person.fullName,
        initials: person.initials,
        color: person.color,
        status: person.status || "pending",
      })),
      todoCheckList: task.todoCheckList.map((item) => ({
        text: item.text,
        isCompleted: item.completed || false,
      })),
    };

    if (id) {
      dispatch(updateTask({ id, taskData: formattedTask }));
      navigate(-1);
    } else {
      dispatch(createTaskThunk(formattedTask));
      navigate("/admin/manage-task");
    }
  };

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getTaskById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && currentTask) {
      const { title, description, priority, dueDate, assignTo, todoCheckList } =
        currentTask;

      setTask({
        title: title || "",
        description: description || "",
        priority: priority || "low",
        dueDate: dueDate ? dueDate.split("T")[0] : "",
        assignTo: Array.isArray(assignTo)
          ? assignTo.map((person) => ({
              email: person.email,
              fullName: person.fullName || "",
              initials:
                person.initials ||
                person.fullName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() ||
                "",
              color:
                person.color ||
                "bg-blue-100 text-blue-800 font-semibold border-blue-500 rounded-md",
              status: person.status || "pending",
            }))
          : [],
        todoCheckList: Array.isArray(todoCheckList)
          ? todoCheckList.map((item) => ({
              text: item.text,
              completed: item.isCompleted || false,
            }))
          : [],
      });
    }
  }, [id, currentTask]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        {id ? "Update Task" : "Create New Task"}
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
                value={assignInput.email}
                onChange={(e) => {
                  const selectedEmail = e.target.value;
                  const selected = employees.find(
                    (emp) => emp.email === selectedEmail
                  );
                  if (selected) {
                    setAssignInput({
                      email: selected.email,
                      fullName: selected.fullName,
                    });
                  }
                }}
                className="w-full border border-gray-300 px-4 py-2 rounded-l-md outline-none"
              >
                <option value="">Select employee</option>
                {Array.isArray(employees) &&
                  employees.map((val, i) => (
                    <option key={i} value={val.email}>
                      {val.fullName}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddAssignee}
                className="bg-violet-100 text-violet-800 font-semibold border border-violet-500 px-4 py-2 rounded-r-md hover:bg-violet-500 hover:text-white transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>

            <div className="mt-2 border rounded-md border-gray-300 h-24 overflow-y-auto p-2">
              <div className="flex flex-wrap gap-2">
                {task.assignTo.map((person, idx) => (
                  <div
                    key={idx}
                    className={`${
                      person.color ||
                      "bg-blue-100 text-blue-800 font-semibold border-blue-500 rounded-md"
                    } px-3 py-1 flex items-center text-sm shadow-sm`}
                  >
                    <Icon icon="mdi:account" className="mr-1 text-lg" />
                    <span className="mr-1">
                      {person.fullName || person.email}
                    </span>

                    <button
                      onClick={() => removeAssignee(person.email)}
                      className="ml-1 w-5 h-5 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 border-gray-500 border cursor-pointer"
                      title="Remove"
                    >
                      X
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
                className="bg-violet-100 text-violet-800 font-semibold border border-violet-500 px-4 py-2 rounded-r-md hover:bg-violet-500 hover:text-white transition-colors cursor-pointer flex items-center space-x-2"
              >
                <span>Add</span>
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
                      className="cursor-pointer text-red-500 hover:text-red-900 ml-2"
                    >
                      <Icon icon="mdi:trash-can" width={20} height={20} />
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
            className="flex items-center gap-2 cursor-pointer w-fit bg-gradient-to-r from-violet-100 to-violet-300 text-violet-800 px-4 py-2 rounded-md hover:bg-gradient-to-l transition-all font-medium border border-violet-500 shadow-md hover:shadow-lg"
          >
            <Icon icon="mdi:clipboard-check" width={20} height={20} />
            {id ? "Update Task" : "Create New Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
