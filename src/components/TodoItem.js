import { useState } from "react";
import { authorizedInstance } from "../api/api";

export default function TodoItem({ intialTodo, deleteTodo }) {
  const [todo, setTodo] = useState(intialTodo);
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => setEditMode(!editMode);

  const editTodo = async (values) => {
    try {
      const response = await authorizedInstance.put(
        `todos/${values.id}`,
        values
      );
      return response;
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
  };

  const toggleCompleteTodo = async (e) => {
    const nextCompleted = !todo.isCompleted;
    const response = await editTodo({
      ...todo,
      isCompleted: nextCompleted,
    });
    setTodo({ ...response.data });
  };

  const fetchDeleteTodo = async () => {
    try {
      await authorizedInstance.delete(`todos/${todo.id}`);
      deleteTodo(todo.id);
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
  };

  return (
    <li className="TodoItem">
      <label htmlFor="isCompleted">완료</label>
      <input
        type="checkbox"
        name="isCompleted"
        value={todo.isCompleted}
        onChange={toggleCompleteTodo}
      />

      {editMode ? (
        <EditTodo
          intialTodo={todo}
          toggleEditMode={toggleEditMode}
          editTodo={editTodo}
          setTodo={setTodo}
        />
      ) : (
        <div>
          <p>{todo.todo}</p>
          <button type="button" onClick={toggleEditMode}>
            수정
          </button>
          <button type="button" onClick={fetchDeleteTodo}>
            삭제
          </button>
        </div>
      )}
    </li>
  );
}

const EditTodo = ({ intialTodo, toggleEditMode, editTodo, setTodo }) => {
  const [todoValues, setValues] = useState(intialTodo);
  const handleInput = (e) => {
    const nextValues = { ...todoValues };
    nextValues[e.target.name] = e.target.value;
    setValues(nextValues);
  };

  const submit = async (e) => {
    e.preventDefault();
    const response = await editTodo(todoValues);
    setTodo(response.data);
    toggleEditMode();
  };

  return (
    <div className="EditTodo">
      <form onSubmit={submit}>
        <input value={todoValues.todo} name="todo" onChange={handleInput} />

        <div>
          <button type="button" onClick={toggleEditMode}>
            취소
          </button>
          <button type="submit">제출</button>
        </div>
      </form>
    </div>
  );
};
