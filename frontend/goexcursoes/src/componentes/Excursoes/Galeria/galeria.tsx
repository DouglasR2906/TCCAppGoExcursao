import { CardMedia } from "@mui/material";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
interface Props {
  imagens: string[];
}

function Galeria({ imagens }: Props) {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoHeight={true}
      autoplay
    >
      {imagens.map((imagem, index) => (
        <SwiperSlide key={index} >
          <CardMedia
            component="img"
            height="400"
            image={imagem}
            alt="Cidade Destino Excursão"
          />
        </SwiperSlide >
      ))}
    </Swiper>
  );
}

export default Galeria;