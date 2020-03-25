import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./style.scss";

export default class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loja: "",
      zoom: 12,
      marcadores: null
    };

    this.criarMarcadores = this.criarMarcadores.bind(this);
  }

  componentDidMount() {
    const { lojas } = this.props;
    this.criarMarcadores(lojas);
  }

  criarMarcadores(lojas) {
    if (lojas.length) {
      let marcadores = [];
      lojas.forEach(loja => {
        let marcador = [];
        marcador.loja = loja;
        marcadores.push(marcador);
      });
      this.setState({ marcadores });
    } else {
      this.setState({ marcadores: null });
    }
  }

  render() {
    const { latitude, longitude } = this.props;
    const { marcadores } = this.state;
    return (
      <div className="mapa h-80 w-80">
        {!marcadores ? (
          <div>Carregando mapa...</div>
        ) : (
          <Map ref="map" center={[latitude, longitude]} zoom={this.state.zoom}>
            <TileLayer
              attribution=""
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {marcadores.map((marcador, indice) => {
              return (
                <Marker
                  key={indice}
                  position={[marcador.loja.latitude, marcador.loja.longitude]}
                >
                  <Popup>
                    <img
                      src={marcador.loja.foto_fachada}
                      alt="Foto da fachada da loja"
                      height="135px"
                      width="300px"
                    />
                    <br />
                    <strong>{marcador.loja.nome_fantasia.toUpperCase()}</strong>
                    <br />
                    <div>
                      <strong>Endereço: </strong>
                      {marcador.loja.endereco}, {marcador.loja.numero} <br />
                      {marcador.loja.bairro} - CEP: {marcador.loja.cep}
                    </div>
                    <br />
                    <div>
                      <strong>Telefone: </strong>
                      {marcador.loja.telefone}
                    </div>
                    <div>
                      <strong>E-mail: </strong>
                      {marcador.loja.email}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </Map>
        )}
      </div>
    );
  }
}
