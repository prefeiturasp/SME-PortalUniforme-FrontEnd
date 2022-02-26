import React, { useState, useEffect } from "react";
import MenuAcessibilidade from "components/MenuSuperior/MenuAcessibilidade";
import MenuPrincipal from "components/MenuSuperior/MenuPrincipal";
import { Rodape } from "components/Rodape";
import { getAPIVersion, getFrontVersion } from "services/uniformes.service";

export const PaginaComCabecalhoRodape = ({ children }) => {
  const [alterarFonte, setAlterarFonte] = useState("");
  const [alterarContraste, setAlterarConstraste] = useState("");
  const [apiVersion, setApiVersion] = useState(null);
  const [frontVersion, setFrontVersion] = useState(null);

  useEffect(() => {
    getAPIVersion().then((response) => {
      setApiVersion(response);
    });
    getFrontVersion().then((response) => {
      setFrontVersion(response);
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
      className={`${alterarFonte && "fonte-maior"} ${alterarContraste &&
        "alto-contraste"}`}
    >
      <MenuAcessibilidade
        handleFonte={handleFonte}
        handleConstraste={handleConstraste}
      />
      <MenuPrincipal />
      {children}
      <Rodape versao={`${frontVersion} (API: ${apiVersion})`} />
    </section>
  );
};
