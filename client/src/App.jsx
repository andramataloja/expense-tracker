import React from "react";
import Routes from "./routes";
import { useAuth0 } from "./utils/auth0-context";
import Login from "./components/Login";

const App = () => {
  const { isLoading, user, isAuthenticated } = useAuth0();

  return (
    <>
      {!isLoading && !isAuthenticated && <Login />}
      {!isLoading && user && isAuthenticated && <Routes />}
    </>
  );
};
export default App;
