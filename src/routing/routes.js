import { CadastroEmpresa } from "components/CadastroEmpresa";
import Confirmacao from "components/CadastroEmpresa/Confirmacao";
import Home from "components/Home/Home";
import { Login } from "screens/Login";
import MapaDeFornecedores from "screens/MapaDeFornecedores";
import { MegaPortal } from "screens/MegaPortal";
import { ProcurarFornecedores } from "screens/ProcurarFornecedores";

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
    component: Home,
    exact: true,
  },
  {
    path: "/familia",
    component: ProcurarFornecedores,
    exact: true,
  },
  {
    path: "/confirmacao-cadastro",
    component: Confirmacao,
    exact: true,
  },
  {
    path: "/mapa-de-fornecedores",
    component: MapaDeFornecedores,
    exact: true,
  },
];
