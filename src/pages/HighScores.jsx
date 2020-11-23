import React, { useState, useEffect } from "react";
import { StyledScoresLI, StyledScoresList } from "../styled/HighScores";
import { StyledTitle } from "../styled/Random";

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
      <StyledTitle>HighScores</StyledTitle>
      <StyledScoresList>
        {highscores.map((highscore, index) => (
          <StyledScoresLI key={highscore.id}>
            {index + 1}. {highscore.fields.name} - {highscore.fields.score}
          </StyledScoresLI>
        ))}
      </StyledScoresList>
    </div>
  );
}
