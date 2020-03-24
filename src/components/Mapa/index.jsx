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
    this.criarMarcadores([
      {
        uuid: "3fba81af-e0ba-410a-930f-1021037190f3",
        nome_fantasia: "100 Linha",
        foto_fachada:
          "http://localhost:8000/django_media/d09b5ff2-da6c-4bb0-8c26-840df3fef3b3.jpg",
        latitude: -23.614811,
        longitude: -46.601627,
        endereco: "Rua TITO PRATES DA FONSECA"
      },
      {
        uuid: "65b7b9b2-b7e3-47d7-803b-2e469f871404",
        nome_fantasia: "Malharia 100% Vila Madalena",
        foto_fachada:
          "http://localhost:8000/django_media/757c9ce3-1562-44a8-b9fc-41a285e2f113.jpg",
        latitude: -23.547097,
        endereco: "Rua TITO PRATES DA FONSECA",
        longitude: -46.708371
      },
      {
        uuid: "338d2188-a0f0-4498-a665-b11d1c2870dc",
        nome_fantasia: "Agulha de Ouro",
        foto_fachada:
          "http://localhost:8000/django_media/2fec3ad2-130d-4c34-a3ed-f22c2f894d34.jpg",
        latitude: -23.495002,
        endereco: "Rua TITO PRATES DA FONSECA",
        longitude: -46.707297
      },
      {
        uuid: "1516a367-9649-494a-8c0d-8f235cb5401d",
        nome_fantasia: "Malharia 100% Itaquera",
        foto_fachada:
          "http://localhost:8000/django_media/f4e9c6ac-865e-4fef-83f1-93f0600d8ee1.jpg",
        latitude: -23.536034,
        endereco: "Rua TITO PRATES DA FONSECA",
        longitude: -46.444817
      }
    ]);
  }

  criarMarcadores(lojas) {
    console.log(lojas);
    if (lojas.length) {
      this.setState({ marcadores: [] }, () => {
        lojas.forEach(loja => {
          let marcador = [];
          marcador.loja = loja;
          this.state.marcadores.push(marcador);
        });
      });
    } else {
      this.setState({ marcadores: [] });
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
                    <strong>{marcador.loja.nome_fantasia}</strong>
                    <div>{marcador.loja.endereco}</div>
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
