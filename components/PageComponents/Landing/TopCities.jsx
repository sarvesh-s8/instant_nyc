import Image from "next/image";
import cities from "./cities";
import Link from "next/link";
import { useState } from "react";
const TopCities = () => {
  const [isHovered, setIsHovered] = useState(null);

  return (
    <section className="mx-10 selection:bg-primary-2">
      <h3 className="text-primary-5 font-bold text-center mt-10 text-3xl leading-8  tracking-light text-gray-900 sm:text-4xl ">
        Wanderlust
      </h3>
      <p className="mt-2 mb-2 md:text-xl text-primary-5  text-center">
        Discover, Post, Connect !!
      </p>
      <div
        className="container mx-auto space-y-8 
      sm:grid sm:grid-cols-2  sm:space-y-0 sm:grid  sm:gap-x-8 sm:gap-y-10 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:gap-y-10 "
      >
        {cities.map((c, index) => {
          return (
            <div
              key={c.name}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              className={`sm:w-30 rounded overflow-hidden shadow-lg h-50 sm:h-80 border-solid border-2 border-primary-5 flex-column justify-center ${
                isHovered === index ? "bg-primary-1" : "white"
              }`}
            >
              <Image
                className="w-full h-2/3 object-fit object-center "
                src={c.image}
                alt={c.name}
              />
              <div
                className="px-6 py-4 h-1/3 flex-column justify-center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Link href={`/city/${c.link}`}>
                  <div
                    className={`font-bold font-salsa  text-xl mb-2 text-center ${
                      isHovered === index ? "text-primary-5" : "text-primary-4"
                    }`}
                  >
                    {c.name}
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopCities;

