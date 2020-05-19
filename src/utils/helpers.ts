import * as jwtDecode from "jwt-decode";
import * as CustomTypes from "../custom-types";
/** Check if a token has expired
 * @param userAuth - user auth object
 */
export const checkIfTokenIsValid = (
  userAuth: CustomTypes.UserAuth,
  setUnauthStatus: () => void
): boolean => {
  if (!userAuth || !userAuth.idToken) {
    window.localStorage.setItem(
      CustomTypes.USER_AUTH_KEY,
      JSON.stringify(CustomTypes.DEFAULT_USER_AUTH)
    );
    setUnauthStatus();
return false;
  }
try {
    // @ts-ignore
    const decodedJwt: any = jwtDecode(userAuth.idToken);
    if (decodedJwt.exp >= Date.now() / 1000) {
      return true;
    } else {
      window.localStorage.setItem(
        CustomTypes.USER_AUTH_KEY,
        JSON.stringify(CustomTypes.DEFAULT_USER_AUTH)
      );
      setUnauthStatus();
return false;
    }
  } catch (e) {
    return false;
  }
};