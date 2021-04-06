import React from "react";
import Routes from "routing/config";
import endPonts from "constants/endPonts.constants";
import "styles/styles.scss";
import "./App.scss";

import ReactGA from "react-ga";

ReactGA.initialize(`${endPonts.CODE_GA}`);
ReactGA.pageview(window.location.pathname + window.location.search);

export const App = () => {
  return <Routes />;
};

export default App;
