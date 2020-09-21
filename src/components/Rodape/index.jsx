import React from "react";
import logoPrefeitura from "img/logo_sp.png";
import "./style.scss";

export const Rodape = (props) => {
  const selectHref = (value) => {
    window.location.href = value;
  };

  return (
    <div id="rodape">
      <div className="area-rodape text-white p-5">
        <div className="container">
          <div className="row">
            <div className="logo-prefeitura col-lg-2 col-xs-12 d-flex align-items-end mb-4 mb-lg-0">
              <img
                src={logoPrefeitura}
                alt="Prefeitura de SP"
                className="img-fluid"
              />
            </div>
            <div className="governo-ul col-lg-2 col-xs-12 border-left mb-4 mb-lg-0">
              <ul className="list-unstyled mb-0">
                <li className="text-uppercase font-weight-bold">
                  Governo Municipal
                </li>
              </ul>
              <ul className="list-unstyled mb-0 mt-0">
                <li>Prefeito Bruno Covas:</li>
                <li>
                  <a href="https://www.prefeitura.sp.gov.br/cidade/secretarias/comunicacao/organizacao/index.php?p=192554">
                    Equipe de Governo
                  </a>
                </li>
                <li>
                  <a href="https://www.prefeitura.sp.gov.br/cidade/secretarias/comunicacao/organizacao/index.php?p=192554">
                    Agenda do Prefeito
                  </a>
                </li>
                <li>
                  <a href="https://portal.sme.prefeitura.sp.gov.br/agenda/">
                    Agenda do Secretário
                  </a>
                </li>
                <li className="text-uppercase font-weight-bold pt-2">
                  Canais Oficiais <br /> da Prefeitura
                </li>
                <ul className="list-inline pt-1 mb-3">
                  <li className="list-inline-item pr-1">
                    <a
                      className="text-white"
                      href="https://www.facebook.com/PrefSP/"
                    >
                      <img
                        src="https://educacao.sme.prefeitura.sp.gov.br/wp-content/uploads/2019/09/icone-facebook-topo.png"
                        alt="Ir para Facebook da Secerataria Muncipal de Educação de São Paulo"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="text-white" href="https://twitter.com/prefsp">
                      <img
                        src="https://educacao.sme.prefeitura.sp.gov.br/wp-content/uploads/2019/09/icone-twitter-topo.png"
                        alt="Ir para Twitter da Secerataria Muncipal de Educação de São Paulo"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="text-white"
                      href="https://www.youtube.com/user/prefeiturasaopaulo"
                    >
                      <img
                        src="https://educacao.sme.prefeitura.sp.gov.br/wp-content/uploads/2019/09/icone-youtube-topo.png"
                        alt="Ir para YouTube da Secerataria Muncipal de Educação de São Paulo"
                      />
                    </a>
                  </li>
                </ul>
                <li>
                  <a href="http://www.docidadesp.imprensaoficial.com.br/">
                    <img
                      alt="Logo diário oficial"
                      src="https://educacao.sme.prefeitura.sp.gov.br/wp-content/uploads/2019/09/logotipo-diario-oficial.png"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-xs-12">
              <div className="form-group mb-2">
                <select
                  defaultValue={{ label: "Secretarias", value: null }}
                  onChange={(event) => selectHref(event.target.value)}
                  className="form-control fonte-doze rounded-pill text-secondary bg-transparent border border-secondary text-white"
                >
                  <option value="Secretarias">Secretarias</option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/assistencia_social">
                    Assistência Social
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/casa_civil/">
                    Casa Civil
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/comunicacao">
                    Comunicação (Especial)
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/controladoria_geral">
                    Controladoria Geral do Município
                  </option>
                  <option value="http://cultura.prefeitura.sp.gov.br">
                    Cultura
                  </option>
                  <option value="https://prefeitura.sp.gov.br/cidade/secretarias/desenvolvimento/">
                    Desenvolvimento Econômico
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/urbanismo/">
                    Desenvolvimento Urbano
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos">
                    Direitos Humanos e Cidadania
                  </option>
                  <option value="http://educacao.prefeitura.sp.gov.br">
                    Educação
                  </option>
                  <option value="http://esportes.prefeitura.sp.gov.br">
                    Esportes e Lazer
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/fazenda/">
                    Fazenda
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/gestao">
                    Gestão
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/governo">
                    Governo
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/habitacao">
                    Habitação
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/obras">
                    Infraestrutura e Obras
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/inovacao">
                    Inovaçãoe Tecnologia
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/justica/">
                    Justiça
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/licenciamento">
                    Licenciamento
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/transportes">
                    Mobilidade e Transportes
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/pessoa_com_deficiencia">
                    Pessoa com Deficiência
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/procuradoria_geral/">
                    Procuradoria Geral do Município
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/relacoes_internacionais">
                    Relações Internacionais
                  </option>
                  <option value="http://prefeitura.sp.gov.br/cidade/secretarias/relacoes_sociais/">
                    Relações Sociais (Especial)
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/saude">
                    Saúde
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/seguranca_urbana/">
                    Segurança Urbana
                  </option>
                  <option value="https://www.prefeitura.sp.gov.br/cidade/secretarias/subprefeituras/">
                    Subprefeitura
                  </option>
                  <option value="https://www.prefeitura.sp.gov.br/cidade/secretarias/turismo/">
                    Turismo
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente">
                    Verde e Meio Ambiente
                  </option>
                </select>
              </div>
              <div className="form-group mb-2">
                <select
                  defaultValue={{
                    label: "Prefeituras Regionais",
                    value: null,
                  }}
                  onChange={(event) => selectHref(event.target.value)}
                  className="form-control fonte-doze rounded-pill text-secondary bg-transparent border border-secondary text-white"
                >
                  <option value="Subprefeituras">Prefeituras Regionais</option>
                  <option value="http://aricanduva.prefeitura.sp.gov.br">
                    Aricanduva/V.Formosa
                  </option>
                  <option value="http://butanta.prefeitura.sp.gov.br">
                    Butantã
                  </option>
                  <option value="http://campolimpo.prefeitura.sp.gov.br">
                    Campo Limpo
                  </option>
                  <option value="http://capeladosocorro.prefeitura.sp.gov.br">
                    Capela do Socorro
                  </option>
                  <option value="http://casaverde.prefeitura.sp.gov.br/">
                    Casa Verde
                  </option>
                  <option value="http://cidadeademar.prefeitura.sp.gov.br">
                    Cidade Ademar
                  </option>
                  <option value="http://cidadetiradentes.prefeitura.sp.gov.br">
                    Cidade Tiradentes
                  </option>
                  <option value="http://ermelinomatarazzo.prefeitura.sp.gov.br">
                    Ermelino Matarazzo
                  </option>
                  <option value="http://freguesia.prefeitura.sp.gov.br">
                    Freguesia do Ó/Brasilândia
                  </option>
                  <option value="http://guaianases.prefeitura.sp.gov.br">
                    Guaianases
                  </option>
                  <option value="http://ipiranga.prefeitura.sp.gov.br">
                    Ipiranga
                  </option>
                  <option value="http://itaimpaulista.prefeitura.sp.gov.br">
                    Itaim Paulista
                  </option>
                  <option value="http://itaquera.prefeitura.sp.gov.br">
                    Itaquera
                  </option>
                  <option value="http://jabaquara.prefeitura.sp.gov.br">
                    Jabaquara
                  </option>
                  <option value="http://jacana-tremembe.prefeitura.sp.gov.br">
                    Jaçanã/Tremembé
                  </option>
                  <option value="http://lapa.prefeitura.sp.gov.br">Lapa</option>
                  <option value="http://mboimirim.prefeitura.sp.gov.br">
                    M Boi Mirim
                  </option>
                  <option value="http://mooca.prefeitura.sp.gov.br">
                    Mooca
                  </option>
                  <option value="http://parelheiros.prefeitura.sp.gov.br">
                    Parelheiros
                  </option>
                  <option value="http://penha.prefeitura.sp.gov.br">
                    Penha
                  </option>
                  <option value="http://perus.prefeitura.sp.gov.br">
                    Perus
                  </option>
                  <option value="http://pinheiros.prefeitura.sp.gov.br">
                    Pinheiros
                  </option>
                  <option value="http://pirituba.prefeitura.sp.gov.br">
                    Pirituba/Jaraguá
                  </option>
                  <option value="http://santana-tucuruvi.prefeitura.sp.gov.br">
                    Santana/Tucuruvi
                  </option>
                  <option value="http://santoamaro.prefeitura.sp.gov.br">
                    Santo Amaro
                  </option>
                  <option value="http://saomateus.prefeitura.sp.gov.br">
                    São Mateus
                  </option>
                  <option value="http://saomiguel.prefeitura.sp.gov.br">
                    São Miguel
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/regionais/sapopemba/">
                    Sapopemba
                  </option>
                  <option value="http://se.prefeitura.sp.gov.br/">Sé</option>
                  <option value="http://vilamaria-vilaguilherme.prefeitura.sp.gov.br">
                    V.Maria/V.Guilherme
                  </option>
                  <option value="http://vilamariana.prefeitura.sp.gov.br">
                    Vila Mariana
                  </option>
                  <option value="http://vilaprudente.prefeitura.sp.gov.br">
                    Vila Prudente
                  </option>
                </select>
              </div>
              <div className="form-group mb-0">
                <select
                  defaultValue={{ label: "Outros órgãos", value: "" }}
                  onChange={(event) => selectHref(event.target.value)}
                  className="form-control fonte-doze rounded-pill text-secondary bg-transparent border border-secondary text-white"
                >
                  <option value="Orgaos">Outros órgãos</option>
                  <option value="http://www.prefeitura.sp.gov.br/ahm">
                    Autarquia Hospitalar do Município de São Paulo - AHMSP
                  </option>
                  <option value="http://www.cgesp.org/">
                    Centro de Gerenciamento de Emergências - CGE
                  </option>
                  <option value="http://cohab.sp.gov.br/">
                    COHAB - Cia Metropolitana de Habitação de São Paulo
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/licenciamentos/colegiados/index.php?p=148608">
                    Comissão de Avaliação de Empreendimentos Habitacionais de
                    Interesse Social –CAEHIS
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/licenciamentos/colegiados/index.php?p=148605">
                    Comissão de Edificações e Uso do Solo - CEUSO
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/orgaos_colegiados/index.php?p=204">
                    Comissão Municipal de Direitos Humanos
                  </option>
                  <option value="http://www.cetsp.com.br/">
                    Companhia de Engenharia de Trafégo - CET
                  </option>
                  <option value="http://transparencia.prefeitura.sp.gov.br/admindireta/empresas/Paginas/SPSEC.aspx">
                    Companhia Paulista de Securitização - SPSEC
                  </option>
                  <option value="http://conselhodacidade.prefeitura.sp.gov.br/">
                    Conselho da Cidade de São Paulo
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/pessoa_com_deficiencia/conselho/">
                    Conselho Municipal da Pessoa com Deficiência - CMPD
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/assistencia_social/comas/">
                    Conselho Municipal de Assistência Social - COMAS
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/lgbt/conselho/index.php?p=150958">
                    Conselho Municipal de Atenção à Diversidade Sexual
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/habitacao/organizacao/cmh/index.php?p=139">
                    Conselho Municipal de Habitação - CMH
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/desenvolvimento_urbano/cmpu/index.php?p=144874">
                    Conselho Municipal de Política Urbana – CMPU
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/saude/conselho_municipal/">
                    Conselho Municipal de Saúde - CMS
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/planejamento/cmi/">
                    Conselho Municipal de Tecnologia de Informação e Comunicação
                    - CMTIC
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/financas/institucional/index.php?p=3182">
                    Conselho Municipal de Tributos - CMT
                  </option>
                  <option value="http://www.cidadedesaopaulo.com/comtur/">
                    Conselho Municipal de Turismo - COMTUR
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente/cades/index.php?p=3250">
                    Conselho Municipal do Meio Ambiente e Desenvolvimento
                    Sustentável - CADES
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/juventude/conselho/index.php?p=149694">
                    Conselho Municipal dos Direitos da Juventude
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/direito_a_memoria_e_a_verdade/">
                    Coordenação de Direito à Memória e à Verdade
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/edh/">
                    Coordenação de Política sobre Drogas
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/poprua/">
                    Coordenação de Políticas para a População em Situação de Rua
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/criancas_e_adolescentes/">
                    Coordenação de Políticas para Crianças e Adolescentes
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/idosos/">
                    Coordenação de Políticas para Idosos
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/juventude/">
                    Coordenação de Políticas para Juventude
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/lgbt/">
                    Coordenação de Políticas para LGBT
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/migrantes/">
                    Coordenação de Políticas para Migrantes
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/inovacao/prodam/">
                    Empresa de Tecnologia da Informação e Comunicação do
                    Município de São Paulo - PRODAM
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/trabalho/fundacao_paulistana/apresentacao/index.php?p=25342">
                    Fundação Paulistana de Educação e Tecnologia
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/cultura/noticias/?p=9064">
                    Fundação Theatro Municipal de São Paulo
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/direitos_humanos/idosos/conselho/">
                    Grande Conselho Municipal do Idoso
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/seguranca_urbana/guarda_civil/">
                    Guarda Municipal Metropolitana - GCM
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/saude/hospital_do_servidor_publico_municipal/">
                    Hospital do Servidor Público Municipal - HSPM
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/saude/hospital_municipal_infantil_menino_jesus/">
                    Hospital Municipal Infantil Menino Jesus - HMIMJ
                  </option>
                  <option value="http://www.spnegocios.com/">
                    São Paulo Negócios - SP Negócios
                  </option>
                  <option value="http://www.spobras.sp.gov.br/">
                    São Paulo Obras - SPObras
                  </option>
                  <option value="http://www.sptrans.com.br/">
                    São Paulo Transportes - SPTrans
                  </option>
                  <option value="http://www.cidadedesaopaulo.com/">
                    São Paulo Turismo - SPTuris
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/urbanismo/sp_urbanismo/">
                    São Paulo Urbanismo - SPUrbanismo
                  </option>
                  <option value="http://www.prefeitura.sp.gov.br/cidade/secretarias/trabalho/abastecimento/">
                    Supervisão Geral de Abastecimento - SGA
                  </option>
                </select>
              </div>
            </div>
            <div className="cc col-lg-3">
              <figure>
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt_BR">
                  <img
                    src="https://educacao.sme.prefeitura.sp.gov.br/wp-content/uploads/2019/07/by-nc-sa-2.png"
                    alt="Copyright"
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
      <div className="endereco container">
        <div className="row">
          <div className="col-lg-10 col-xs-10 text-center mt-2">
            SECRETARIA MUNICIPAL DE EDUCAÇÃO — Rua Borges Lagoa, 1230 — Vila
            Clementino — CEP: 04038-003
          </div>
          <div className="col-lg-2 col-xs-2 text-center mt-2">
            {props["versao"]}
          </div>
        </div>
      </div>
    </div>
  );
};
