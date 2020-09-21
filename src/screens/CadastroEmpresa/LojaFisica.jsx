import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
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
  const [payload, setPayload] = useState({});
  const [erro, setErro] = useState(false);
  const [nome_fantasia, setNomeFantasia] = useState("");

  useEffect(() => {
    setTelefone(props.telefone);
    setEndereco(props.endereco);
    setCep(props.cep);
    setBairro(props.bairro);
    setCidade(props.cidade);
    setUf(props.uf);
    setNumero(props.numero);
    setComplemento(props.complemento);
    setNomeFantasia(props.nome_fantasia);
    setSite(props.site);
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
            const payload = populaPayload(data);
            setPayload({ ...payload });
            props.onUpdate(payload, props.chave);
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
              setPayload({ ...payload, nome_fantasia: valor });
              props.onUpdate({ ...payload, nome_fantasia: valor }, props.chave);
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
              setPayload({ ...payload, cep: valor });
              props.onUpdate(payload, props.chave);
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
              setPayload({ ...payload, bairro: valor });
              props.onUpdate(payload, props.chave);
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
              setPayload({ ...payload, endereco: valor });
              props.onUpdate({ ...payload, endereco: valor }, props.chave);
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
              setPayload({ ...payload, numero: valor });
              props.onUpdate(payload, props.chave);
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
              setPayload({ ...payload, complemento: valor });
              props.onUpdate(payload, props.chave);
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
              setPayload({ ...payload, cidade: valor });
              props.onUpdate({ ...payload, cidade: valor }, props.chave);
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
              setPayload({ ...payload, uf: valor });
              props.onUpdate({ ...payload, uf: valor }, props.chave);
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
              setPayload({ ...payload, telefone: valor });
              props.onUpdate({ ...payload, telefone: valor }, props.chave);
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
          console.log(valor);
          setSite(valor);
          setPayload({ ...payload, site: valor });
          props.onUpdate({ ...payload, site: valor }, props.chave);
        }}
      />
    </Fragment>
  );
};

export default LojaFisica;
