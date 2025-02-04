import { createContext } from "react";
import { CurrentUser, LoginResponse, UserState } from "../types";

export enum UserStateActions {
  Initialize,
  Login,
  Logout,
}

interface InitializeAction {
  type: UserStateActions.Initialize;
}

interface LoginAction {
  type: UserStateActions.Login;
  payload: LoginResponse;
}

interface LogoutAction {
  type: UserStateActions.Logout;
}

export type UserStateAction = InitializeAction | LoginAction | LogoutAction;

const reducer = (state: UserState, action: UserStateAction): UserState => {
  switch (action.type) {
    case UserStateActions.Initialize: {
      const newState = { ...state };
      const currentUserJson = localStorage.getItem("currentUser");
      if (currentUserJson) {
        const currentUser: CurrentUser = JSON.parse(currentUserJson);
        newState.currentUser = currentUser;
      }
      newState.currentUserLoaded = true;
      return newState;
    }
    case UserStateActions.Login: {
      window.localStorage.setItem(
        "currentUser",
        JSON.stringify(action.payload),
      );
      return {
        currentUser: { ...action.payload },
        currentUserLoaded: true,
      };
    }
    case UserStateActions.Logout: {
      window.localStorage.removeItem("currentUser");
      return { currentUserLoaded: true };
    }
    default:
      return state;
  }
};

export const AccountContext = createContext<
  [UserState, React.Dispatch<UserStateAction>]
>([{} as UserState, () => {}]);

export default reducer;
