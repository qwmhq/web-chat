import { useReducer } from "react";
import userReducer, { AccountContext } from "../reducers/userReducer";

export const AccountContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    currentUserLoaded: false,
  });

  return (
    <AccountContext.Provider value={[state, dispatch]}>
      {children}
    </AccountContext.Provider>
  );
};
