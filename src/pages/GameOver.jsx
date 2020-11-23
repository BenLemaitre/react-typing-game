import React, { useEffect, useState } from "react";
import { useScore } from "../contexts/ScoreContext";

import { StyledCharacter } from "../styled/Game";
import { StyledLink } from "../styled/Navbar";

export default function GameOver({ history }) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState("");

  if (score === -1) {
    history.push("/");
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({ name: "Benjamin", score }),
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

    saveHighScore();
  }, []);

  return (
    <div>
      <h1>GameOver </h1>
      <StyledCharacter>{score}</StyledCharacter>
      <p>{scoreMessage}</p>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/game">Play Again ?</StyledLink>
    </div>
  );
}
