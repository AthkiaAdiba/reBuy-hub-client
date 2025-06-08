import { TList } from "@/types/list";
import Link from "next/link";

const OffersCards = ({ allItems }: { allItems: TList[] }) => {
  const offeredItems = allItems.filter((item) => item.offerPrice > 0);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offeredItems.map((offer) => (
          <div
            key={offer._id}
            className="relative flex-1 bg-cover bg-center rounded-lg overflow-hidden group"
            style={{
              backgroundImage: `url(${offer?.images[0]})`,
              minHeight: "300px",
            }}
          >
            {/* Dark overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 transition-opacity duration-300 group-hover:opacity-90"></div>

            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div>
                <p className="text-xl font-semibold mb-3 text-white/90">
                  {Math.round((offer?.offerPrice / offer?.price) * 100)}% OFF
                </p>
                <h3 className="text-3xl font-bold leading-tight text-white">
                  {offer?.title}
                </h3>
              </div>
              <Link
                href={`/products/${offer._id}`}
                className="mt-4 inline-flex items-center text-white font-semibold group/link"
              >
                SHOP NOW
                <span className="ml-2 transition-transform group-hover/link:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersCards;
