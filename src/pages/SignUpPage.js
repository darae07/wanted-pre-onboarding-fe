import { Auth } from "../components";
import { getItem } from "../util/storage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignUpPage() {
  const access_token = getItem("access_token", null);
  const navigate = useNavigate();
  useEffect(() => {
    if (access_token) {
      navigate("/todo");
    }
  }, []);

  return (
    <div className="SignUpPage">
      <h1>회원가입</h1>
      <Auth type="signup" />
    </div>
  );
}
