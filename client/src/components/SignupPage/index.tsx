import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { useField } from "../../hooks";
import { AxiosError } from "axios";

const SignupPage = () => {
  const [usernameField, _resetUsername] = useField("text");
  const [passwordField, _resetPassword] = useField("password");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await authService.signup({
        username: usernameField.value,
        password: passwordField.value,
      });
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data.error;
        setError(errorMsg);
        setTimeout(() => setError(""), 5000);
      } else {
        throw error;
      }
    }
  };

  return (
    <div className="h-lvh flex items-center">
      <div className="w-72 mx-auto">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              id="username"
              {...usernameField}
              placeholder="username"
              autoComplete="off"
              className="w-full"
            />
          </div>
          <div className="mt-6">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              id="password"
              {...passwordField}
              placeholder="password"
              autoComplete="new-password"
              className="w-full"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="mt-6 flex justify-center gap-4">
            <button className="btn btn-blue">Sign up</button>
            <button
              className="btn btn-blue flex items-center"
              onClick={() => navigate("/login")}
            >
              <ArrowLeftIcon className="inline size-4 mr-1" />
              <span>Back</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
