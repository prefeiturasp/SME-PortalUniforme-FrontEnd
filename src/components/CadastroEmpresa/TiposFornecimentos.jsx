import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { InputLabelInLine } from "components/Input/InputLabelInLine";
import { CheckInputLabel } from "components/Input/CheckInputLabel";
import TipoFornecimento from "./TipoFornecimento";


const TiposFornecimentos = props => {
    return (
        <Fragment>
            <Row>
                <Col>
                    <CheckInputLabel 
                        label={props.tipo.nome}
                        type="checkbox"
                    />
                    {props.tipo.uniformes.map((uniforme, key) => {
                        return (
                            <TipoFornecimento
                              produto={uniforme.nome}
                              index={uniforme.id}
                              chave={key}
                            //   onUpdate={onUpdateUniforme}
                            //   limpar={limparFornecimento}
                            //   setLimpar={setLimparFornecimento}
                            />
                          );
                    })}
                </Col>
            </Row>
        </Fragment>
    )
}


export default TiposFornecimentos;