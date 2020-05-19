import * as React from "react";
import { Button, Form, Label, FormGroup, Input } from "reactstrap";
/** Context consumer */
import { authContext } from "../../contexts/AuthContext";
/** Presentation/UI */
import { FullWidthContainer } from "../../components/Layouts";
import ErrorMessageContainer from "../../components/ErrorMessage/ErrorMessage";
/** Custom Hooks */
import useErrorHandler from "../../utils/custom-hooks/ErrorHandler";
/** Utils */
import * as auth from "../../utils/auth";
const ConfirmationCodeForm: React.FC<{}> = () => {
  const [loading, setLoading] = React.useState(false);
  const [confirmationCode, setConfirmationCode] = React.useState("");
  const { error, showError } = useErrorHandler(null);
  const {
    username,
    userId,
    userTimestamp,
    userAccountVerified,
    setUserAccountVerified,
  } = React.useContext(authContext);
const displayFormOrMessage = (
    userAccountVerified: boolean
  ): React.ReactNode => {
    if (userAccountVerified) {
      return <div>Your account has been verified.</div>;
    }
return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          if (confirmationCode) {
            auth.confirmUser(
              userId,
              userTimestamp,
              username,
              confirmationCode,
              showError,
              setLoading,
              setUserAccountVerified
            );
          } else {
            showError("Cannot have an empty field.");
          }
        }}
      >
        <FormGroup>
          <Label for="confirmationCode">Enter Confirmation Code</Label>
          <Input
            type="text"
            name="confirmationCode"
            id="confirmationCode"
            placeholder="Confirmation code"
            onChange={e => setConfirmationCode(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit" block={true}>
            {loading ? "Loading..." : "Confirm"}
          </Button>
        </FormGroup>
        {error && <ErrorMessageContainer errorMessage={error} />}
      </Form>
    );
  };
return (
    <FullWidthContainer>
      {displayFormOrMessage(userAccountVerified)}
    </FullWidthContainer>
  );
};
export default ConfirmationCodeForm;