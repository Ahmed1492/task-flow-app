import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComp from "../../components/Login/Login";
import Register from "../Register/Register";
import RegisterComp from "../../components/RegisterComp/RegisterComp";
import { useAppContext } from "../../context/appContext";

const Login = ({ onLogin }) => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const { backEndUrl } = useAppContext();

  const [error, setError] = useState(null);
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const collectDate = (e) => {
    setError(null);
    const { name, value } = e.target;
    setUserLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      if (!userLogin.email || !userLogin.password) {
        return setError("All Fields Are Required!");
      }
      const response = await axios.post(`${backEndUrl}/login`, userLogin, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      console.log(response);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("userTasksToken", token);
      }

      // Notify parent and redirect
      if (onLogin) onLogin(); // This can set isAuthenticated = true
      navigate("/"); // Go to home route (TaskBoard)
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      console.log(error?.response?.data || "Login failed");

      setError(message);
    }
  };

  if (mode === "login")
    return (
      <>
        <div className="flex w-[10rem] justify-between m-auto text-white rounded-lg bg-[#FFD1C9] mt-3">
          <span
            onClick={() => setMode("login")}
            className="cursor-pointer w-[50%] rounded-lg py-3 px-4 bg-[#FF735C] text-white"
          >
            Login
          </span>
          <span
            onClick={() => setMode("register")}
            className="cursor-pointer w-[50%] rounded-lg py-3 px-4  text-white"
          >
            Register
          </span>
        </div>

        <LoginComp
          error={error}
          collectDate={collectDate}
          handleLogin={handleLogin}
        />
      </>
    );
  if (mode === "register")
    return (
      <>
        <div className="flex w-[10rem] justify-between m-auto text-white rounded-lg bg-[#FFD1C9] mt-3">
          <span
            onClick={() => setMode("login")}
            className={`cursor-pointer w-[50%] rounded-lg py-3 px-4 ${
              mode === "login" && "bg-[#FF735C]"
            }  text-white`}
          >
            Login
          </span>
          <span
            onClick={() => setMode("register")}
            className={`cursor-pointer w-[50%] ${
              mode === "register" && "bg-[#FF735C]"
            }  } rounded-lg py-3 px-4  text-white`}
          >
            Register
          </span>
        </div>
        <RegisterComp
          navigate={navigate}
          // handleregister={handleregister}
          // error={error}
          // collectDate={collectDate}
          // onLogin={onLogin}
          error={error}
          setError={setError}
          setMode={setMode}
        />
      </>
    );
};

export default Login;
