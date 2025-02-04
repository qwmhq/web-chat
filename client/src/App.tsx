import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ChatContextProvider } from "./components/ChatContextProvider";
import { AccountContext, UserStateActions } from "./reducers/userReducer";

const App = () => {
  const [_userState, userStateDispatch] = useContext(AccountContext);

  useEffect(() => {
    userStateDispatch({ type: UserStateActions.Initialize });
  }, [userStateDispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <ChatContextProvider>
              <ChatPage />
            </ChatContextProvider>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
