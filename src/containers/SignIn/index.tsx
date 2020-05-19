import * as React from "react";
import { Redirect } from "react-router";
/** Context consumer */
import { authContext } from "../../contexts/AuthContext";
/** Presentation/UI */
import { AuthPageWrapper, SignUpWrapper } from "../../components/Layouts";
import SignInForm from "./SignInForm";
const SignIn: React.FC<{}> = () => {
  const { auth } = React.useContext(authContext);
if (auth.authenticated) {
    return <Redirect to="/home" />;
  }
return (
    <AuthPageWrapper>
      <SignUpWrapper>
        <SignInForm />
      </SignUpWrapper>
    </AuthPageWrapper>
  );
};
export default SignIn;