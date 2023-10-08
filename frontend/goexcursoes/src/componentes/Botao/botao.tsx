import React from 'react'
import style from './Botao.module.scss'

interface Props {
    children: React.ReactNode,
    type: "button" | "submit" | "reset" | undefined
}

const Botao: React.FC<Props> = (props) => {
    return (
        <button className={style.botao} type={props.type}>
            {props.children}
        </button>
    )
}

export default Botao;