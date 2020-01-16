import React, { Component } from "react";

import { Field } from "redux-form";
import { InputText } from "components/Input/InputText";
import { required } from "helpers/fieldValidators";

import { FileUpload } from "components/Input/FileUpload";
import { AutoComplete } from "components/Input/AutoComplete";
import { Card } from "primereact/card";
import { API_IMOVEIS_DEMANDA } from "constants/apiFilaCreche.constants";

export class Imovel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endereco: "",
      bairro: "",
      selectCEP: [],
      cep: "",
      helpText: ""
    };
    this.grupo = [
      [1, "Bercario I"],
      [4, "Bercario II"],
      [27, "Mini Grupo I"],
      [28, "Mini grupo II"]
    ];

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.onFetchCEP = this.onFetchCEP.bind(this);
    this.onFetchGrupoCreche = this.onFetchGrupoCreche.bind(this);
    this.onAddressBlur = this.onAddressBlur.bind(this);
  }

  onFetchCEP = dataAddress => {
    this.onFetchGrupoCreche(dataAddress);
  };

  onFetchGrupoCreche(endereco) {
    const authToken = {
      Authorization: `Token 4fcce3bb12805893514061555474d867adc85329`,
      "Content-Type": "application/json"
    };
    const { longitude, latitude } = endereco;
    fetch(`${API_IMOVEIS_DEMANDA}/${latitude}/${longitude}`, {
      headers: authToken
    })
      .then(response => response.json())
      .then(json => {
        const grupo = this.grupo;
        let data = {};
        grupo.forEach((faixa, key) => {
          let faixaCorrespondente = json.results.find(
            result => result["cd_serie_ensino"] === faixa[0]
          );
          data[faixa[0]] = faixaCorrespondente ? faixaCorrespondente.total : 0;
        });
        this.setState(data);
      });
  }

  handleAddressChange(dataAddress) {
    if (dataAddress.cep) {
      this.setState({
        helpText: ""
      });
    }
    this.onFetchCEP(dataAddress);
    this.setState({
      ...dataAddress
    });
    this.props.setAddressSelected(true, dataAddress);
  }

  onAddressBlur(event) {
    let helpText = "";
    if (this.state.cep === "") {
      helpText = "Endereço inválido. Selecione um resultado da lista.";
    } 
    if (this.state.numero === undefined) {
      helpText = "É necessário informar o número do imóvel no endereço.";
    }
    this.setState({ helpText });
  }

  render() {
    const { AddressSelected } = this.props;
    const { bairro, endereco, helpText } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Dados do Imóvel</h4>

          <div className="row">
            <div className="p-col-12 p-md-6">
              <Field
                component={AutoComplete}
                label="Endereço"
                name="endereco.endereco"
                required
                validate={required}
                handleChange={this.handleAddressChange}
                onAddressBlur={this.onAddressBlur}
                helpText={helpText}
                {...this.props}
              />
              <div className="row">
                <div className="col-12">
                  <Field
                    component={InputText}
                    label="Complemento"
                    name="endereco.complemento"
                  />
                </div>
              </div>

              <Field
                component={InputText}
                label="Número do Contribuinte (IPTU)"
                name="endereco.numero_iptu"
              />

              <Field
                component={FileUpload}
                name="planta_fotos"
                id="planta_fotos"
                accept="file/pdf"
                className="form-control-file"
                label="Fotos / Planta Baixa"
                required
                validate={required}
                {...this.props}
              />
            </div>
            <div className="p-col-12 p-md-6">
              {AddressSelected && (
                <div>
                  <Card title="Endereço Selecionado">
                    <b>Endereço:</b> <span>{endereco.replace(', São Paulo, Brasil', '')}</span>
                    <br />
                    <b>Bairro:</b> <span>{bairro}</span>
                    <br />
                    <b>Cidade:</b> <span>São Paulo </span>
                    <b>Estado:</b> <span>SP</span>
                  </Card>

                  <Card title="Demanda da Região">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Grupo</th>
                          <th scope="col">Fila</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.grupo.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item[1]}</td>
                              <td>{this.state[item[0]]}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
