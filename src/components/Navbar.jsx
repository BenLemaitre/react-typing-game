import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import {
  StyledLink,
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
} from "../styled/Navbar";
import { StyledButton, StyledButtonLink } from "../styled/Buttons";
import { Accent } from "../styled/Random";

export default function Navbar({ toggleTheme }) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to="/">
          Typing <Accent>Game.</Accent>
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
            <StyledButtonLink onClick={() => loginWithRedirect()}>
              Login
            </StyledButtonLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <StyledButtonLink onClick={() => logout()}>Logout</StyledButtonLink>
          </li>
        )}
        <li>
          <StyledButton onClick={toggleTheme}>Toggle Theme</StyledButton>
        </li>
      </StyledNavItems>
    </StyledNavbar>
  );
}
