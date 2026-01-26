import  { useEffect } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";

import { jwtDecode } from "jwt-decode";

const CompletedTasks = ({ allTasks, getData, setAllTasks }) => {
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
    getData(`${decodeToken().id}/completed`);
  }, [getData]);

  return (
    <div className="px-5">
      <h3 className="text-center  bg-green-400 py-3 px-9 rounded  w-max m-auto text-white font-bold text-2xl mt-2 mb-11">
        Completed Tasks
      </h3>

      <TaskCard setAllTasks={setAllTasks} allTasks={allTasks} />
    </div>
  );
};

export default CompletedTasks;
