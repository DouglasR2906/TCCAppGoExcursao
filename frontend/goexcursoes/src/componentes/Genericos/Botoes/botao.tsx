import React from "react";
import style from "./Botao.module.scss";
// import { Button } from '@mui/material';

interface Props {
  children: React.ReactNode,
  type: "button" | "submit" | "reset" | undefined
}

function Botao({ children, type }: Props) {
  return (
    <button className={style.botao} type={type} >
      {children}
    </button>
  );
}

export default Botao;