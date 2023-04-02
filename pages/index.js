import Banner from "@/components/PageComponents/Landing/Banner";
import Feature from "@/components/PageComponents/Landing/Features";
import TopCities from "@/components/PageComponents/Landing/TopCities";
import LandingPage from "@/components/PageComponents/Landing/index";

import { useState } from "react";
const Landing = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <Banner />
      <TopCities isHovered={isHovered} setIsHovered={setIsHovered} />
      <Feature />
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
