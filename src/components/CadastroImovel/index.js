import React, { Component } from "react";
import { Form, reduxForm } from "redux-form";
import { Messages } from "primereact/messages";

import BasePage from "components/Base/BasePage";
import { Imovel as ImovelService } from "services/Imovel.service";

import { Proponente } from "./Proponente";
import { Proprietario } from "./Proprietario";
import { Imovel } from "./Imovel";

// Style PrimeReact
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../../styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ModalConfirmacaoCadastro } from "./components/ModalConfirmacaoCadastro";
import { toastError } from "components/Toast/dialogs";
import { getError } from "helpers/utils";
import { validarForm } from "./validate";

const ENTER = 13;

export class CadastroImovel extends Component {
  constructor() {
    super();
    this.state = {
      imageFile: [],
      AddressSelected: false,
      endereco: "",
      bairro: "",
      latitude: "",
      longitude: "",
      selectCEP: [],
      cep: "",
      numero: "",
      resetarFile: false,
      protocolo: null,
      showModal: false,
      labelBotao: "Enviar"
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.setAddressSelected = this.setAddressSelected.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setResetarFileFalse = this.setResetarFileFalse.bind(this);
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  onSubmit(values) {
    const erro = validarForm(values);
    if (erro) {
      toastError(erro);
    } else {
      values.endereco.endereco = this.state.endereco;
      values.endereco.cep = this.state.cep;
      values.endereco.bairro = this.state.bairro;
      values.endereco.numero = this.state.numero;
      values.endereco.longitude = this.state.longitude;
      values.endereco.latitude = this.state.latitude;
      values.contato.telefone = values.contato.telefone.replace("_", "");
      if (values.proponente && values.proponente.telefone) {
        values.proponente.telefone = values.proponente.telefone.replace(
          "_",
          ""
        );
      }
      values["endereco"] = { ...values.endereco };
      this.setState({ labelBotao: "Aguarde..." });
      ImovelService.create(values)
        .then(resp => {
          if (resp.status === 201) {
            this.resetForm();
            this.setState({
              showModal: true,
              protocolo: resp.data.protocolo,
              labelBotao: "Enviar"
            });
          } else if (resp.status === 400) {
            toastError(getError(resp.data));
            this.setState({ labelBotao: "Enviar" });
          } else if (resp.status === 413) {
            toastError("O tamanho total máximo dos arquivos é 10MB");
            this.setState({ labelBotao: "Enviar" });
          } else {
            toastError("Erro ao efetuar cadastro de Imóvel");
            this.setState({ labelBotao: "Enviar" });
          }
        })
        .catch(error => {
          toastError(getError(error));
          this.setState({ labelBotao: "Enviar" });
        });
    }
  }

  resetForm = () => {
    this.setState({
      AddressSelected: false,
      resetarFile: true
    });
    this.props.reset();
  };

  setResetarFileFalse() {
    this.setState({ resetarFile: false });
  }

  setAddressSelected(value, address) {
    this.setState({
      AddressSelected: value,
      cep: address.cep,
      bairro: address.bairro,
      numero: address.numero,
      endereco: address.endereco,
      latitude: address.latitude,
      longitude: address.longitude
    });
  }

  render() {
    const { labelBotao, protocolo, showModal } = this.state;
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <BasePage>
        <ModalConfirmacaoCadastro
          protocolo={protocolo}
          showModal={showModal}
          closeModal={this.closeModal}
        />
        <div id="conteudo" className="w-100 desenvolvimento-escolar">
          <div className="container pt-5 pb-5">
            <div className="row">
              <div className="col-12 mb-4">
                <h1>Cadastro de Oferta de Imóvel</h1>
              </div>
              <div className="col-12">
                <Messages ref={el => (this.messages = el)}></Messages>
              </div>
              <div className="col-12">
                <Form
                  onSubmit={handleSubmit(this.onSubmit)}
                  onKeyPress={this.onKeyPress}
                  className="row"
                >
                  {/* Proponente */}
                  <div className="p-col-12 p-md-6">
                    <Proponente />
                  </div>

                  {/* Proprietário */}
                  <div className="p-col-12 p-md-6">
                    <Proprietario />
                  </div>

                  {/* Imovel */}
                  <div className="p-col-12">
                    <Imovel
                      {...this.state}
                      setResetarFileFalse={this.setResetarFileFalse}
                      setAddressSelected={this.setAddressSelected}
                    />
                  </div>

                  {/* Botao */}
                  <div className="botoes">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      disabled={pristine || submitting}
                      onClick={this.resetForm}
                    >
                      Limpar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={
                        pristine || submitting || labelBotao === "Aguarde..."
                      }
                    >
                      {labelBotao}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </BasePage>
    );
  }
}

CadastroImovel = reduxForm({
  // a unique name for the form
  form: "CadastroImovelForm"
})(CadastroImovel);

export default CadastroImovel;
