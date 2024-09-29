import { FormEvent, useState } from "react";
import "./register.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../app/apis/authApi";

function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRegister, registrationResult] = useRegisterMutation();
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
      role: "admin" as string,
    };

    if (validateForm(data)) {
      const result = await userRegister(data);

      if (registrationResult.isError) {
        // Handle error directly
        console.log("Login error:", registrationResult.error);
        setErrors({ general: "Login failed. Please check your credentials." });
      } else if (result?.data?.token) {
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleOnSubmit}>
          <h1>Create an Account</h1>
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />

          <button type="submit" disabled={registrationResult.isLoading}>
            {registrationResult.isLoading ? "loading..." : "Register"}
          </button>

          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
