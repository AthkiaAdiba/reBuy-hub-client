import Brands from "@/components/modules/home/Brands/Brands";
import Categories from "@/components/modules/home/Categories/Categories";
import FeaturedLists from "@/components/modules/home/FeaturedLists/FeaturedLists";
import HomeService from "@/components/modules/home/HomeService/HomeService";
import Newsletter from "@/components/modules/home/Newsletter/Newsletter";
import OfferSection from "@/components/modules/home/OfferSection/OfferSection";
import Slider from "@/components/modules/home/Slider/Slider";
import { getAllItems } from "@/services/Listings";

const HomePage = async () => {
  const { data: allItems } = await getAllItems();

  return (
    <div>
      <Slider />
      <Categories />
      <FeaturedLists allItems={allItems} />
      <HomeService />
      <Brands />
      <OfferSection />
      <Newsletter />
    </div>
  );
};

export default HomePage;
