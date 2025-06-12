import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField } from "@/hooks";
import { AccountContext, UserStateActions } from "@/reducers/userReducer";
import authService from "@/services/authService";
import { AxiosError } from "axios";
import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Page = () => {
  const navigate = useNavigate();
  const [usernameField, _resetUsername] = useField("text");
  const [passwordField, _resetPassword] = useField("password");

  const [userState, userStateDispatch] = useContext(AccountContext);

  const onSubmit = async (e: React.SyntheticEvent) => {
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
        toast.error(errorMsg);
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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your username below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      {...usernameField}
                      id="username"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      {/*<a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>*/}
                    </div>
                    <Input
                      {...passwordField}
                      id="password"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full"
                    >
                      Login
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
