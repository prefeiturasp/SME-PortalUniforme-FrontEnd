import React from "react";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import "./style.scss";
import { QUANTIDADE_POR_PAGINA } from "./constants";

export const Paginacao = props => {
  const { total, onChange, className, ...rest } = props;
  return (
    <section className="pt-3 footer-pagination-default">
      <Pagination
        className={className}
        defaultCurrent={1}
        defaultPageSize={QUANTIDADE_POR_PAGINA}
        onChange={onChange}
        total={total}
        size="medium"
        {...rest}
      />
    </section>
  );
};
