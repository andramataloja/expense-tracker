import React from "react"
import Header from "./components/Header"
import Users from "./components/Users"
import DoughnutChart from "./components/DoughnutChart"

import Routes from "./routes";

const App = () => {

/*   const { isLoading, user } = useAuth0() */
  
  return (
    <Routes/>
  
    /* <Fragment>
      <Header />
      <DoughnutChart/>
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
}

export default App
