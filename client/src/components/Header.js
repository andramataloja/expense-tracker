import React from "react";
import { useAuth0 } from "../contexts/auth0-context";

export default function Header() {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();

  return (
    <header>
      <nav>
        <div>
          <div>
            <div>
              {!isLoading && !user && (
                <button onClick={loginWithRedirect}>Login</button>
              )}
              {!isLoading && user && (
                <>
                  <button>{user.name}</button>
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
