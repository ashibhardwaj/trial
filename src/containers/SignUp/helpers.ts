import * as validator from "validator";
/** Handle form validation for the signup form
 * @param email - user's email
 * @param password - user's chsoen password
 * @param passwordRetype - user's retyped password
 */
export const validateForm = (
  email: string,
  password: string,
  passwordRetype: string,
  setError: (error: string | null) => void
): boolean => {
  // Check for invalid email
  
// check if passwords match
  if (password !== passwordRetype) {
    setError("The passwords you entered don't match.");
    return false;
  }
return true;
};