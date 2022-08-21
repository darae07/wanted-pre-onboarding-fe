import { useState } from "react";
import { authorizedInstance } from "../api/api";

const initialTodoValues = {
  todo: "",
};
export default function CreateTodo() {
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
      console.log(response);
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
  };

  return (
    <div className="CreateTodo">
      <form onSubmit={submit}>
        <div>
          <label htmlFor="todo"></label>
          <input name="todo" value={values.todo} onChange={handleInput} />
        </div>
        <button type="submit">추가</button>
      </form>
    </div>
  );
}
