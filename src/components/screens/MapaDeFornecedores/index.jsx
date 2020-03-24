import React, { Component, Fragment } from "react";

export class MapaDeFornecedores extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      latitude,
      longitude,
      tipoUniformeSelecionados
    } = this.props.location.state;
    console.log(latitude, longitude, tipoUniformeSelecionados);
    return (
      <Fragment>
        <div className="w-100 sociedade-governo text-white mt-5">
          <div className="container">
            <div className="col-lg-12 mb-lg-0">
              <h3>Lojas mais próximas</h3>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default MapaDeFornecedores;
