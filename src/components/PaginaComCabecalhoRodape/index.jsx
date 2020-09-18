import React, { useState, useEffect } from "react";
import { version } from "../../../package.json";
import MenuAcessibilidade from "components/MenuSuperior/MenuAcessibilidade";
import MenuPrincipal from "components/MenuSuperior/MenuPrincipal";
import { Rodape } from "components/Rodape";
import { getAPIVersion } from "services/uniformes.service";

export const PaginaComCabecalhoRodape = ({ children }) => {
  const [alterarFonte, setAlterarFonte] = useState("");
  const [alterarContraste, setAlterarConstraste] = useState("");
  const [apiVersion, setApiVersion] = useState(null);

  useEffect(() => {
    getAPIVersion().then((response) => {
      setApiVersion(response.data);
    });
  }, []);

  const handleFonte = () => {
    setAlterarFonte(!alterarFonte);
  };

  const handleConstraste = () => {
    setAlterarConstraste(!alterarContraste);
  };

  return (
    <section
      role="main"
      className={`${alterarFonte && "fonte-maior"} ${
        alterarContraste && "alto-contraste"
      }`}
    >
      <MenuAcessibilidade
        handleFonte={handleFonte}
        handleConstraste={handleConstraste}
      />
      <MenuPrincipal />
      {children}
      <Rodape versao={`${version} (API: ${apiVersion})`} />
    </section>
  );
};
