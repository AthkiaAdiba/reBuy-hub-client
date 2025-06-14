import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F5F2]">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh]">
        <Image
          width={900}
          height={500}
          src="/images/about-us/About-title-img.jpg"
          alt="About Rebuy Hub"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mission Section */}
      <div className="px-2 lg:px-16 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#B59175]">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Rebuy Hub, we&apos;re pioneering a new era of sustainable
              luxury. Our platform seamlessly connects discerning buyers with
              premium pre-owned items, creating a marketplace where quality,
              authenticity, and environmental responsibility converge.
            </p>
            <div className="pt-6 border-t border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that luxury should be accessible, sustainable, and
                meaningful. Every transaction on our platform represents a
                commitment to quality, authenticity, and environmental
                stewardship.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <Image
                width={600}
                height={600}
                src="/images/about-us/About-video-img-2048x746.jpg"
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#B59175] rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#B59175] mb-16">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-[#F8F5F2] rounded-full flex items-center justify-center text-3xl text-[#B59175] group-hover:scale-110 transition-transform duration-300">
                  ✨
                </div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 border-2 border-[#B59175] rounded-full -z-10"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards in every aspect of our
                service, ensuring an exceptional experience for our community.
              </p>
            </div>
            <div className="group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-[#F8F5F2] rounded-full flex items-center justify-center text-3xl text-[#B59175] group-hover:scale-110 transition-transform duration-300">
                  🌱
                </div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 border-2 border-[#B59175] rounded-full -z-10"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Sustainability</h3>
              <p className="text-gray-600 leading-relaxed">
                Our commitment to environmental responsibility drives every
                decision, promoting conscious consumption and circular economy.
              </p>
            </div>
            <div className="group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-[#F8F5F2] rounded-full flex items-center justify-center text-3xl text-[#B59175] group-hover:scale-110 transition-transform duration-300">
                  🤝
                </div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 border-2 border-[#B59175] rounded-full -z-10"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Integrity</h3>
              <p className="text-gray-600 leading-relaxed">
                We build trust through transparency, authenticity, and
                unwavering commitment to our community&apos;s success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#F8F5F2] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#B59175] mb-2">10K+</div>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#B59175] mb-2">50K+</div>
              <p className="text-gray-600">Items Listed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#B59175] mb-2">98%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#B59175] mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
