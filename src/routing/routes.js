import { CadastroEmpresa } from "screens/CadastroEmpresa";
import { ConfirmacaoCadastro } from "screens/ConfirmacaoCadastro";
import { Login } from "screens/Login";
import MapaDeFornecedores from "screens/MapaDeFornecedores";
import { MegaPortal } from "screens/MegaPortal";
import { ProcurarFornecedores } from "screens/ProcurarFornecedores";
import PortalFornecedores from "screens/PortalFornecedores";

export const routes = [
  {
    path: "/",
    component: MegaPortal,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/cadastro",
    component: CadastroEmpresa,
    exact: true,
  },
  {
    path: "/fornecedor",
    component: PortalFornecedores,
    exact: true,
  },
  {
    path: "/familia",
    component: ProcurarFornecedores,
    exact: true,
  },
  {
    path: "/confirmacao-cadastro",
    component: ConfirmacaoCadastro,
    exact: true,
  },
  {
    path: "/mapa-de-fornecedores",
    component: MapaDeFornecedores,
    exact: true,
  },
];
