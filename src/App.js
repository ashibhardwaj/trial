import * as React from "react";
/** Contexts */
import AuthContextProvider from "./contexts/AuthContext";
import AppNavigation from "./navigation/AppNavigation";
function App() {
  return (
    <AuthContextProvider>
      <AppNavigation />
    </AuthContextProvider>
  );
}
export default App;