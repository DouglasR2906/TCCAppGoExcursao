import Cabecalho from "../Cabecalho/cabecalho";
import style from "./Banner.module.scss";

function Banner() {
  return (
    <div className={style.imgBanner}>
      <Cabecalho bgColor="transparent" posicao="static" />
      <img src='/assets/img/Banner.png' alt='Imagem do banner' />
      <svg
        className={style.wave}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 220'
      >
        <path
          fill='#fff'
          fillOpacity='1'
          d='M0,224L48,208C96,192,192,160,288,149.3C384,139,480,149,576,170.7C672,192,768,224,864,218.7C960,213,1056,171,1152,138.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
        ></path>
      </svg>
    </div>
  );
}

export default Banner;
