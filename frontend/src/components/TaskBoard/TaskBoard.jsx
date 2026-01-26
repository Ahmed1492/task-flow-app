import React, { useEffect } from "react";
import TaskCard from "../TaskCard/TaskCard";
 
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../../context/appContext";

export const userId = "6819158080f39f9b75d3f7e3";

const TaskBoard = ({ allTasks, setAllTasks, getData }) => {
  const { backEndUrl } = useAppContext();
  console.log("backEndUrl", backEndUrl);

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

  useEffect(() => {
    getData(`${decodeToken().id}/`);
  }, []);
  return (
    <div className="px-5  w-full">
      <h3 className="text-center  bg-[#6366F1] py-3 px-9 rounded  w-max m-auto text-white  font-bold text-2xl mt-2 mb-11">
        Task Board
      </h3>

      <div className="w-full">
        <TaskCard allTasks={allTasks} setAllTasks={setAllTasks} />
      </div>
    </div>
  );
};

export default TaskBoard;
