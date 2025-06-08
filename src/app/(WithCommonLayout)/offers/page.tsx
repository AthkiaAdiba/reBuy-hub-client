import OffersBanner from "@/components/modules/offers/OffersBanner";
import OffersCards from "@/components/modules/offers/OffersCards";
import { getAllItems } from "@/services/Listings";

const OffersPage = async () => {
  const { data: allItems } = await getAllItems();

  return (
    <div className="pt-16 md:pt-16 lg:pt-32">
      <OffersBanner />
      <div className="px-2 lg:px-16 pt-24 md:pt-32 lg:pt-28">
        <OffersCards allItems={allItems} />
      </div>
    </div>
  );
};

export default OffersPage;
