import React, { useState, useEffect } from "react";
import { StyledScoresLI, StyledScoresList } from "../styled/HighScores";

export default function HighScores() {
  const [highscores, setHighScores] = useState([]);

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch("/.netlify/functions/getHighScores");
        const highScores = await res.json();

        setHighScores(highScores);
      } catch (err) {
        console.error(err);
      }
    };

    loadHighScores();
  }, []);

  return (
    <div>
      <h1>HighScores</h1>
      <StyledScoresList>
        {highscores.map((highscore) => (
          <StyledScoresLI key={highscore.id}>
            {highscore.fields.name} - {highscore.fields.score}
          </StyledScoresLI>
        ))}
      </StyledScoresList>
    </div>
  );
}
