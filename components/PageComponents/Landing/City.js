import Card from "./Card";
import Image from "next/image";
import ny_1 from "./Images_/ny_1.jpg";
import ny_6 from "./Images_/ny_6.jpg";
import ny_7 from "./Images_/ny_7.jpg";
import ny_10 from "./Images_/ny_10.jpg";
import ny_11 from "./Images_/ny_11.jpg";
import location from "./Images_/location.svg";
import left from "./Images_/left.svg";
import right from "./Images_/right.svg";
import Link from "next/link";
const City = ({ city, backward, forward }) => {
  let { image, link, name } = city;
  return (
    <>
      <div className="xs:mt-2 basis-3/7 xs:mb-2 xxs:relative">
        <div className="relative h-full w-full ">
          <Image
            src={image}
            className="tailwind-height h-full w-full"
            alt={`image-${name}`}
          />
          <p className="absolute md:top-1/4 md:left-1/4 md:text-3xl text-primary-4 xs:text-sm xs:top-5 xs:left-10 xxs:hidden xs:block  xmd:text-2xl xmd:top-10 xms:left-10 ">
            Explore the Untouched, Serenity, Adventure, Solitude
            <br />
            <span className="block md:text-5xl md:mb-3 text-primary-5 font-bold xmd:text-4xl xs:text-xl xs:text-xl xxs:block ">
              {name}
            </span>
            <span className="pt-5 md:text-xl xs:pt-1 xs:text-sm xmd:text-2xl">
              Connect, Like and Follow the Enchanting experiences
            </span>
          </p>
        </div>
        <span className="xxs:absolute xxs:top-1/3 xxs:left-1/3 xxs:text-3xl xxs:text-primary-5 font-bold xs:hidden">
          {name}
        </span>
      </div>
      <div className="parent py-2 px-2 basis-4/7">
        <div className="div1">
          <Card image={ny_1} />
        </div>
        <div className="div2">
          <Card image={ny_10} />
        </div>
        <div className="div3 ">
          <Card image={ny_7} index={3} />
        </div>
        <div className="div4">
          <Card image={ny_11} />
        </div>
        <div className="div5">
          <Card image={ny_6} />
        </div>
        <div className="div7">
          <h3 className="text-center"> Hola, Adios!!</h3>
        </div>
        <div className="div6">
          <Image
            src={left}
            className="btn-div-1 h-full w-full cursor-pointer"
            onClick={backward}
          />

          <div className="btn-div-2 bg-white hover:bg-primary-5 text-primary-5 font-semibold hover:text-white py-2 px-2 border border-white hover:border-white rounded w-full text-left flex justify-around items-center  lg:px-2">
            <Image src={location} className="h-3 w-3 basis-1/7 h-4 w-4" />
            <Link href={`/${link}`} className="basis-6/7">
              {name}
            </Link>
          </div>
          <Image
            src={right}
            className="cursor-pointer btn-div-3 h-full w-full"
            onClick={forward}
          />
        </div>
      </div>
    </>
  );
};

export default City;
