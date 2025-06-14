import Image from "next/image";
import Link from "next/link";

const New = () => {
  return (
    <div className="min-h-screen bg-white md:w-[90%] w-[95%] mx-auto pt-12">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 pr-0 md:pr-12 mb-10 md:mb-0">
          <p className="text-[#c9b18c] font-light italic text-2xl md:text-5xl mb-2">
            New
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
            GENIUNELY FRESH WAY OF THINKING
          </h1>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Embrace a new perspective on business growth—where innovation meets
            authenticity. At Rebuy Hub, we believe in challenging the status
            quo, fostering creativity, and empowering you to redefine success on
            your own terms. Discover a community that values fresh ideas,
            collaboration, and genuine progress.
          </p>
          <Link href="/products">
            <button className="border border-[#c9b18c] text-[#c9b18c] px-12 py-3 uppercase tracking-wider hover:bg-[#c9b18c] hover:text-white transition-colors duration-300">
              Discover
            </button>
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="/images/home/home-2-img-5.jpg"
            alt="Professional man working on laptop by window"
            width={800}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default New;
