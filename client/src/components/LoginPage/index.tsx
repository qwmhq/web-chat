import { SyntheticEvent, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { useField } from "../../hooks";
import { AxiosError } from "axios";
import { AccountContext, UserStateActions } from "../../reducers/userReducer";

const LoginPage = () => {
  const navigate = useNavigate();
  const [usernameField, _resetUsername] = useField("text");
  const [passwordField, _resetPassword] = useField("password");

  const [userState, userStateDispatch] = useContext(AccountContext);
  const [error, setError] = useState("");

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await authService.login({
        username: usernameField.value,
        password: passwordField.value,
      });
      userStateDispatch({ type: UserStateActions.Login, payload: response });
      navigate("/");
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

  if (!userState.currentUserLoaded) {
    return null;
  }

  if (userState.currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-lvh flex items-center">
      <div className="w-72 mx-auto">
        <h2 className="text-2xl font-bold text-center">Log In</h2>
        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              {...usernameField}
              id="username"
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
              {...passwordField}
              id="password"
              placeholder="password"
              className="w-full"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="mt-6 flex justify-center gap-4">
            <button type="submit" className="btn btn-blue">
              Log In
            </button>
            <button
              type="button"
              className="btn btn-blue"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
