import { Link } from "react-router-dom";
import { Login } from "../components";

export default function LoginPage() {
  return (
    <div className="LoginPage">
      <h1>로그인</h1>
      <Login></Login>
      <Link to="signup">회원가입</Link>
    </div>
  );
}
