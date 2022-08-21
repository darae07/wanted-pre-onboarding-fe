import { useState } from "react";

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

  return (
    <div className="CreateTodo">
      <form>
        <div>
          <label htmlFor="todo"></label>
          <input name="todo" value={values.todo} onChange={handleInput} />
        </div>
      </form>
    </div>
  );
}
