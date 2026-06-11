import axios from "axios";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import {
  InputLabelRequired,
  InputLabel,
} from "components/Input/InputLabelRequired";
import InputLabelRequiredMask from "components/Input/InputLabelRequiredMask";
const LojaFisica = (props) => {
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [site, setSite] = useState("");
  const payloadRef = useRef({});
  const [erro, setErro] = useState(false);
  const [nome_fantasia, setNomeFantasia] = useState("");

  useEffect(() => {
    if (props.telefone != null) setTelefone(props.telefone);
    if (props.endereco != null) setEndereco(props.endereco);
    if (props.cep != null) setCep(props.cep);
    if (props.bairro != null) setBairro(props.bairro);
    if (props.cidade != null) setCidade(props.cidade);
    if (props.uf != null) setUf(props.uf);
    if (props.numero != null) setNumero(props.numero);
    if (props.complemento != null) setComplemento(props.complemento);
    if (props.nome_fantasia != null) setNomeFantasia(props.nome_fantasia);
    if (props.site != null) setSite(props.site);
  }, [props]);

  const buscaCep = async (value) => {
    setErro(false);
    if (value) {
      let cep = value.replace("-", "").replace("_", "");
      if (cep.length === 8) {
        const data = await cepServico(cep);
        if (data !== null) {
          data["cep"] = value;
          if (data.cidade !== "São Paulo" || data.uf !== "SP") {
            setErro(true);
          } else {
            const novo = populaPayload(data);
            payloadRef.current = novo;
            props.onUpdate(novo, props.chave);
          }
        }
      }
    }
  };

  const cepServico = async (cep) => {
    const response = await axios.get(
      `https://republicavirtual.com.br/web_cep.php?cep=${cep}&formato=jsonp`
    );

    if (response.status === 200) {
      const data = response.data;
      if (data.resultado === "1") {
        return data;
      }
    }
    return null;
  };

  const populaPayload = (data) => {
    setEndereco(`${data.tipo_logradouro} ${data.logradouro}`);
    setBairro(data.bairro);
    setCidade(data.cidade);
    setUf(data.uf);
    setCep(data.cep);

    return {
      endereco: `${data.tipo_logradouro} ${data.logradouro}`,
      cidade: data.cidade,
      uf: data.uf,
      bairro: data.bairro,
      cep: data.cep,
      nome_fantasia: nome_fantasia,
      numero: numero,
      complemento: complemento,
      telefone: telefone,
      site: site,
    };
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <InputLabelRequired
            autoComplete="off"
            disabled={props.empresa}
            label="Nome Fantasia"
            placeholder="Nome fantasia da loja"
            name={`loja.nome_fantasia_${props.chave}`}
            id={`loja.nome_fantasia_${props.chave}`}
            value={nome_fantasia}
            onChange={(e) => {
              const valor = e.target.value;
              setNomeFantasia(valor);
              payloadRef.current = { ...payloadRef.current, nome_fantasia: valor };
              props.onUpdate({ ...payloadRef.current }, props.chave);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} xl={6}>
          <InputLabelRequiredMask
            autoComplete="off"
            disabled={props.empresa}
            mask="99999-999"
            label="CEP"
            placeholder="xxxxx-xxx"
            className={
              erro ? "form-control mb-2 is-invalid" : "form-control mb-2"
            }
            value={cep}
            key={props.chave}
            onBlur={(e) => buscaCep(e.target.value)}
            onChange={(e) => {
              const valor = e.target.value;
              setCep(valor);
              payloadRef.current = { ...payloadRef.current, cep: valor };
              props.onUpdate({ ...payloadRef.current }, props.chave);
            }}
            erro={erro}
            mensagem="A loja precisa estar em São Paulo-SP"
            required
          />
          <div className="valid-feedback">Deve ser São Paulo</div>
        </Col>
        <Col lg={6} xl={6}>
          <InputLabelRequired
            autoComplete="off"
            disabled={props.empresa}
            value={bairro}
            label="Bairro"
            id={`bairro_${props.chave}`}
            onChange={(e) => {
              const valor = e.target.value;
              setBairro(valor);
              payloadRef.current = { ...payloadRef.current, bairro: valor };
              props.onUpdate({ ...payloadRef.current }, props.chave);
            }}
          />
        </Col>
      </Row>
      <div className="row">
        <div className="col-md-6 col-xs-5">
          <InputLabelRequired
            autoComplete="off"
            disabled={props.empresa}
            label="Endereço"
            placeholder="Digite o logradouro"
            name={`loja.endereco_${props.chave}`}
            id={`loja.endereco_${props.chave}`}
            value={endereco}
            onChange={(e) => {
              const valor = e.target.value;
              setEndereco(valor);
              payloadRef.current = { ...payloadRef.current, endereco: valor };
              props.onUpdate({ ...payloadRef.current }, props.chave);
            }}
          />
        </div>
        <div className="col-md-2 col-xs-6">
          <InputLabelRequired
            autoComplete="off"
            disabled={props.empresa}
            value={numero}
            label="Número"
            id={`numero_${props.chave}`}
            onChange={(e) => {
              const valor = e.target.value;
              setNumero(valor);
              payloadRef.current = { ...payloadRef.current, numero: valor };
              props.onUpdate({ ...payloadRef.current }, props.chave);
            }}
          />
        </div>
        <div className="col-md-4 col-xs-6">
          <InputLabel
            value={complemento}
            label="Complemento"
            disabled={props.empresa}
            id={`complemento_${props.chave}`}
            onChange={(e) => {
              const valor = e.target.value;
              setComplemento(valor);
              payloadRef.current = { ...payloadRef.current, complemento: valor };
              props.onUpdate({ ...payloadRef.current }, props.chave);
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-xs-4">
          <InputLabelRequired
            autoComplete="off"
            label="Cidade"
            value={cidade}
            id={`cidade_${props.chave}`}
            placeholder="São Paulo"
            className="form-control mb-2"
            required
            disabled
            onChange={(e) => {
              const valor = "São Paulo";
              setCidade(valor);
              payloadRef.current = { ...payloadRef.current, cidade: valor };
              props.onUpdate({ ...payloadRef.current }, props.chave);
            }}
          />
        </div>
        <div className="col-md-2 col-xs-3">
          <InputLabelRequired
            label="UF"
            name=""
            value={uf}
            placeholder="SP"
            className="form-control mb-2"
            required
            maxLength={2}
            disabled
            onChange={(e) => {
              const valor = "SP";
              setUf(valor);
              payloadRef.current = { ...payloadRef.current, uf: valor };
              props.onUpdate({ ...payloadRef.current }, props.chave);
            }}
          />
        </div>
        <div className="col-md-4 col-xs-3">
          <InputLabelRequiredMask
            autoComplete="off"
            mask="(99) 9999-99999"
            label="Telefone"
            disabled={props.empresa}
            value={telefone}
            id={`telefone_${props.chave}`}
            placeholder="Fixo ou celular"
            className="form-control mb-2"
            required
            key={props.chave}
            onChange={(e) => {
              const valor = e.target.value.replace("_", "");
              setTelefone(valor);
              payloadRef.current = { ...payloadRef.current, telefone: valor };
              props.onUpdate({ ...payloadRef.current }, props.chave);
            }}
          />
        </div>
      </div>
      <InputLabel
        label="Site"
        value={site}
        disabled={props.empresa}
        id={`site_${props.chave}`}
            onChange={(e) => {
              const valor = e.target.value;
              setSite(valor);
              payloadRef.current = { ...payloadRef.current, site: valor };
              props.onUpdate({ ...payloadRef.current }, props.chave);
            }}
      />
    </Fragment>
  );
};

export default LojaFisica;
