import { AlterarSenha } from "screens/AreaLogada/AlterarSenha";
import { DadosEmpresaLogado } from "screens/AreaLogada/DadosEmpresaLogado";
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
  {
    path: "/adm-fornecedor/dados-empresa",
    component: DadosEmpresaLogado,
    exact: true,
  },
];
