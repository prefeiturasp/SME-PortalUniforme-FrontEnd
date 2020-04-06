import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import * as Leaflet from "leaflet";
import "./style.scss";

export default class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loja: "",
      zoom: 12,
      marcadores: null,
      redIcon: null,
      blueIcon: null,
    };

    this.criarMarcadores = this.criarMarcadores.bind(this);
  }

  componentDidMount() {
    const { lojas } = this.props;
    this.criarMarcadores(lojas);
    const redIcon = new Leaflet.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    const blueIcon = new Leaflet.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    this.setState({ blueIcon, redIcon });
  }

  criarMarcadores(lojas) {
    if (lojas.length) {
      let marcadores = [];
      lojas.forEach((loja) => {
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
    const { latitude, longitude, lojaHover } = this.props;
    const { marcadores, redIcon, blueIcon } = this.state;
    return (
      <div className="mapa h-80 w-80">
        {!marcadores ? (
          <div className="text-dark pt-3">
            Não há lojas para mostrar no mapa.
          </div>
        ) : (
          <Map ref="map" center={[latitude, longitude]} zoom={this.state.zoom}>
            <TileLayer
              attribution=""
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {marcadores.map((marcador, indice) => {
              return (
                <Marker
                  /*opacity={
                    lojaHover === marcador.loja.id || !lojaHover ? 1 : 0.5
                  }*/
                  icon={lojaHover === marcador.loja.id ? blueIcon : redIcon}
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
                    <br />A {marcador.loja.distancia} KM de sua localização
                    <br />
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
