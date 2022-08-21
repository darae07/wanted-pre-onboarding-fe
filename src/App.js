import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginPage, SignUpPage, TodoListPage } from "./pages";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "./api/api";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, []);

  return (
    <Routes>
      <Route path="" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="todo" element={<TodoListPage />} />
    </Routes>
  );
}

export default App;
