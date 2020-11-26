import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import {
  StyledLink,
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
} from "../styled/Navbar";
import { Accent } from "../styled/Random";

export default function Navbar({ toggleTheme }) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to="/">
          Learn.Build.<Accent>Type.</Accent>
        </Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/highScores">High Scores</StyledLink>
        </li>
        {!isAuthenticated && (
          <li>
            <button onClick={() => loginWithRedirect()}>Login</button>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={() => logout()}>Logout</button>
          </li>
        )}
        <li>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </li>
      </StyledNavItems>
    </StyledNavbar>
  );
}
