import * as React from "react";
import styled from "styled-components";
export const FullWidthContainer = styled.div`
  width: 100%;
  text-align: ${(props: { align?: string }) =>
    props.align ? `${props.align}` : "auto"};
`;
export const AuthPageWrapper = styled.div`
  display: flex;
  flex: 1;
  background: rgb(244, 245, 247);
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-size: cover;
  background-position: 50% 50%;
  z-index: -1;
  padding: 0;
  margin: 0;
  flex-direction: column;
  &:before {
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0);
    content: "";
    z-index: 0;
  }
`;
export const SignUpWrapper = styled.div`
  width: 520px;
  height: auto;
  background: rgb(255, 255, 255);
  padding: 2.75rem;
  border-radius: 3px;
  box-shadow: 0 7px 14px 0 rgba(59, 65, 94, 0.1),
    0 3px 6px 0 rgba(0, 0, 0, 0.07);
`;
export const SignUpContainer = styled.div`
  width: 100%;
  & input {
    background: rgba(0,0,0,0) !important;
  }
  & .input-group {
    background: rgba(214, 219, 230, 0.36) !important;
    border-radius: 0.25rem;
  }
  & a {
    color: '#0000FF';
    text-decoration: none;
  }
`;