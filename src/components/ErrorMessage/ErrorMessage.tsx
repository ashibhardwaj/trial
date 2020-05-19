import * as React from "react";
import styled from "styled-components";
type ErrorMessageProps = {
  errorMessage: Error | string;
};
const ErrorMessage = styled.p`
  text-align: center;
  margin-top: 10px;
  color: rgba(200, 0, 0, 0.8);
`;
const ErrorMessageContainer: React.FC<ErrorMessageProps> = ({
  errorMessage,
}) => {
  return <ErrorMessage>{errorMessage}</ErrorMessage>;
};
export default ErrorMessageContainer;