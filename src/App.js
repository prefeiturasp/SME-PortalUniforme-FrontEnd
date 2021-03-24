import React from "react";
import Routes from "routing/config";
import "styles/styles.scss";
import "./App.scss";

import ReactGA from "react-ga";

ReactGA.initialize("UA-85250794-15");
ReactGA.pageview(window.location.pathname + window.location.search);

export const App = () => {
  return <Routes />;
};

export default App;
