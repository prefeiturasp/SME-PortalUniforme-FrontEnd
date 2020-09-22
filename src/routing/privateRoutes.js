import { AlterarSenha } from "screens/AreaLogada/AlterarSenha";
import { PaginaInicialFornecedor } from "screens/AreaLogada/PaginaInicialFornecedor";

export const privateRoutes = [
  {
    path: "/adm-fornecedor",
    component: PaginaInicialFornecedor,
    exact: true,
  },
  {
    path: "/adm-fornecedor/alterar-senha",
    component: AlterarSenha,
    exact: true,
  },
];
