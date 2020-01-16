import React, { Component } from "react";

export default class BlocoTexto extends Component {
  render() {
    return (
      <div>
        <h2 className="cor-azul mb-4">{this.props.title}</h2>
        <p className="mb-0">{this.props.children}</p>
      </div>
    );
  }
}
