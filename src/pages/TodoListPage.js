import { getItem } from "../util/storage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CreateTodo, TodoList } from "../components";

export default function TodoListPage() {
  const access_token = getItem("access_token", null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!access_token) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>TODO 리스트</h1>
      <TodoList />
      <CreateTodo />
    </div>
  );
}
