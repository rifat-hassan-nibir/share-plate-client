import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import slide1 from "../../../public/slide-1.png";
import slide2 from "../../../public/slide-2.jpg";
import slide3 from "../../../public/slide-3.jpg";

const Slider = () => {
  return (
    <div className="mt-10 max-w-5xl mx-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-xl"
      >
        <SwiperSlide>
          <img className="w-full object-cover h-96 sm:h-[480px] bg-no-repeat bg-center bg-cover rounded-xl" src={slide1} alt="slide1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full object-cover h-96 sm:h-[480px] bg-no-repeat bg-center bg-cover rounded-xl" src={slide2} alt="slide1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full object-cover h-96 sm:h-[480px] bg-no-repeat bg-center bg-cover rounded-xl" src={slide3} alt="slide1" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
