import Banner from "@/components/PageComponents/Landing/Banner";
import Explore from "@/components/PageComponents/Landing/Explore";
import Feature from "@/components/PageComponents/Landing/Features";
import TopCities from "@/components/PageComponents/Landing/TopCities";
import LandingPage from "@/components/PageComponents/Landing/index";

import { useState } from "react";
const Landing = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <Banner />
      <TopCities isHovered={isHovered} setIsHovered={setIsHovered} />
      <Feature />
      <Explore />
      <LandingPage />
    </>
  );
};

export function getServerSideProps() {
  return {
    props: {
      title: "RoamMate",
    },
  };
}

export default Landing;
