export interface IUser {
  email: string | null;
}

export interface IAuthState {
  isAuthenticated: boolean;
  isLoggedIn: boolean;
  user: IUser | null;
}

export interface IAuthDataPayload {
  isLoggedIn: boolean;
  user: IUser;
}
