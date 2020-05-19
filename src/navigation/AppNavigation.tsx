import * as React from "react";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/** Context consumer */
import { authContext } from "../contexts/AuthContext";
/** Routes */
import Routes from "./Routes";
/** Sidebar nav */
/** import SideBar from "../components/Sidebar"; */
/** Utils */
import { checkIfTokenIsValid } from "../utils/helpers";
import { USER_AUTH_KEY } from "../utils/local-storage";
const AuthRoute = (props: any) => {
  const { setUnauthStatus } = React.useContext(authContext);
  const Comp = props.component;
return props.private &&
    !checkIfTokenIsValid(
      JSON.parse(window.localStorage.getItem(USER_AUTH_KEY) || ""),
      setUnauthStatus
    ) ? (
    <Redirect to="/sign-in" />
  ) : props.private &&
    checkIfTokenIsValid(
      JSON.parse(window.localStorage.getItem(USER_AUTH_KEY) || ""),
      setUnauthStatus
    ) ? (
    <Route render={data => <Comp {...data} {...props} />} />
  ) : (
    <Route render={data => <Comp {...data} {...props} />} />
  );
};
const AppNavigation = () => (
  <Router>
    <React.Fragment>
      <Switch>
        {Routes.map((route, i) => {
          return <AuthRoute key={i} {...route} />;
        })}
      </Switch>
    </React.Fragment>
  </Router>
);
export default AppNavigation;