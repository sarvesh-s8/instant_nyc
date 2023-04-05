import Link from "next/link";
import RoamMate from "./Svg/RoamMate-sm.svg";
import Image from "next/image";
const LandingPage = () => {
  return (
    <>
      <section className="bg-primary-1">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-[#220337] sm:text-4xl">
            <span className="block selection:bg-primary-1">
              Join the fun now!
            </span>
            <span className="block text-primary-5 selection:bg-primary-1">
              Join <span className="font-salsa">RoamMate</span> today
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-4 hover:bg-primary-5"
                href="/register"
              >
                Get Started !
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LandingPage;
