import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.scss";
import { FormEvent, useState } from "react";
import { useLoginMutation } from "../../../app/apis/authApi";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userLogin, loginResult] = useLoginMutation();

  // redirect user to previous page
  const from = location.state?.from?.pathname || "/";

  const [errors, setErrors] = useState<Record<string, string>>({});
  const validateForm = (data) => {
    const validationError: Record<string, string> = {};

    if (!data.email) {
      validationError.email = "Email is required";
    }
    if (!data.password) {
      validationError.password = "Password is required";
    }

    setErrors(validationError);
    // return true if there is no error
    return Object.keys(validationError).length === 0;
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      if (validateForm(data)) {
        const result = await userLogin(data).unwrap();
        console.log(result);

        if (result?.token) {
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleOnSubmit}>
          <h1>Welcome back</h1>
          <div className="form-control">
            <input name="email" type="email" placeholder="email" />
            {errors.general && <span className="error">{errors.general}</span>}
          </div>
          <div className="form-control">
            <input name="password" type="password" placeholder="Password" />
            {errors.general && <span className="error">{errors.general}</span>}
          </div>
          <button disabled={loginResult.isLoading}>
            {loginResult.isLoading ? "loading..." : "Login"}
          </button>
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
