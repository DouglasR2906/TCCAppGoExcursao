import { A11y, Navigation, Pagination } from "swiper/modules";
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
      modules={[Navigation, Pagination, A11y]}
      navigation
      pagination={{ clickable: true }}
      height={100}
      loop
    >
      {imagens.map((imagem, index) => (
        <SwiperSlide key={index} >
          <img src={imagem} alt={`Imagem ${index}`} style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }} />
        </SwiperSlide >
      ))}
    </Swiper>
  );
}

export default Galeria;