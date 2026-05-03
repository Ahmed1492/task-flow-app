import { useState, useCallback } from "react";
import LeftBar from "../../components/LeftBar/LeftBar";
import TaskBoard from "../../components/TaskBoard/TaskBoard";
import { Route, Routes } from "react-router-dom";
import AddTask from "../AddTask/AddTask";
import CompletedTasks from "../CompletedTasks/CompletedTasks";
import DeferredTasks from "../DeferredTasks/DeferredTasks";
import DeployedTasks from "../DeployedTasks/DeployedTasks";
import InProgressTasks from "../InProgressTasks/InProgressTasks";
import PendingTasks from "../PendingTasks/PendingTasks";
import Profile from "../Profile/Profile";
import axios from "axios";
import UpdateTask from "../UpdateTask/UpdateTask";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import { useAppContext } from "../../context/appContext";

const UserTaskManger = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const { backEndUrl } = useAppContext();

  const getData = useCallback(async (endPoint) => {
    setLoadingTasks(true);
    setAllTasks([]);
    try {
      const res = await axios.get(`${backEndUrl}/tasks/${endPoint}`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      setAllTasks(res.data.result);
    } catch (error) {
      setAllTasks(error instanceof Error ? error : new Error("Failed to fetch tasks"));
    } finally {
      setLoadingTasks(false);
    }
  }, [backEndUrl]);

  const sharedProps = { getData, allTasks, setAllTasks, loadingTasks };

  return (
    <div className="flex min-h-screen bg-[#f7f8fc] dark:bg-[#0f172a] transition-colors duration-300">
      {/* Sidebar */}
      <div className="w-16 md:w-56 flex-shrink-0">
        <LeftBar />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        <Routes>
          <Route path="/"                element={<ProtectedRoute><TaskBoard       {...sharedProps} /></ProtectedRoute>} />
          <Route path="/addTask"         element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
          <Route path="/completedTasks"  element={<ProtectedRoute><CompletedTasks  {...sharedProps} /></ProtectedRoute>} />
          <Route path="/deferredTasks"   element={<ProtectedRoute><DeferredTasks   {...sharedProps} /></ProtectedRoute>} />
          <Route path="/deployedTasks"   element={<ProtectedRoute><DeployedTasks   {...sharedProps} /></ProtectedRoute>} />
          <Route path="/inProgressTasks" element={<ProtectedRoute><InProgressTasks {...sharedProps} /></ProtectedRoute>} />
          <Route path="/pendingTasks"    element={<ProtectedRoute><PendingTasks    {...sharedProps} /></ProtectedRoute>} />
          <Route path="/updateTask"      element={<ProtectedRoute><UpdateTask setAllTasks={setAllTasks} allTasks={allTasks} /></ProtectedRoute>} />
          <Route path="/profile"         element={<ProtectedRoute><Profile allTasks={allTasks} /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default UserTaskManger;
