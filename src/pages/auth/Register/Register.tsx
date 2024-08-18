import { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/api/authApi";

function Register() {
  const [userRegister, state] = useRegisterMutation();
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = await userRegister(data);
    console.log(result);
  };

  state.isLoading && console.log(state);

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleOnSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />

          <button type="submit">
            {state.isLoading ? "loading" : "Register"}
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
