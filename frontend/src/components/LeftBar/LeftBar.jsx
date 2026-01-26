import { jwtDecode } from "jwt-decode";
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

const LeftBar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    try {
      let token = localStorage.getItem("userTasksToken");
      if (token) {
        localStorage.removeItem("userTasksToken");
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const decodeToken = () => {
    try {
      let token = localStorage.getItem("userTasksToken");
      if (token) {
        return jwtDecode(token);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const linkClass =
    "flex items-center gap-5 px-2 py-2 rounded transition duration-200 cursor-pointer hover:hover:bg-[#3B9EEC]";
  const activeClass = "bg-[#3B9EEC] font-bold";

  return (
    <div className="py-3 sticky top-0  md:h-[99vh] bg-[#6366F1] text-white md:min-h-[70vh]">
      <div className="flex mb-[3rem] justify-center mt-6 items-center gap-2">
        <img className="w-6" src="/taskManger.svg" alt="" />
        <h3 className="text-center font-bold text-lg">Task Manger</h3>
      </div>
      <ul
        className="
  ml-3 md:ml-8
  font-semibold
  grid grid-cols-2
  sm:grid-cols-4
  md:grid-cols-1
  gap-3
"
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <img className="w-8" src="/dashboard.svg" alt="" />
          Dashboard
        </NavLink>

        <NavLink
          to="/completedTasks"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <img className="w-8" src="/complete.svg" alt="" />
          Completed Tasks
        </NavLink>

        <NavLink
          to="/pendingTasks"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <img className="w-8" src="/pending.svg" alt="" />
          Pending Tasks
        </NavLink>

        <NavLink
          to="/inProgressTasks"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <img className="w-8" src="/progress.svg" alt="" />
          In Progress Tasks
        </NavLink>

        <NavLink
          to="/deployedTasks"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <img className="w-8" src="/cloud.svg" alt="" />
          Deployed Tasks
        </NavLink>

        <NavLink
          to="/deferredTasks"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <img className="w-8" src="/defferd.svg" alt="" />
          Deferred Tasks
        </NavLink>

        <NavLink
          to="/addTask"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <img className="w-8" src="/addTask.svg" alt="" />
          Add New Tasks
        </NavLink>

        <li
          onClick={handleLogOut}
          className="flex items-center gap-5 px-2 py-2 rounded transition duration-200 cursor-pointer hover:bg-[#3B9EEC]"
        >
          <img className="w-8" src="/logOut.svg" alt="" />
          <button>Log Out</button>
        </li>

        <li className=" md:mt-[8rem] flex justify-center items-center w-full pe-5 self-start md:w-[11rem] rounded-lg font-bold text-lg bg-blue-500 py-3 px-3">
          <p>{decodeToken()?.name || "NAN"}</p>
        </li>
      </ul>
    </div>
  );
};

export default LeftBar;
