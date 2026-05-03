import { useEffect, useState } from 'react';
import UserTaskManger from './page/userTaskManger/UserTaskManger';
import Login from './page/Login/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkLogin = () => !!localStorage.getItem("userTasksToken");

  useEffect(() => {
    setIsAuthenticated(checkLogin());
  }, []);

  const handleLoginSuccess = () => setIsAuthenticated(true);

  if (!isAuthenticated) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  return <UserTaskManger checkLogin={checkLogin} />;
};

export default App;
