import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useScore } from "../contexts/ScoreContext";

import { StyledCharacter } from "../styled/Game";
import { StyledLink } from "../styled/Navbar";
import { StyledTitle } from "../styled/Random";

export default function GameOver({ history }) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState("");
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  if (score === -1) {
    history.push("/");
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const token = await getAccessTokenSilently();

        const options = {
          method: "POST",
          body: JSON.stringify({ name: "Benjamin", score }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await fetch("/.netlify/functions/saveHighScore", options);
        const data = await res.json();

        if (data.id) {
          setScoreMessage("Congrats ! You got a high score !");
        } else {
          setScoreMessage(
            "Sorry, it's not a high score. It's okay though. Keep trying !"
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (isAuthenticated) {
      saveHighScore();
    }
  }, [score, getAccessTokenSilently, isAuthenticated]);

  return (
    <div>
      <StyledTitle>Game Over</StyledTitle>
      <h2>{scoreMessage}</h2>
      {!isAuthenticated && <h2>Log in to compete for high scores !</h2>}
      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to="/">Home</StyledLink>
      </div>
      <div>
        <StyledLink to="/game">Play Again ?</StyledLink>
      </div>
    </div>
  );
}
