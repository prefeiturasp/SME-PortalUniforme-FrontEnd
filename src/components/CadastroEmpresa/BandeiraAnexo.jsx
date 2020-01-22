import React, { Fragment, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CheckInputLabel } from "components/Input/CheckInputLabel";
import { Field } from "redux-form";
import { FileUpload } from "components/Input/FileUpload";
import { required } from "helpers/fieldValidators";
import { getMeiosRecebimento } from "services/bandeiras.service";

const BandeiraAnexo = props => {
  const [bandeiras, setbandeiras] = useState([]);

  useEffect(() => {
    const carregaBandeiras = async () => {
      const bandeiras = await getMeiosRecebimento();
      setbandeiras(bandeiras);
    };
    carregaBandeiras();
  }, []);

  return (
    <Fragment>
      <Row className="py-2">
        <Col lg={6} xl={6}>
              <CheckMeioPagamento label="American Express" chave={1} />
              <CheckMeioPagamento label="Mastercard" chave={2} />
              <CheckMeioPagamento label="Visa" chave={3} />
        </Col>
      </Row>
      <hr />
      <Row className="py-2">
        <Col>
          <Field
            component={FileUpload}
            name="arquivos_anexos"
            id="anexos_loja"
            accept="file/pdf"
            className="form-control-file"
            label="Anexos / Documentos"
            required
            validate={required}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default BandeiraAnexo;

const CheckMeioPagamento = props => {
  return (
    <Fragment>
      <Field
        component={CheckInputLabel}
        label={props.label}
        name={`bandeira_${props.chave}`}
        type="checkbox"
      />
    </Fragment>
  );
};
