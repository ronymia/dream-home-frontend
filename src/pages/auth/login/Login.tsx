import { useLoginMutation } from "../../../redux/api/authApi";
import "./login.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userLogin, result] = useLoginMutation();

  // redirect user to previous page
  const from = location.state?.from?.pathname || "/";

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = await userLogin(data);
    console.log(result);
    if (result?.data?.token) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleOnSubmit}>
          <h1>Welcome back</h1>
          <input name="email" type="email" placeholder="email" />
          <input name="password" type="password" placeholder="Password" />
          <button>Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
