import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../components";
import { getItem } from "../util/storage";

export default function LoginPage() {
  const access_token = getItem("access_token", null);
  const navigate = useNavigate();
  useEffect(() => {
    if (access_token) {
      navigate("/todo");
    }
  }, []);

  return (
    <div className="LoginPage">
      <h1>로그인</h1>
      <Auth type="signin" />
      <Link to="signup">회원가입</Link>
    </div>
  );
}
