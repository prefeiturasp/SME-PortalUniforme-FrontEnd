import React from "react";
import "./style.scss";

export class HelpText extends React.Component {
  render() {
    const { helpText, red } = this.props;
    return <div className={`help-text ${red && "red"}`}>{helpText}</div>;
  }
}
