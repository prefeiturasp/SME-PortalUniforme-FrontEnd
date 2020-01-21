import React, { Fragment, useState, useEffect } from "react";
import { AutoComplete } from "components/Input/AutoComplete";
import InputMask from "react-input-mask";
import { Form, Row, Col } from "react-bootstrap";
import {
  InputLabelRequired,
  InputLabel
} from "components/Input/InputLabelRequired";
import InputLabelRequiredMask from "components/Input/InputLabelRequiredMask";
import axios from "axios";

const LojaFisica = props => {
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [payload, setPayload] = useState({});

  useEffect(() => {
    setTelefone(props.telefone);
    setEndereco(props.endereco);
  }, [props]);

  const buscaCep = async value => {
    if (value) {
      setCep(value);
      let cep = value.replace("-", "").replace("_", "");
      if (cep.length === 8) {
        const data = await cepServico(cep);
        if (data !== null) {
          const payload = populaPayload(data);
          setPayload({ ...payload });
          props.onUpdate(payload, props.chave);
        }
      }
    }
  };

  const cepServico = async cep => {
    const response = await axios.get(
      `http://republicavirtual.com.br/web_cep.php?cep=${cep}&formato=jsonp`
    );
    if (response.statusText == "OK") {
      const data = response.data;
      if (data.resultado === "1") {
        return data;
      }
    }
    return null;
  };

  const populaPayload = data => {
    setEndereco(`${data.tipo_logradouro} ${data.logradouro}`);
    setBairro(data.bairro);
    setCidade(data.cidade);
    setUf(data.uf);
    return {
      endereco: `${data.tipo_logradouro} ${data.logradouro}`,
      cidade: data.cidade,
      uf: data.uf,
      bairro: data.bairro,
      cep: cep
    };
  };

  return (
    <Fragment>
      <Row>
        <Col lg={6} xl={6}>
          <InputLabelRequiredMask
            autocomplete="off"
            mask="99999-999"
            label="CEP"
            placeholder="00100-000"
            className="form-control mb-2"
            value={cep}
            key={props.chave}
            onBlur={e => buscaCep(e.target.value)}
            onChange={e => {
              const valor = e.target.value;
              setCep(valor);
              setPayload({ ...payload, cep: valor });
              props.onUpdate(payload, props.chave);
            }}
            required
          />
        </Col>
        <Col lg={6} xl={6}>
          <InputLabelRequired
            value={bairro}
            placeholder="Centro"
            label="Bairro"
            onChange={e => {
              const valor = e.target.value;
              setBairro(valor);
              setPayload({ ...payload, bairro: valor });
              props.onUpdate(payload, props.chave);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputLabelRequired
            label="Endereço"
            placeholder="Linha única para logradouro, número e complemento"
            name={`loja.endereco_${props.chave}`}
            value={endereco}
            onChange={e => {
              const valor = e.target.value;
              setEndereco(valor);
              setPayload({ ...payload, endereco: valor });
              props.onUpdate({ ...payload, endereco: valor }, props.chave);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} xl={6}>
          <InputLabelRequired
            value={numero}
            placeholder="1000"
            label="Número"
            onChange={e => {
              const valor = e.target.value;
              setNumero(valor);
              setPayload({ ...payload, numero: valor });
              props.onUpdate(payload, props.chave);
            }}
          />
        </Col>
        <Col lg={6} xl={6}>
          <InputLabel
            value={complemento}
            placeholder="5° Andar Bloco B"
            label="Complemento"
            onChange={e => {
              const valor = e.target.value;
              setComplemento(valor);
              setPayload({ ...payload, complemento: valor });
              props.onUpdate(payload, props.chave);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} xl={6}>
          <InputLabelRequired
            autocomplete="off"
            label="Cidade"
            value={cidade}
            placeholder="São Paulo"
            className="form-control mb-2"
            required
            onChange={e => {
              const valor = e.target.value;
              setCidade(valor);
              setPayload({ ...payload, cidade: valor });
              props.onUpdate({ ...payload, cidade: valor }, props.chave);
            }}
          />
        </Col>
        <Col lg={6} xl={6}>
          <InputLabelRequired
            label="UF"
            name=""
            value={uf}
            placeholder="SP"
            className="form-control mb-2"
            required
            onChange={e => {
              const valor = e.target.value;
              setUf(valor);
              setPayload({ ...payload, uf: valor });
              props.onUpdate({ ...payload, uf: valor }, props.chave);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputLabelRequiredMask
            Autocomplete="off"
            mask="(99) 9999-9999"
            label="Telefone"
            value={telefone}
            placeholder="(11) 5555-6666"
            className="form-control mb-2"
            required
            key={props.chave}
            onChange={e => {
              const valor = e.target.value;
              setTelefone(valor);
              setPayload({ ...payload, telefone: valor });
              props.onUpdate({ ...payload, telefone: valor }, props.chave);
            }}
          />
        </Col>
      </Row>
      <hr />
    </Fragment>
  );
};

export default LojaFisica;
