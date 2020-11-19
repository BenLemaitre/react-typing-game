import React, { useState, useEffect } from "react";
import {
  StyledCharacter,
  StyledGame,
  StyledScore,
  StyledTimer,
} from "../styled/Game";
import { Strong } from "../styled/Random";

export default function Game({ history }) {
  const MAX_SECONDS = 90;
  const [score, setScore] = useState(1);
  const [seconds, setSeconds] = useState(MAX_SECONDS);
  const [ms, setMs] = useState(0);

  useEffect(() => {
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);

    return () => clearInterval(interval);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateTime = (startTime) => {
    const endTime = new Date();
    const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
    const formattedMSString = ("0000" + msPassedStr).slice(-5);
    // 00 : seconds; 000 : mseconds passed
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;

    const updatedMs =
      1000 -
      parseInt(formattedMSString.substring(formattedMSString.length - 3));

    setSeconds(addLeadingZeros(updatedSeconds, 2));
    setMs(addLeadingZeros(updatedMs, 3));
  };

  const addLeadingZeros = (num, length) => {
    let zeros = "";

    for (let i = 0; i < length; i++) {
      zeros += "0";
    }

    return (zeros + num).slice(-length);
  };

  useEffect(() => {
    if (seconds <= -1) {
      history.push("/gameOver");
    }
  }, [seconds, ms, history]);

  const keyupHandler = (e) => {
    console.log(e.key);
  };

  useEffect(() => {
    document.addEventListener("keyup", keyupHandler);
    return () => {
      document.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time:{" "}
        <Strong>
          {seconds}: {ms}{" "}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
