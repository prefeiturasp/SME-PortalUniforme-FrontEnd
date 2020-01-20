import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdjust, faTextHeight} from "@fortawesome/free-solid-svg-icons";
import {faFacebookSquare, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";
import "./menu-acessibilidade.scss";

class MenuAcessibilidade extends React.Component {

    render() {
        const {
            alterarFonte,
            alterarContraste,
            focusBusca,
        } = this.props;
        return (
            <div>
                <div className="header-acessibilidade">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <ul className="list-inline mt-3">
                                    <li className="list-inline-item">
                                        <a href="#conteudo">
                                            Ir ao Conteúdo<span className="span-accesskey">1</span>{" "}
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#menu-principal">
                                            Ir para menu principal
                                            <span className="span-accesskey">2</span>{" "}
                                        </a>
                                    </li>
                                    <li onClick={focusBusca} className="list-inline-item">
                                        <a href="#busca">
                                            Ir para a busca<span className="span-accesskey">3</span>{" "}
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#rodape">
                                            Ir para o rodapé
                                            <span className="span-accesskey">4</span>{" "}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6 text-right">
                                <ul className="list-inline mt-3">
                                    <li className="list-inline-item">
                                        <a href="https://educacao.sme.prefeitura.sp.gov.br/acessibilidade/">
                                            Acessibilidade<span className="span-accesskey">5</span>{" "}
                                        </a>
                                    </li>
                                    <li onClick={alterarContraste} className="list-inline-item">
                                        Alternar Alto Contraste
                                        <FontAwesomeIcon icon={faAdjust}/>
                                    </li>
                                    <li onClick={alterarFonte} className="list-inline-item">
                                        Alternar Tamanho da Fonte
                                        <FontAwesomeIcon icon={faTextHeight}/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pref-menu">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-xs-12 d-flex justify-content-lg-start justify-content-center">
                                <ul className="list-inline mt-3">
                                    <li className="list-inline-item">
                                        <a href="http://transparencia.prefeitura.sp.gov.br/acesso-a-informacao">
                                            Acesso à informação e-sic
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="https://www.prefeitura.sp.gov.br/cidade/secretarias/ouvidoria/fale_com_a_ouvidoria/index.php?p=464">
                                            Ouvidoria
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="http://dados.prefeitura.sp.gov.br/organization/educacao1">
                                            Portal da Transparência
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="https://sp156.prefeitura.sp.gov.br/portal/servicos">
                                            SP 156
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-6 col-xs-12 d-flex justify-content-lg-end justify-content-center">
                                <ul className="list-inline my-auto">
                                    <li className="list-inline-item">
                                        <a
                                            href="https://pt-br.facebook.com/EducaPrefSP/"
                                        >
                                            <FontAwesomeIcon size="2x" icon={faFacebookSquare}/>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a
                                            href="https://www.instagram.com/educaprefsp/"
                                        >
                                            <FontAwesomeIcon size="2x" icon={faInstagram}/>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a
                                            href="https://twitter.com/EducaPrefSP"
                                        >
                                            <FontAwesomeIcon size="2x" icon={faTwitter}/>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a
                                            href="https://www.youtube.com/c/EducaPrefSP"
                                        >
                                            <FontAwesomeIcon size="2x" icon={faYoutube}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }


}

export default MenuAcessibilidade