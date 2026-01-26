import { createContext, useContext, useState } from "react";

//  Create context
const AppContext = createContext();
//  Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const backEndUrl = process.env.REACT_APP_BACKEND_URL;
  console.log(backEndUrl);

  const value = {
    user,
    setUser,
    backEndUrl

  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom hook 
export const useAppContext = () => {
  return useContext(AppContext);
};
