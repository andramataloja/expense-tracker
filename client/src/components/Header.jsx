import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import { useAuth0 } from "../contexts/auth0-context"

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 38,
    padding: "0 20px"
  }
})

export default function Header() {
  const classes = useStyles()
  const { isLoading, user, loginWithRedirect, logout } = useAuth0()

  return (
    <header>
      <nav>
        <div>
          <div>
            <div>
              {!isLoading && !user && (
                <Button className={classes.root} onClick={loginWithRedirect}>
                  Login
                </Button>
              )}
              {!isLoading && user && (
                <>
                  <Button>{user.name}</Button>
                  <Button
                    className={classes.root}
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
