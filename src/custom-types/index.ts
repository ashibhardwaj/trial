/** User auth */
export type UserAuth = {
  userId: string | number;
  idToken: string;
  timestamp?: string | number;
  authenticated: boolean;
};

export type CognitoUser = {
  email: string;
  password: string;
};

export const USER_AUTH_KEY = "UserAuth";

/** Default user auth object */
export const DEFAULT_USER_AUTH = Object.freeze({
  userId: 0,
  idToken: "",
  authenticated: false,
});