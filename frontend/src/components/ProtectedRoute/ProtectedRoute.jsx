

const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem("userTasksToken");

  if (token) return children;
  return "Login in Firrst";
};

export default ProtectedRoute;
