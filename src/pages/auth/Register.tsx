import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../libs/apis/authApi";
import InputField from "../../components/InputFields/InputField";
import { z } from "zod";
import PasswordField from "../../components/InputFields/PasswordField";
import { TRegisterRequest } from "../../types";

// DEFINE REGISTER ZOD SCHEMA
const registerSchema = z
  .object({
    name: z.string({ message: "Name is required" }),
    email: z
      .string({ message: "Email is required" })
      .nonempty()
      .email("Invalid email address"),
    role: z.string().nonempty("Role is required"),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(
        /[@$!%*?&#]/,
        "Password must include at least one special character"
      ),
    confirm_password: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

// REGISTER COMPONENT
export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRegister, registrationResult] = useRegisterMutation(); // REGISTER API
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // ERROR STATE
  const from = location.state?.from?.pathname || "/"; // REDIRECT TO PREVIOUS PAGE
  // FORM DATA
  const [formData, setFormData] = useState<TRegisterRequest>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "admin",
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

    // DEBUG
    // console.log({ validationResult });

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

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirm_password") as string,
      role: "admin" as string,
    };

    // Zod validation
    const isValidData = validateForm(data, registerSchema);

    if (isValidData) {
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
    <section className=" flex flex-col md:flex-row gap-3 h-full items-center justify-center">
      <div className="w-3/4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-medium">Create an Account</h1>
        {/* FORM CONTAINER */}
        <form
          noValidate
          onSubmit={handleOnSubmit}
          className={`w-full md:max-w-md flex flex-col gap-3 items-center justify-center`}
        >
          {/* NAME */}
          <InputField
            required
            label={`Name`}
            id={`name`}
            name={`name`}
            value={formData?.name}
            error={errors?.["name"]}
            onChange={handleFormChange}
            placeholder={`Name`}
            wrapperClassName={` w-full`}
          />
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
          {/* CONFIRM PASSWORD */}
          <PasswordField
            required
            label={`Confirm Password`}
            id={`confirm_password`}
            name={`confirm_password`}
            value={formData?.confirm_password}
            error={errors?.["confirm_password"]}
            onChange={handleFormChange}
            placeholder={`Confirm Password`}
            wrapperClassName={` w-full`}
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="btn  w-full bg-primary  text-white disabled:bg-[#bed9d8] disabled:cursor-not-allowed"
            disabled={registrationResult.isLoading}
          >
            {registrationResult.isLoading ? "loading..." : "Register"}
          </button>
        </form>

        {/* NAVIGATE TO LOGIN PAGE */}
        <Link to={`/auth/login`} className={`text-sm md:text-base`}>
          Do you have an account?
        </Link>
      </div>
      {/* RIGHT SIDE IMAGE */}
      <div className="w-2/4 bg-[#fcf5f3] hidden lg:block">
        <img src="/bg.png" alt="" className="w-full" />
      </div>
    </section>
  );
}
