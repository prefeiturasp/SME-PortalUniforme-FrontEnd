import React from "react";
import "./style.scss";

export class InputErroMensagem extends React.Component {
  render() {
    const { meta } = this.props;
    return (
      <div className="error-or-warning-message">
        {meta &&
          meta.touched &&
          ((meta.error && <div className="error-message">{meta.error}</div>) ||
            (meta.warning && (
              <div className="warning-message">{meta.warning}</div>
            )))}
      </div>
    );
  }
}
