import React, { Component } from "react";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { withRouter } from "react-router-dom";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import BlocoTexto from "components/BlocoTexto";
import imgPecasUniforme from "img/pecas-uniforme.png";
import imgEMEFJogosTabuleiro from "img/emef_jogos_tabuleiro.jpg";
import { getUniformes } from "services/uniformes.service";
import { AutoComplete } from "components/Input/AutoComplete";
import { required } from "helpers/fieldValidators";
import { BannerConsultaCadastro } from "components/BannerConsultaCadastro" 
import { formatarParaMultiselect } from "./helper";
import "./style.scss";
import { toastWarn } from "components/Toast/dialogs";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";

export class ProcurarFornecedores extends Component {
  constructor() {
    super();
    this.state = {
      uniformes: [],
      tipoUniformeSelecionados: [],
      latitude: null,
      longitude: null,
      endereco: null,
    };
  }

  async componentDidMount() {
    const uniformes = await getUniformes();
    this.setState({ uniformes });
  }

  onSelectedChanged = (tipoUniformeSelecionados) => {
    this.setState({
      tipoUniformeSelecionados,
    });
  };

  consultarEndereco = () => {
    const {
      endereco,
      tipoUniformeSelecionados,
      latitude,
      longitude,
    } = this.state;
    if (!latitude || !longitude) {
      toastWarn("Selecione um dos resultados de endereço para buscar");
    } else if (tipoUniformeSelecionados.length === 0) {
      toastWarn("Selecione ao menos um tipo de uniforme");
    } else {
      this.props.history.push({
        pathname: "/mapa-de-fornecedores",
        state: {
          latitude: latitude,
          longitude: longitude,
          tipoUniformeSelecionados: tipoUniformeSelecionados,
          endereco: endereco.split(",")[0],
        },
      });
    }
  };

  handleAddressChange = (values) => {
    this.setState({
      latitude: values.latitude,
      longitude: values.longitude,
      endereco: values.endereco,
    });
  };

  render() {
    const { uniformes, tipoUniformeSelecionados } = this.state;
    return (
      <PaginaComCabecalhoRodape>
        <BannerConsultaCadastro/> 
        <div className="busca-mapa">
          <div className="title">
            Encontre a loja credenciada mais próxima de você
          </div>
          <div className="subtitle">
            Para encontrar as lojas fornecedoras dos uniformes mais próximas a
            você, basta informar <br /> abaixo seu endereço e quais itens do
            uniforme você procura.
          </div>
          <form>
            <div className="row pt-5">
              <div className="field-endereco col-sm-12 offset-md-3 col-md-3">
                <Field
                  component={AutoComplete}
                  label="Escreva o logradouro e número que você quer consultar *"
                  name="endereco.endereco"
                  required
                  validate={required}
                  esconderAsterisco
                  handleChange={this.handleAddressChange}
                  {...this.props}
                />
              </div>
              <div className="field-uniforme col-sm-12 col-md-2">
                <label htmlFor={"tipo_uniforme"} className={`multiselect`}>
                  Selecione itens do uniforme *
                </label>
                <Field
                  component={StatefulMultiSelect}
                  name="tipo_uniforme"
                  selected={tipoUniformeSelecionados}
                  options={formatarParaMultiselect(uniformes)}
                  onSelectedChanged={(values) => this.onSelectedChanged(values)}
                  disableSearch={true}
                  overrideStrings={{
                    selectSomeItems: "Selecione",
                    allItemsAreSelected: "Todos os itens estão selecionados",
                    selectAll: "Todos",
                  }}
                />
              </div>
              <div className="btn-consultar text-center col-md-2 col-sm-12">
                <button
                  size="lg"
                  type="button"
                  className="btn btn-light pl-4 pr-4"
                  onClick={() => this.consultarEndereco()}
                >
                  <strong>Consultar</strong>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div id="conteudo" className="w-100 home">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-6">
                <BlocoTexto title="Por que o modelo de compra de uniforme mudou?">
                  <div className="justify-content-lg-end justify-content-center">
                    O uniforme escolar, em geral, era comprado de forma
                    centralizada pela Prefeitura e distribuído aos estudantes
                    nas escolas. Esse modelo de compra tinha como desvantagens
                    dificuldades em encontrar fornecedores que oferecessem
                    produtos de qualidade, seguindo as regras do processo de
                    compra pública (chamado de licitação). Outro fator
                    complicador era de os estudantes não poderem provar o
                    uniforme antes da compra (causando problemas na escolha do
                    tamanho adequado para cada peça) e a complexa logística de
                    distribuição (que aumentava o risco de atraso na entrega).
                    Por isso, as mudanças realizadas, que entregam um melhor
                    serviço ao cidadão, foram consolidadas no Programa Auxílio
                    Uniforme Escolar.
                  </div>
                </BlocoTexto>
              </div>
              <div className="col-lg-6 mb-lg-0">
                <img
                  src={imgEMEFJogosTabuleiro}
                  width="540"
                  alt="alunos EMEF jogando"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 cidade-precisa">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-6 col-sm-12 mb-lg-0">
                <BlocoTexto title="Como funciona o fornecimento do uniforme escolar?">
                As famílias possuem mais liberdade de escolha! O kit padrão do 
                uniforme escolar sugerido é composto por: 
                  <ul className="lista-home pt-2 ml-0 pl-0">
                    {uniformes &&
                      uniformes.map((uniforme) => {
                        return <li key={uniforme.id}>{uniforme.nome}</li>;
                      })}
                  </ul>
                </BlocoTexto>
              </div>
              <div className="col-lg-6 col-sm-12 d-flex justify-content-lg-end float-right justify-content-center">
                <img
                  src={imgPecasUniforme}
                  alt="Peças do uniforme escolar"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container agora-cada-bloco">
        Cada família compõe o kit da forma que for mais adequada a cada estudante, considerada suas necessidades
        específicas e respeitando o padrão das peças aprovadas pela Secretaria Municipal de Educação e o valor limite
        disponibilizado. <br />
        A compra é feita diretamente pelas famílias nas lojas credenciadas, a partir de um sistema de concessão de 
        benefício. O(a) responsável legal pelo estudante não recebe diretamente o valor do kit do uniforme escolar na 
        sua conta, mas sim possui direito a gastar esse valor adquirindo o uniforme escolar nas lojas autorizadas 
        (e são elas que fazem a prestação de contas à Prefeitura). 
        </div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-6">
              <BlocoTexto title="Ajude a Prefeitura a garantir a qualidade do uniforme">
                <div className="justify-content-lg-end justify-content-center">
                As lojas credenciadas para a venda do uniforme escolar precisam seguir o padrão estabelecido pela 
                Secretaria Municipal de Educação, tanto no que diz respeito aos modelos, cores, quanto à qualidade do 
                material. Para saber como conferir se os produtos vendidos do kit padrão sugerido estão de fato 
                cumprindo com todas as exigências, veja as dicas neste vídeo.
                </div>
              </BlocoTexto>
            </div>
            <div className="col-lg-6 mb-lg-0">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title="Vídeo sobre o Portal do Uniforme"
                  src="https://www.youtube.com/embed/kjN_J1RRkq4"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-6 mb-lg-0">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title="Vídeo sobre o Portal do Uniforme"
                  src="https://www.youtube.com/embed/FjCjEL7HhKA"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="col-lg-6">
              <BlocoTexto title="Saiba como escolher a numeração correta do uniforme ">
                <div className="justify-content-lg-end justify-content-center">
                  Se você for adquirir o uniforme nas lojas credenciadas e não
                  estiver com a criança ou jovem ao seu lado, para provar a
                  peça, é importante saber que numeração ele(a) usa. O vídeo ao
                  lado ensina como tirar as medidas para comprar o uniforme no
                  tamanho correto.
                </div>
              </BlocoTexto>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <BlocoTexto title="Problemas na compra do uniforme">
            <div className="justify-content-lg-end justify-content-center">
            Em caso de problemas como possíveis falhas na confecção das peças, entre em contato com a loja onde produto 
            foi adquirido. Para situações sem solução direta com o lojista, informe à Prefeitura nos Canais de 
            Atendimento do SP 156 ou recorra a qualquer órgão de defesa do consumidor.<br />
            Se tiver dificuldades para baixar ou usar o aplicativo para realizar a compra nas lojas credenciadas, entre 
            em contato com a empresa Personal Net responsável pelo Kit Escolar DUEPAY, aplicativo do meio de pagamento.<br />
            Central de Atendimento: 0800 003 8400<br />
            Horário: de segunda à sexta das 7h30 às 19h<br />
            E-mail: <a href="mailto:relacionamento@personalcard.com.br">relacionamento@personalcard.com.br</a>
            </div>
          </BlocoTexto>
          <div className="text-center pt-3 pb-3">
            <a href="https://sp156.prefeitura.sp.gov.br/portal/servicos/informacao?servico=3616">
              <button
                size="lg"
                className="btn btn-primary pl-4 pr-4"
                onClick={this.irParaFormulario}
              >
                <strong>Avise sobre problemas</strong>
              </button>
            </a>
          </div>
        </div>
        <div className="w-100 faq text-center mt-5">
          <div className="container">
            <div className="col-lg-12 mb-4 mb-lg-0">
              <h3 className="text-white mb-4">
                Ainda com dúvidas? Veja lista com perguntas frequentes
              </h3>
              <a
                className="pb-0"
                href="https://educacao.sme.prefeitura.sp.gov.br/perguntas-frequentes-sobre-o-uniforme-escolar/"
              >
                <button size="lg" className="btn btn-light pl-4 pr-4">
                  <strong>Perguntas frequentes</strong>
                </button>
              </a>
            </div>
          </div>
        </div>
      </PaginaComCabecalhoRodape>
    );
  }
}

ProcurarFornecedores = reduxForm({
  // a unique name for the form
  form: "ProcurarFornecedoresForm",
})(ProcurarFornecedores);

export default withRouter(ProcurarFornecedores);
