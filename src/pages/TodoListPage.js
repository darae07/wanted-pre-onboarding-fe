import { getItem } from "../util/storage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateTodo } from "../components";
import { authorizedInstance } from "../api/api";

export default function TodoListPage() {
  const access_token = getItem("access_token", null);
  const navigate = useNavigate();

  const [todoList, setTodoList] = useState([]);
  const fetchTodoList = async () => {
    try {
      const response = await authorizedInstance.get("todos");
      setTodoList(response.data);
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
  };

  const addTodo = (newTodo) => {
    setTodoList([
      ...todoList,
      {
        id: newTodo.id,
        todo: newTodo.todo,
        isCompleted: newTodo.isCompleted,
        userId: newTodo.userId,
      },
    ]);
  };

  useEffect(() => {
    if (!access_token) {
      navigate("/");
      return;
    }
    fetchTodoList();
  }, []);

  return (
    <div>
      <h1>TODO 리스트</h1>
      <CreateTodo addTodo={addTodo} />
    </div>
  );
}
