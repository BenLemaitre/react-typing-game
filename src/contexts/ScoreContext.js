import React, { useContext, useState } from "react";

// Starts at -1 to make sure the user never ends up on the game over page
// without having played the game
const ScoreContext = React.createContext(-1);
const useScore = () => useContext(ScoreContext);

const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(-1);

  return (
    <ScoreContext.Provider value={[score, setScore]}>
      {children}
    </ScoreContext.Provider>
  );
};

export { useScore, ScoreProvider };
