import { useState } from "react";
import { anonymousInstance } from "../api/api";

const initialLoginValues = {
  email: "",
  emailValidated: false,
  password: "",
  passwordValidated: false,
};

export default function Login() {
  const [loginValues, setValues] = useState(initialLoginValues);

  const handleInput = (e) => {
    const {
      target: { name, value },
    } = e;
    const nextValues = { ...loginValues };
    if (name === "email") {
      nextValues.email = value;
      nextValues.emailValidated = !!value.match(/@/);
    } else if (name === "password") {
      nextValues.password = value;
      nextValues.passwordValidated = value.length > 7;
    }
    setValues(nextValues);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await anonymousInstance.post("auth/signin", {
        email: loginValues.email,
        password: loginValues.password,
      });
      console.log(response);
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={submit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            name="email"
            value={loginValues.email}
            onChange={handleInput}
          />

          <FeedbackMessage
            hasError={!loginValues.emailValidated}
            errorMessage="이메일은 @을 포함해야 합니다"
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            name="password"
            type="password"
            value={loginValues.password}
            onChange={handleInput}
          />
          <FeedbackMessage
            hasError={!loginValues.passwordValidated}
            errorMessage="비밀번호는 8자리 이상입니다."
          />
        </div>
        <button
          type="submit"
          disabled={
            !(loginValues.emailValidated && loginValues.passwordValidated)
          }
        >
          제출
        </button>
      </form>
    </div>
  );
}

const FeedbackMessage = ({ hasError, errorMessage }) => {
  if (hasError) return <p className="feedback-message">{errorMessage}</p>;
  return <></>;
};
