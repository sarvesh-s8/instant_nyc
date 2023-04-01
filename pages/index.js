import Banner from "@/components/PageComponents/Landing/Banner";
import Feature from "@/components/PageComponents/Landing/Features";
import LandingPage from "@/components/PageComponents/Landing/index";

const Landing = (props) => {
  return (
    <>
      <Banner />
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
