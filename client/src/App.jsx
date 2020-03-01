import React from "react";
import Users from "./components/Users";
import Routes from "./routes";

const App = () => {
  /*   const { isLoading, user } = useAuth0() */

  return (
    <Routes />

    /* <Fragment>
      <Users/>
      <p className="App-intro">
        {!isLoading && user && (
          <div>
            <h1>You are logged in!</h1>
            <p>Hello {user.name}</p>
            {user.picture && <img src={user.picture} alt="My Avatar" />}
          </div>
        )}
      </p>
      </Fragment> */
  );
};
export default App;
