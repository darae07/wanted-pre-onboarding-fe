import { useState } from "react";
import { authorizedInstance } from "../api/api";

const initialTodoValues = {
  todo: "",
};
export default function CreateTodo({ addTodo }) {
  const [values, setValues] = useState(initialTodoValues);
  const handleInput = (e) => {
    const {
      target: { name, value },
    } = e;
    const nextValues = { ...values };
    if (name === "todo") {
      nextValues.todo = value;
    }
    setValues(nextValues);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await authorizedInstance.post("todos", values);
      addTodo(response.data);
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
  };

  return (
    <div className="CreateTodo">
      <form onSubmit={submit}>
        <textarea name="todo" value={values.todo} onChange={handleInput} />

        <div className="btn-area">
          <button type="submit">추가</button>
        </div>
      </form>
    </div>
  );
}
