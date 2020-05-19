import * as React from "react";
/** Containers */
import SignUpForm from "./SignUpForm";
/** Context consumer */
import { authContext } from "../../contexts/AuthContext";
/** Presentation/UI */
import { AuthPageWrapper, SignUpWrapper } from "../../components/Layouts";
import GlobalModalContainer from "../../components/Modal/Modal";
import ConfirmationCodeForm from "./ConfirmationCodeForm";
const SignUp: React.FC<{}> = () => {
  const { confirmationCodeModal, openConfirmationCodeModal } = React.useContext(
    authContext
  );
return (
    <AuthPageWrapper>
      <SignUpWrapper>
        <GlobalModalContainer
          toggleModal={() => openConfirmationCodeModal(false)}
          title="Please Check Your Email"
          modalDisplay={<ConfirmationCodeForm />}
          modal={confirmationCodeModal}
        />
        <SignUpForm />
      </SignUpWrapper>
    </AuthPageWrapper>
  );
};
export default SignUp;