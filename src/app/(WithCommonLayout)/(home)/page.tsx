"use client";

import Slider from "@/components/modules/home/Slider/Slider";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <Slider />
    </div>
  );
};

export default HomePage;
