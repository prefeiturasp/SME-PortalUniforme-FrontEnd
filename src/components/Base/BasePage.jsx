import React, { Component } from "react";

import Menu from "../MenuSuperior/Menu";
import Rodape from "../Rodape/Rodape";

export default class BasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Menu {...this.props} />

        {this.props.children}

        <Rodape />
      </div>
    );
  }
}
