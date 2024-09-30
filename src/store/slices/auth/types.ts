export interface IUser {
    email: string | null;
}

export interface IAuthState {
    isAuthenticated: boolean;
    user: IUser | null;
  }