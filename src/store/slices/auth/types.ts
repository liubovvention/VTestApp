export interface IUser {
  email: string | null;
}

export interface IAuthState {
  isAuthenticated: boolean;
  keepAuth: boolean;
  user: IUser | null;
}

export interface IAuthDataPayload {
  keepAuth: boolean;
  user: IUser;
}
