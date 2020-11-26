import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Game from "./pages/Game";
import HighScores from "./pages/HighScores";
import GameOver from "./pages/GameOver";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import { Container } from "./styled/Container";
import { Main } from "./styled/Main";
import Global from "./styled/Global";
import { lightTheme, darkTheme } from "./styled/Themes";

import { ThemeProvider } from "styled-components";

function App() {
  const { loading } = useAuth0();
  const theme = "dark";
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <Global />
        <Main>
          {loading && <p>Loading ...</p>}
          {!loading && (
            <Container>
              <Navbar />
              <Switch>
                <Route path="/game" component={Game} />
                <Route path="/highScores" component={HighScores} />
                <Route path="/gameOver" component={GameOver} />
                <Route path="/" component={Home} />
              </Switch>
            </Container>
          )}
        </Main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
