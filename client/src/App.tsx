import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ChatContextProvider } from "./components/ChatContextProvider";
import { AccountContext, UserStateActions } from "./reducers/userReducer";
import { Toaster } from "./components/ui/sonner";
import { SocketContextProvider } from "./components/SocketContextProvider";

const App = () => {
  const [_userState, userStateDispatch] = useContext(AccountContext);

  useEffect(() => {
    userStateDispatch({ type: UserStateActions.Initialize });
  }, [userStateDispatch]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <ChatContextProvider>
                <SocketContextProvider>
                  <ChatPage />
                </SocketContextProvider>
              </ChatContextProvider>
            }
          />
        </Route>
      </Routes>
      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
