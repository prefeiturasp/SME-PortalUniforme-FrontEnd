import React from "react";
import logoPrefeitura from "img/logo-prefeitura.png";
import "./style.scss";

export const Rodape = (props) => {
    return (
      <div id="rodape">
        <div className="area-rodape text-white pt-4 footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-xs-12 d-flex align-center align-items-center">
                <img
                  src={logoPrefeitura}
                  alt="Prefeitura de SP"
                  className="img-fluid"
                />
              </div>
              <div className="governo-ul col-lg-3 col-xs-12 border-left mb-3 mb-lg-0">
                <p className="footer-title font-weight-bold mb-3">Secretaria Municipal de Educação</p>
                <p><i className="fa fa-map-marker" aria-hidden="true"></i> Rua Borges Lagoa, 1230<br />Vila Clementino<br />CEP: 04038-003</p>
                
              </div>

              <div className="col-lg-3 col-xs-12">
                <p className="footer-title font-weight-bold mb-3">Contatos</p>
                <p><i className="fa fa-phone" aria-hidden="true"></i> <a href="tel:156">156</a></p>
                <p>
                  <i className="fa fa-comment" aria-hidden="true"></i> 
                  <a className="ml-1" href="https://educacao.sme.prefeitura.sp.gov.br/lista-de-servidores-e-contatos/">Lista de Servidores e Contatos</a>
                </p>
                <ul className="list-unstyled mb-0 mt-0">
                  <li className="footer-title font-weight-bold mb-2">
                    Redes sociais
                  </li>
                  <ul className="list-inline pt-1 mb-2">
                    <li className="list-inline-item pr-1">
                      <a
                        className="text-white"
                        href="https://www.facebook.com/PrefSP/"
                      >
                        <img
                          src="https://educacao.sme.prefeitura.sp.gov.br/wp-content/uploads/2020/11/icon-facebook.png"
                          alt="Ir para Facebook da Secretaria Municipal de Educação de São Paulo"
                        />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        className="text-white" 
                        href="https://www.instagram.com/educaprefsp/">
							          <img 
                          src="https://educacao.sme.prefeitura.sp.gov.br/wp-content/uploads/2020/11/icon-insta.png" 
                          alt="Instagram" 
                          className="img-fluid"
                        />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        className="text-white"
                        href="https://www.youtube.com/user/prefeiturasaopaulo"
                      >
                        <img
                          src="https://educacao.sme.prefeitura.sp.gov.br/wp-content/uploads/2020/11/icon-youtube.png"
                          alt="Ir para YouTube da Secerataria Muncipal de Educação de São Paulo"
                        />
                      </a>
                    </li>
                  </ul>
                </ul>
              </div>

              <div className="cc col-sm-3 align-middle text-center">
                <p></p>
                <figure>
                  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt_BR">
                    <img
                      src="https://educacao.sme.prefeitura.sp.gov.br/wp-content/uploads/2019/07/by-nc-sa-2.png"
                      alt="Logotipo Creative Commons. Ir para um link externo da Página Inicial da Creative Commons que é uma organização mundial sem fins lucrativos
                           que permite o compartilhamento e a reutilização da criatividade e do conhecimento por meio do fornecimento de ferramentas gratuitas."
                    />
                  </a>
                  <p className="mt-2">
                    Esta obra está licenciada com uma Licença Creative Commons
						Atribuição-NãoComercial-CompartilhaIgual 4.0 Internacional{" "} 
                  </p>
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div class="subfooter endereco">
        	<div class="container">
        		<div class="row">
        			<div class="col-lg-10 col-xs-10 text-center">
        				<p>Prefeitura Municipal de São Paulo - Viaduto do Chá, 15 - Centro - CEP: 01002-020</p>
        			</div>
              <div className="col-lg-2 col-xs-2 text-center">
                {props["versao"]}
              </div>
        		</div>
        	</div>
        </div>
      </div>
      <script src="//api.handtalk.me/plugin/latest/handtalk.min.js"></script>
      <script>
          var ht = new HT({
              token: "aa1f4871439ba18dabef482aae5fd934"
           });
      </script>
    );
};
