import Link from "next/link";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  AiOutlineBell,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiChat } from "react-icons/bi";
import { logoutUser } from "../../utils/authentication";
import RoamMateSm from "./Svg/RoamMate-sm.svg";
import RoamMateLg from "./Svg/RoamMate-lg.svg";
const navigate = [
  { name: "Home", link: "/home" },
  { name: "Feed", link: "/feed" },
  { name: "Search", link: "/search" },
  { name: "Admin", link: "/admin" },
  { name: "Events", link: "/event" },
  { name: "Announcements", link: "/announcement" },
  { name: "Stats", link: "/stats" },
];
const Navbar = ({ user, currentPath }) => {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <section className="container mx-auto px-2 md:px-10 lg:px-12">
            <div className="flex justify-between h-16">
              <div className="flex px-2 md:px-0">
                <Link href="/home">
                  <Image
                    src={RoamMateSm}
                    alt="RoamMate"
                    className="block lg:hidden h-10 w-auto cursor-pointer"
                  />
                </Link>
                <Link href="/home">
                  <Image
                    src={RoamMateLg}
                    className="hidden lg:block h-14 w-auto cursor-pointer"
                    alt="RoamMate"
                  />
                </Link>
              </div>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-4">
                {navigate.map(({ link, name }) => (
                  <Link
                    key={link}
                    href={link}
                    className={`${
                      currentPath === link
                        ? "border-primary-3 text-gray-900 font-semibold"
                        : "border-transparent hover:text-primary-2 text-gray-500 font-medium"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm`}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
            {/*  */}
            <div className="flex items-center lg:hidden">
              <Disclosure.Button></Disclosure.Button>
            </div>
          </section>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
