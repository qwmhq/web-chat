import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { useField } from "../../hooks";
import { AxiosError } from "axios";

const SignupPage = () => {
  const [email, _resetEmail] = useField("email");
  const [username, _resetUsername] = useField("text");
  const [password, _resetPassword] = useField("password");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await authService.signup({
        email: email.value,
        username: username.value,
        password: password.value,
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
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              id="email"
              {...email}
              placeholder="email"
              autoComplete="off"
              className="w-full"
            />
          </div>
          <div className="mt-6">
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              id="username"
              {...username}
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
              {...password}
              placeholder="password"
              autoComplete="off"
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
