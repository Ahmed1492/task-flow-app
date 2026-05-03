import { useEffect } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import { jwtDecode } from "jwt-decode";

const CompletedTasks = ({ allTasks, getData, setAllTasks, loadingTasks }) => {
  const decodeToken = () => {
    try {
      const token = localStorage.getItem("userTasksToken");
      return token ? jwtDecode(token) : null;
    } catch { return null; }
  };

  useEffect(() => { getData(`${decodeToken().id}/completed`); }, [getData]);

  return (
    <div className="px-4 py-6 fade-up">
      <PageHeader type="completed" count={Array.isArray(allTasks) ? allTasks.length : 0} />
      <TaskCard setAllTasks={setAllTasks} allTasks={allTasks} loadingTasks={loadingTasks} />
    </div>
  );
};

export default CompletedTasks;
