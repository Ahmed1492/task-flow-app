import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const UpdateTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [updatedTask, setUpdatedTask] = useState(location.state?.task);
  const { backEndUrl } = useAppContext();

  const collectDate = (e) => {
    try {
      let key = e.target.name;
      let value = e.target.value;
      let newObj = { ...updatedTask };
      newObj[key] = value;
      setUpdatedTask(newObj);
      console.log(newObj);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      let myResponse = await axios.patch(
        `${backEndUrl}/task/${updatedTask._id}`,
        updatedTask,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      console.log(myResponse.status);
      if (myResponse.status === 200) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!updatedTask) return navigate("/");
  }, []);
  return (
    <div className="py-6 min-h-[94vh] px-4">
      <h2 className="text-2xl mt-[5rem] font-semibold text-center mb-6">
        Update Task
      </h2>

      <div className="flex flex-col  gap-4 max-w-xl mx-auto">
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            onChange={collectDate}
            value={updatedTask.title}
            name="title"
            className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
            type="text"
            placeholder="Task Title"
          />
        </div>
        {/* content */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            value={updatedTask.content}
            onChange={collectDate}
            name="content"
            className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
            type="text"
            placeholder="Task Description"
          />
        </div>
        {/* DATE */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              value={
                updatedTask.startDate ? updatedTask.startDate.slice(0, 10) : ""
              }
              onChange={collectDate}
              name="startDate"
              className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
              type="date"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              onChange={collectDate}
              value={
                updatedTask.startDate ? updatedTask.endDate.slice(0, 10) : ""
              }
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
            value={updatedTask.type}
            onChange={collectDate}
            name="type"
            className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
            // defaultValue=""
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
          onClick={handleUpdate}
          className="bg-[#3F51B5] mt-5 py-2 rounded-lg text-white"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;
