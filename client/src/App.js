import React from "react";
import { useAuth0 } from "./contexts/auth0-context";
import Header from "./components/Header";

function App() {
  /*  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:3000/testserver")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  } */

  const { isLoading, user } = useAuth0();
  return (
    <div className="App">
      <Header />
      <p className="App-intro">
        {!isLoading && user && (
          <div>
            <h1>You are logged in!</h1>
            <p>Hello {user.name}</p>
            {user.picture && <img src={user.picture} alt="My Avatar" />}
          </div>
        )}
      </p>
    </div>
  );
}

export default App;
