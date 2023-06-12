import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import RoamMate from "./Svg/RoamMate-lg.svg";

const Card = ({ image, index }) => {
  return (
    <>
      <Image
        className="w-full object-cover h-full border-none rounded shadow align-middle  md:object-fill"
        src={image}
        alt="your-image-description"
      />
    </>
  );
};

export default Card;
