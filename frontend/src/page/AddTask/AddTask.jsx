import axios from "axios";
import  { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../../context/appContext";

const AddTask = () => {
  const decodeToken = () => {
    try {
      let token = localStorage.getItem("userTasksToken");
      if (token) {
        const decoded = jwtDecode(token);
        return decoded;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const { backEndUrl } = useAppContext();

  const [task, setTask] = useState({
    title: "",
    content: "",
    type: "",
    userId: decodeToken().id,
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState(null);
  const [response, setRespose] = useState("");

  const collectDate = (e) => {
    try {
      setError(false);
      let key = e.target.name;
      let value = e.target.value;
      let newObj = { ...task };
      newObj[key] = value;
      setTask(newObj);
      // console.log(newObj);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewTask = async () => {
    try {
      if (!task.title || !task.content || !task.type || !task.userId) {
        return setError("All Fields Required");
      }
      let myResponse = await axios.post(`${backEndUrl}/task`, task, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (myResponse.status === 201) {
        setRespose(myResponse.data.message);
        setTask({
          title: "",
          content: "",
          type: "",
          userId: decodeToken().id,
          startDate: "",
          endDate: "",
        });
      }
      console.log(myResponse);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="py-6 min-h-[94vh]  px-4">
        <h2 className="text-2xl mt-[5rem] font-semibold text-center mb-6">
          Add New Task
        </h2>

        {error && (
          <div
            className="  font-bold my-4
                  text-red-600 text-lg text-center  rounded z-50"
          >
            {error}
          </div>
        )}

        {response && (
          <div
            className="  font-bold my-4
                  text-green-600 text-lg text-center  rounded z-50"
          >
            {response}
          </div>
        )}
        <div className="flex flex-col gap-4 max-w-xl mx-auto">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={task.title}
              onChange={collectDate}
              name="title"
              className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
              type="text"
              placeholder="Task Title"
            />
          </div>
          {/* content */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              onChange={collectDate}
              value={task.content}
              name="content"
              className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
              type="text"
              placeholder="Task Description"
            />
          </div>
          {/* DATE */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                value={task.startDate}
                onChange={collectDate}
                name="startDate"
                className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
                type="date"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                value={task.endDate}
                onChange={collectDate}
                name="endDate"
                className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
                type="date"
              />
            </div>
          </div>
          {/* STATUS */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              onChange={collectDate}
              name="type"
              className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Select status
              </option>
              <option name="type" value="pending">
                Pending
              </option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="deferred">Deferred</option>
              <option value="deployed">Deployed</option>
            </select>
          </div>

          <button
            onClick={createNewTask}
            className="bg-[#3F51B5] mt-5 py-2 rounded-lg text-white"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};
export default AddTask;
