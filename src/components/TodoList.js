import { useEffect, useState } from "react";
import { authorizedInstance } from "../api/api";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const fetchTodoList = async () => {
    try {
      const response = await authorizedInstance.get("todos");
      setTodoList(response.data);
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);
  return <div className="TodoList"></div>;
}
