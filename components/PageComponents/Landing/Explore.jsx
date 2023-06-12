import Image from "next/image";
import cities from "./cities";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "./Card";

import City from "./City";
const Explore = () => {
  const [pointer, setPointer] = useState(0);

  const onClickForward = () => {
    setPointer(pointer === cities.length - 1 ? 0 : pointer + 1);
  };
  const onClickBackward = () => {
    setPointer(pointer === 0 ? cities.length - 1 : pointer - 1);
  };
  return (
    <section className="md:mx-10 mx-2 selection:bg-primary-1 py-3 nmd:flex">
      <City
        city={cities[pointer]}
        forward={onClickForward}
        backward={onClickBackward}
      />
    </section>
  );
};

export default Explore;
