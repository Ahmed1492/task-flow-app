import  { useEffect, useState } from 'react';
import UserTaskManger from './page/userTaskManger/UserTaskManger';

import Login from './page/Login/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkLogin = () => {
    const token = localStorage.getItem("userTasksToken");
    return !!token;
  };

  useEffect(() => {
    setIsAuthenticated(checkLogin());
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // update after login
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  return (
    <div className=' bg-slate-100'>

      <div className='w-[87w] pe-10 px-10 m-auto shadsow-md'>
        <UserTaskManger checkLogin={checkLogin} />
      </div>
    </div>
  );
};

export default App;
