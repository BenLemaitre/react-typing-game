import React from "react";
import { Link } from "react-router-dom";
import CTA from "../styled/CTA";
import { Accent, StyledTitle } from "../styled/Random";

export default function Home() {
  return (
    <div>
      <StyledTitle>Ready To Type ?</StyledTitle>
      <CTA to="/game">
        Click or type <Accent>'s'</Accent> to start playing
      </CTA>
    </div>
  );
}
