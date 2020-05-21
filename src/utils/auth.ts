import * as React from "react";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import moment from "moment";
/** Utils */
import * as CustomTypes from "../custom-types";
import { USER_AUTH_KEY } from "./local-storage";
import {
  DEFAULT_USER_AUTH
} from "./consts";
const POOL_DATA = {
  UserPoolId:
    <string>process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId:
    <string>process.env.REACT_APP_COGNITO_CLIENT_ID
};
const userPool = new CognitoUserPool(POOL_DATA);
/** Sign up a user to AWS Cognito user pool */
export const signUp = (
  email: string,
  password: string,
  setError: (error: string | null) => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setUserId: React.Dispatch<React.SetStateAction<string>>,
  setTimestamp: React.Dispatch<React.SetStateAction<number>>,
  openConfirmationCodeModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log(email);
  console.log(password);
  setLoading(true);
  const userTimestamp = moment().unix();
  const stringUserTimestamp = userTimestamp.toString();
const user: CustomTypes.CognitoUser = {
    email,
    password,
  };
const attributesToBeAdded = [
    {
      Name: "email",
      Value: user.email,
    }
  ];
const attrList: Array<CognitoUserAttribute> = attributesToBeAdded.map(
    attr => {
      return new CognitoUserAttribute(attr);
    }
  );
userPool.signUp(email , password, attrList, [], (err, result) => {
    if (err) {
      setLoading(false);
      setError(err.message);
      return;
    }
    setLoading(false);
    if (result && result.user) {
      setUsername(user.email);
      setUserId(result.userSub);
      setTimestamp(+stringUserTimestamp);
      openConfirmationCodeModal(true);
    }
  });
  return;
};
/** Confirm user with code received via email */
export const confirmUser = (
  userId: string,
  userTimestamp: number,
  username: string,
  code: string,
  setError: (errorMessage: string | null) => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setUserAccountVerified: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
const userData = {
    Username: username,
    Pool: userPool,
  };
const cognitoUser = new CognitoUser(userData);
  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) {
      setLoading(false);
      setError(err.message);
    }
if (result === "SUCCESS") {
      setLoading(false);
      setUserAccountVerified(true);
    }else{
      setLoading(false);
      setError("There was a problem confirming the user");
    }
  });
};
/** Sign in and authenticate a user */
export const signIn = (
  email: string,
  password: string,
  history: History | any,
  setError: (error: string | null) => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setTimestamp: React.Dispatch<React.SetStateAction<number>>,
  setAuthStatus: (userAuth: CustomTypes.UserAuth) => void
) => {
  setLoading(true);
const authData = {
    Username: email,
    Password: password,
  };
const authDetails = new AuthenticationDetails(authData);
  const userData = {
    Username: email,
    Pool: userPool,
  };
const cognitoUser = new CognitoUser(userData);
cognitoUser.authenticateUser(authDetails, {
    onSuccess(result: CognitoUserSession | any) {
      setLoading(false);
      setUsername(email);
      setTimestamp(+result.idToken.payload["custom:timestamp"] || 0);
      setAuthStatus({
        userId: result.idToken.payload.sub,
        idToken: result.idToken.jwtToken,
        timestamp: +result.idToken.payload["custom:timestamp"] || 0,
        authenticated: true,
      });
      history.push("/home");  // or whatever route you want a signed in user to be redirected to
    },
    onFailure(err) {
      setLoading(false);
      setError(err.message);
    },
  });
return;
};
/** Return user auth object from local storage value */
export const getStoredUserAuth = (): CustomTypes.UserAuth => {
  const auth = window.localStorage.getItem(USER_AUTH_KEY);
  if (auth) {
    return JSON.parse(auth);
  }
return DEFAULT_USER_AUTH;
};