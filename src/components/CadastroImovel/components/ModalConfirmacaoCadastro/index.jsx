import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export class ModalConfirmacaoCadastro extends Component {
  render() {
    const { showModal, closeModal, protocolo } = this.props;
    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Imóvel cadastrado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            O número do seu protocolo é {protocolo}. Você receberá um e-mail com
            informações.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary pl-4 pr-4" onClick={closeModal}>
            OK
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
