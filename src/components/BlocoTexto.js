import React, { Component, Fragment } from "react";

export default class BlocoTexto extends Component {
  render() {
    return (
      <Fragment>
        <h2 className="cor-azul mb-4">{this.props.title}</h2>
        {this.props.children}
      </Fragment>
    );
  }
}
