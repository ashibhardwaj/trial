import * as React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
/** Context consumer */
import { authContext } from "../../contexts/AuthContext";
/** Presentation/UI */
import { SignUpContainer } from "../../components/Layouts";
import ErrorMessageContainer from "../../components/ErrorMessage/ErrorMessage";
/** Custom Hooks */
import useErrorHandler from "../../utils/custom-hooks/ErrorHandler";
/** Utils */
import * as auth from "../../utils/auth";
import { validateForm } from "./helpers";
const SignUpForm: React.FC<{}> = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordRetype, setPasswordRetype] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { error, showError } = useErrorHandler(null);
  const {
    openConfirmationCodeModal,
    setUsername,
    setUserId,
    setTimestamp,
  } = React.useContext(authContext);
return (
    <SignUpContainer>
      <Form
        onSubmit={e => {
          e.preventDefault();
          if (validateForm(email, password, passwordRetype, showError)) {
            auth.signUp(
              email,
              password,
              showError,
              setLoading,
              setUsername,
              setUserId,
              setTimestamp,
              openConfirmationCodeModal
            );
          }
        }}
      >
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={email}
            id="email"
            placeholder="yourname@entelect.co.za"
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="passwordRetype">Retype Password</Label>
          <Input
            type="password"
            name="passwordRetype"
            value={passwordRetype}
            id="passwordRetype"
            onChange={e => setPasswordRetype(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Button type="submit" block={true}>
            {loading ? "Loading..." : "Sign Up"}
          </Button>
        </FormGroup>
        {error && <ErrorMessageContainer errorMessage={error} />}
      </Form>
    </SignUpContainer>
  );
};
export default SignUpForm;