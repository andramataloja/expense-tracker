import React from "react"
import { useAuth0 } from "./contexts/auth0-context"
import Header from "./components/Header"
import Users from "./components/Users"


function App() {
  const { isLoading, user } = useAuth0()
  
  return (
    <div className="App">
      <Header />
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
    </div>
  )
}

export default App
