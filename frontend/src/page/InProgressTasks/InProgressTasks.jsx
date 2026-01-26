import  { useEffect } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";

import { jwtDecode } from "jwt-decode";

const InProgressTasks = ({ allTasks, getData, setAllTasks }) => {
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
    getData(`${decodeToken().id}/inProgress`);
  }, []);

  return (
    <div>
      <h3 className="text-center   bg-[#93C5FD] py-3 px-9 rounded  w-max m-auto text-white font-bold text-2xl mt-2 mb-11">
        In Progress Tasks
      </h3>

      <TaskCard setAllTasks={setAllTasks} allTasks={allTasks} />
    </div>
  );
};

export default InProgressTasks;
