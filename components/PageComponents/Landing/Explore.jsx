import Image from "next/image";
import cities from "./cities";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import ny_1 from "./Images_/ny_1.jpg";
import ny_6 from "./Images_/ny_6.jpg";
import ny_7 from "./Images_/ny_7.jpg";
import ny_10 from "./Images_/ny_10.jpg";
import ny_11 from "./Images_/ny_11.jpg";
import location from "./Images_/location.svg";
import left from "./Images_/left.svg";
import right from "./Images_/right.svg";

const Explore = () => {
  return (
    <section className="md:mx-10 mx-2 selection:bg-primary-1 py-3 md:flex">
      <div className="mt-2 basis-3/7">Explore the Untouched</div>
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
        <div className="div7"> Gracias</div>
        <div className="div6">
          {/* ". . . ."
      "btn-div-1 btn-div-2 btn-div-3 btn-div-4"
      ". . . ."
 
 */}

          <Image src={left} className="btn-div-1 h-full w-full" />

        

          <div className="btn-div-2 bg-white hover:bg-primary-5 text-primary-5 font-semibold hover:text-white py-2 px-2 border border-white hover:border-white rounded w-full text-left flex justify-around items-center  lg:px-2">
            <Image src={location} className="h-3 w-3 basis-1/7 h-4 w-4" />
            <Link href={"/newyork"} className="basis-6/7">
              New York
            </Link>
          </div>
          <Image src={right} className=" btn-div-3 h-full w-full" />
        </div>
      </div>
    </section>
  );
};

export default Explore;
