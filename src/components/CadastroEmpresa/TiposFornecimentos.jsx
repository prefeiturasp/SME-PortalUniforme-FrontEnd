import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CheckInputLabel } from "components/Input/CheckInputLabel";
import TipoFornecimento from "./TipoFornecimento";
import { getLimites } from "services/uniformes.service";

const TiposFornecimentos = props => {
  const initialUniformesInfo = props.tipo.uniformes.map(uniforme => ({
    id: uniforme.id,
    preco: "",
    total: 0
  }));
  const [uniformesInfo, setUniformesInfo] = useState(initialUniformesInfo);
  const [requerido, setRequerido] = useState(false);
  const [desabilitado, setDesabilitado] = useState(true);
  const [checado, setChecado] = useState(false);
  const [limite, setLimite] = useState(0);

  useEffect(() => {
    const carregaLimite = async () => {
      const limites = await getLimites();
      const limite = limites.filter(
        value => value.categoria_uniforme === props.tipo.id
      );
      setLimite(parseFloat(limite[0].preco_maximo));
    };
    carregaLimite();
  });

  const checkProduto = event => {
    if (event) {
      setDesabilitado(false);
      setRequerido(true);
      setChecado(true);
    } else {
      setChecado(false);
      setDesabilitado(true);
      setRequerido(false);
      limpaPrecos();
      delUniforme();
    }
  };

  const delUniforme = () => {
    uniformesInfo.forEach(element => {
      props.onUpdate({}, element.id);
    });
  };

  const limpaPrecos = () => {
    setUniformesInfo(initialUniformesInfo);
  };

  const addValor = (valor, quantidade, key, index) => {
    let uniInfos = uniformesInfo;
    let total = valor
      ? parseFloat((quantidade * parseFloat(valor)).toFixed(2))
      : 0;
    uniInfos[key].preco = valor;
    uniInfos[key].total = total;
    setUniformesInfo(uniInfos);
    props.onUpdate(
      { uniforme: uniInfos[key].id, preco: uniInfos[key].preco },
      index
    );
  };

  const getSum = (total, num) => {
    return total + num;
  };

  const sum = prices => {
    return prices.reduce(getSum, 0);
  };

  const maiorQueLimite = soma => {
    const eMaior = soma > limite;
    props.maiorQueLimite(eMaior);
    return eMaior;
  };

  return (
    <div className="pt-3">
      <CheckInputLabel
        id={props.tipo.id}
        label={props.tipo.nome}
        key={props.tipo.id}
        type="checkbox"
        onChange={e => checkProduto(e.target.checked)}
        checked={checado}
      />
      {props.tipo.uniformes.map((uniforme, key) => {
        return (
          <TipoFornecimento
            produto={uniforme.nome}
            uniforme={uniforme}
            index={uniforme.id}
            chave={key}
            key={key}
            desabilitado={desabilitado}
            valor={uniformesInfo[key].preco}
            addValor={addValor}
            total={uniformesInfo[key].total}
            requerido={requerido}
            checkProduto={checkProduto}
            onUpdate={props.onUpdate}
          />
        );
      })}
      <Row>
        <Col sm={{ span: 4, offset: 4 }}>
          <div class="float-right">
            <strong>TOTAL</strong>
          </div>
        </Col>
        <Col sm={4} className="text-right">
          <strong>R$</strong> {sum(uniformesInfo.map(item => item.total))}
          <Form.Text className="text-danger">
            {maiorQueLimite(sum(uniformesInfo.map(item => item.total)))
              ? `Valor maior que limite: ${limite}`
              : ""}
          </Form.Text>
        </Col>
      </Row>
      <br />
    </div>
  );
};

export default TiposFornecimentos;
