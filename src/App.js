import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage, SignUpPage, TodoListPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="todo" element={<TodoListPage />} />
    </Routes>
  );
}

export default App;
