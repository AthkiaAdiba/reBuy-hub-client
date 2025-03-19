import Brands from "@/components/modules/home/Brands/Brands";
import FeaturedLists from "@/components/modules/home/FeaturedLists/FeaturedLists";
import HomeService from "@/components/modules/home/HomeService/HomeService";
import Slider from "@/components/modules/home/Slider/Slider";
import { getAllItems } from "@/services/Listings";

const HomePage = async () => {
  const { data: allItems } = await getAllItems();
  console.log(allItems);

  return (
    <div>
      <Slider />
      <FeaturedLists allItems={allItems} />
      <HomeService />
      <Brands />
    </div>
  );
};

export default HomePage;
