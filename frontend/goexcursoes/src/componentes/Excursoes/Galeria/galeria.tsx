import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface Props {
  imagens: string[];
}

function Galeria({ imagens }: Props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="image-slider" style={{ height: 300 }}>
      <Slider {...settings}>
        {imagens.map((imagem, index) => (
          <div key={index}>
            <img src={imagem} alt={`Imagem ${index}`} style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Galeria; 