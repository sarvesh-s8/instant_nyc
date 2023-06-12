import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import RoamMate from "./Svg/RoamMate-lg.svg";
import Card from "./Card";
const Banner = () => {
  return (
    <section className="bg-white-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 h-full w-full">
          <div className="relative h-full">
            <svg
              className="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={784}
                fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
              />
            </svg>
            <svg
              className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={784}
                fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
              />
            </svg>
          </div>
        </div>
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative pt-6 pb-16 sm:pb-24"
        >
          <div className="mt-16 mx-auto max-w-7xl px-4 sm:px-6 ">
            <div className="text-center ">
              <h1 className="text-4xl tracking-light  text-gray-900 sm:text-5xl md:text-6xl selection:bg-violet-100 font-salsa">
                <span className="block text-[#7c3aed] font-bold my-2 ">
                  RoamMate
                </span>
                <span className="block text-[#7c3aed]  font-light font-salsa">
                  Connect, Chill & Relax
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Embark on a journey of discovery and creativity. Explore new
                places, connect with like-minded individuals, and capture your
                experiences through stunning photos.
              </p>
              <div className="mt-12 gap-x-4 gap-y-2 flex flex-wrap justify-center">
                <Link
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#7c3aed] hover:bg-[#6d28d9] md:py-3 md:text-lg md:px-6 inline-block"
                  href="/register"
                >
                  Join Community
                </Link>
                <Link
                  className="px-8 py-3 border border-transparent text-base text-base font-medium rounded-md text-[#7c3aed] bg-[#ede9fe] hover:bg-[#ddd6fe] md:py-3 md:text-lg md:px-6 inline-block"
                  href="/home"
                >
                  Discover New World
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1"></div>
            <div className="flex-1 w-full bg-primary-1"></div>
          </div>
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="max-w-7xl mx-auto px-4 sm:px-6"
          >
            <Image
              className="relative w-full h-full rounded-lg shadow-lg"
              src={RoamMate}
              alt={"Landing Image"}
            />
          </motion.div>
        </div>
      </div>
      <h4 className="text-primary-3 font-bold text-left mt-10 text-4
      xl leading-8  tracking-light px-5 text-gray-900  md:text-center lg:mx-4 ">
        Adventure Awaits You
        <br />
        <span className="inline-block bg-primary-1  font-salsa text-primary-5">
          Connect, Share, Engage
        </span>
      </h4>
    </section>
  );
};
export default Banner;
