const OfferSection = () => {
  const offersData = [
    {
      id: 1,
      productName: "New Stylish Side\nArmchair",
      productPercentage: 15,
      image: "/images/offerImages/offerimage1.jpg",
      link: "#",
    },
    {
      id: 2,
      productName: "Table Lamp",
      productPercentage: 10,
      image: "/images/offerImages/offerimage2.jpg",
      link: "#",
    },
    {
      id: 3,
      productName: "Table Lamp",
      productPercentage: 10,
      image: "/images/offerImages/offerimage3.jpg",
      link: "#",
    },
    {
      id: 4,
      productName: "Table Lamp",
      productPercentage: 10,
      image: "/images/offerImages/offerimage4.jpg",
      link: "#",
    },
  ];

  return (
    <div className="px-2 lg:px-16 pt-12">
      <h2 className="text-3xl md:text-4xl font-bold text-[#B59175] mb-8">
        Special Offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offersData.map((offer) => (
          <div
            key={offer.id}
            className="relative flex-1 bg-cover bg-center rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${offer.image})`,
              minHeight: "300px",
            }}
          >
            <div className="absolute inset-0 bg-transparent"></div>{" "}
            {/* Optional: Dark overlay */}
            <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white">
              <div>
                <p className="text-lg font-medium mb-2">
                  {offer.productPercentage}% OFF{" "}
                </p>
                <h3 className="text-3xl font-bold leading-tight whitespace-pre-line">
                  {offer.productName}
                </h3>
              </div>
              <a
                href={offer.link}
                className="mt-4 inline-flex items-center text-white font-semibold group"
              >
                SHOP NOW
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferSection;
