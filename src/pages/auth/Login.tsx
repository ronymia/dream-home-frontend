import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod"; // Import Zod
import { useLoginMutation } from "../../libs/apis/authApi";
import InputField from "../../components/InputFields/InputField";
import PasswordField from "../../components/InputFields/PasswordField";
import { TLoginRequest } from "../../types";
import { useAuth } from "../../context/AuthContext";

// DEFINE LOGIN ZOD SCHEMA
const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().min(1, "Password is required"),
});

// LOGIN COMPONENT
export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userLogin, loginResult] = useLoginMutation(); // LOGIN API
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // ERROR STATE
  const from = location.state?.from?.pathname || "/"; // NAVIGATE TO PREVIOUS PAGE
  const { login, isLoading } = useAuth();

  // FORM DATA
  const [formData, setFormData] = useState<TLoginRequest>({
    email: "",
    password: "",
  });

  // UPDATE FORM DATA
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // VALIDATE FORM
  const validateForm = <T extends object>(
    validatePayload: T,
    schema: z.ZodSchema<T>
  ): boolean => {
    const validationErrors: { [key: string]: string } = {};

    // Zod VALIDATION
    const validationResult = schema.safeParse(validatePayload);

    // VALIDATION RESULT
    if (!validationResult.success) {
      validationResult.error.errors.forEach((err) => {
        // CHECK ERROR FIELD
        if (err.path[0]) {
          validationErrors[err.path[0]] = err.message;
        }
      });
    }

    // SET ERROR
    Object.keys(validationErrors).length
      ? setErrors(validationErrors)
      : setErrors({});

    // return true IF NO VALIDATION ERROR FOUND
    return Object.keys(validationErrors).length === 0;
  };

  // FORM SUBMIT
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Zod validation
    const isValidData = validateForm(formData, loginSchema);
    if (isValidData) {
      await login(formData).then((res) => {
        console.log({ res });

        if (res) {
          navigate(from, { replace: true });
        }
      });

      // } catch (error) {
      //   // console.warn("Login error:", error);
      //   setErrors({ general: "Failed to login. Please try again." });
      // }
    }
  };

  return (
    <section className="flex flex-col md:flex-row gap-3 h-full items-center justify-center">
      <div className="w-3/4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-medium">Welcome back</h1>
        <form
          noValidate
          onSubmit={handleOnSubmit}
          className={`w-full md:max-w-md flex flex-col gap-3 items-center justify-center`}
        >
          {/* EMAIL */}
          <InputField
            required
            type={`email`}
            label={`Email`}
            id={`email`}
            name={`email`}
            value={formData?.email}
            error={errors?.["email"]}
            onChange={handleFormChange}
            placeholder={`Email`}
            wrapperClassName={` w-full`}
          />
          {/* PASSWORD */}
          <PasswordField
            required
            label={`Password`}
            id={`password`}
            name={`password`}
            value={formData?.password}
            error={errors?.["password"]}
            onChange={handleFormChange}
            placeholder={`Password`}
            wrapperClassName={` w-full`}
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loginResult.isLoading || isLoading}
            className={`btn  w-full bg-primary  text-white disabled:bg-[#bed9d8] disabled:cursor-not-allowed`}
          >
            {loginResult.isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* NAVIGATE TO REGISTER PAGE */}
        <Link to="/auth/register" className={`text-sm md:text-base`}>
          {"Don't"} you have an account?
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-2/4 bg-[#fcf5f3] hidden lg:block">
        <img src="/bg.png" alt="login" />
      </div>
    </section>
  );
}
