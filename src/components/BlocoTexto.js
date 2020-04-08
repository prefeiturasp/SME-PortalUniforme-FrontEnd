import React, { Component, Fragment } from "react";

export default class BlocoTexto extends Component {
  render() {
    const { className } = this.props;
    return (
      <Fragment>
        <h2 className={`cor-azul mb-4 ${className || undefined}`}>
          {this.props.title}
        </h2>
        {this.props.children}
      </Fragment>
    );
  }
}
