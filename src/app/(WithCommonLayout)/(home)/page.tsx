import Brands from "@/components/modules/home/Brands/Brands";
import HomeService from "@/components/modules/home/HomeService/HomeService";
import Slider from "@/components/modules/home/Slider/Slider";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <HomeService />
      <Brands />
    </div>
  );
};

export default HomePage;
