import { useEffect } from "react";
import TaskCard from "../TaskCard/TaskCard";
import PageHeader from "../PageHeader/PageHeader";
import { jwtDecode } from "jwt-decode";

const TaskBoard = ({ allTasks, setAllTasks, getData, loadingTasks }) => {
  const decodeToken = () => {
    try {
      const token = localStorage.getItem("userTasksToken");
      return token ? jwtDecode(token) : null;
    } catch { return null; }
  };

  useEffect(() => {
    getData(`${decodeToken().id}/`);
  }, [getData]);

  return (
    <div className="px-4 py-6 fade-up">
      <PageHeader type="dashboard" count={Array.isArray(allTasks) ? allTasks.length : 0} />
      <TaskCard allTasks={allTasks} setAllTasks={setAllTasks} loadingTasks={loadingTasks} />
    </div>
  );
};

export default TaskBoard;
