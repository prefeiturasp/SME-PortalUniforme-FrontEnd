import React, { Fragment, useEffect } from "react";
import { Col } from "react-bootstrap";
import { CheckInputLabel } from "components/Input/CheckInputLabel";

const BandeiraAnexo = props => {
  useEffect(() => {}, [props]);

  const addBandeira = event => {
    if (event) {
      props.onUpdate(props.valor);
    }else{
      props.onRemove(props.valor)
    }
  };

  return (
    <Fragment>
      <Col lg={6} xl={6}>
        <CheckInputLabel
          label={props.label}
          name={props.chave}
          type="checkbox"
          onChange={e => addBandeira(e.target.checked)}
        />
      </Col>
    </Fragment>
  );
};

export default BandeiraAnexo;
