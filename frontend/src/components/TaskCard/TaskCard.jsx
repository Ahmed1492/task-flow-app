import React, { useState } from "react";
import "./TaskCard.scss";
import { useNavigate } from "react-router-dom";
import NoTasks from "../NoTasks/NoTasks";
import axios from "axios";
import { useAppContext } from "../../context/appContext";
const TaskCard = ({ allTasks, setAllTasks }) => {
  const [isOpenMenue, setIsOpenMenue] = useState({
    id: "",
    isOpen: false,
  });
  const { backEndUrl } = useAppContext();

  const navigate = useNavigate();
  const getStatusColor = (task) => {
    try {
      let color;
      if (task.type === "completed") color = "bg-green-300";
      else if (task.type === "pending") color = "bg-orange-300";
      else if (task.type === "inprogress") color = "bg-blue-300";
      else if (task.type === "deployed") color = "bg-purple-300";
      else if (task.type === "deferred") color = "bg-gray-300";
      else color = "black"; // fallback
      return color;
    } catch (error) {
      console.error(error);
      return "black";
    }
  };

  const getTextColor = (task) => {
    try {
      let color;
      if (task.type === "completed") color = "text-green-800";
      else if (task.type === "pending") color = "text-orange-800";
      else if (task.type === "inprogress") color = "text-blue-800";
      else if (task.type === "deployed") color = "text-purple-800";
      else if (task.type === "deferred") color = "text-gray-800";
      else color = "black"; // fallback
      return color;
    } catch (error) {
      console.error(error);
      return "black";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year} - ${month} - ${day}`;
  };
  const handleOpen = (task) => {
    if (isOpenMenue.id === task._id && isOpenMenue.isOpen) {
      // Close the menu if the same task is clicked again
      setIsOpenMenue({ isOpen: false, id: null });
    } else {
      // Open the menu for the clicked task
      setIsOpenMenue({ isOpen: true, id: task._id });
    }
  };

  const handleUpdate = (task) => {
    navigate("/updateTask", { state: { task } });
  };

  const handleDelete = async (task) => {
    try {
      await axios.delete(`${backEndUrl}/task/${task._id}`);
      setAllTasks((prev) => prev.filter((t) => t._id !== task._id));
      setIsOpenMenue({ id: "", isOpen: false });
    } catch (error) {
      console.log(error);
    }
  };
  if (allTasks?.status == 404) return <NoTasks />;
  if (!allTasks) return <NoTasks />;
  // if (allTasks.length == 0) return <NoTasks />;

  return (
    <div
      className="
  w-full
  grid
  [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]
  gap-6
  py-4
  px-8
"
    >
      {allTasks?.map((task, index) => (
        <div
          // onClick={() => console.log(task)}
          key={index}
          className="flex relative shadow-2xl  flex-col gap-4  w-full  p-4 rounded-2xl "
        >
          <img
            onClick={() => handleOpen(task)}
            className="editIcone"
            src="/edit.svg"
            alt=""
          />
          {isOpenMenue.id === task._id && (
            <div className="menue shadow-2xl z-50 rounded-lg bg-white w-[7rem] text-center px-1 py-2">
              <ul className="flex flex-col ">
                <li className="border-b pb-2 border-slate-300">
                  <button onClick={() => handleUpdate(task)}>Edit</button>
                </li>
                <li className="mt-2">
                  <button
                    onClick={() => handleDelete(task)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
          {/* TOP */}
          <div
            className={` ${getStatusColor(task)} 
            )}-300 h-[9rem] r mt-5 rounded-xl relative flex justify-center items-center`}
          >
            <img
              className="absolute w-[19px]  right-3 top-3  "
              src="/quote.svg"
              alt=""
            />
            <h3
              className={`${getTextColor(task)} font-bold w-[80%] text-center`}
            >
              {task.title}
            </h3>
          </div>
          {/* BOTTOM */}
          <div className="w-full">
            <p className="w-[90%] text-base text-slate-600 m-auto text-center">
              {task.content}
            </p>
            <div className="flex items-center justify-between mt-[1rem]">
              {/* START DATE */}
              <div className="flex flex-col gap-1">
                <span className="font-bold">Start Date</span>
                <span className="text-sm text-slate-600 text-center">
                  {formatDate(task.startDate)}
                </span>
              </div>
              {/* END DATE */}

              <div className="flex flex-col gap-1">
                <span className="font-bold">End Date</span>
                <span className="text-sm text-slate-600 text-center">
                  {formatDate(task.endDate)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-[2rem]">
              <span className="text-sm text-slate-600">park roy</span>
              <span
                className={`${getTextColor(task)} ${getStatusColor(
                  task,
                )} rounded-2xl px-4 py-2 font-bold text-sm`}
              >
                {task?.type?.toUpperCase() || "NAN"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
