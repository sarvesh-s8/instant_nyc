import Banner from "@/components/PageComponents/Landing/Banner";
import Feature from "@/components/PageComponents/Landing/Features";
import LandingComponent from "@/components/PageComponents/Announcement";

const LandingPage = (props) => {
  return (
    <>
      <Banner />
      <Feature />
      <LandingComponent />
    </>
  );
};

export function getServerSideProps() {
  return {
    props: {
      title: "Traveloo",
    },
  };
}

export default LandingPage;
