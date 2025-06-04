import { homeServices } from "@/constants/HomeServices";

const HomeService = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mt-12 mb-10 px-2 lg:px-16">
      {homeServices.map((service) => (
        <div key={service.id} className="text-center font-sans space-y-4">
          <h1 className="flex justify-center text-4xl text-[#B59175]">
            {service?.icon}
          </h1>
          <h1 className="text-4xl">{service?.title}</h1>
          <p className="text-lg">{service?.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeService;
