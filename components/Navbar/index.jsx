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
import { Fragment } from "react";
const navigate = [
  { name: "Home", link: "/home" },
  { name: "Feed", link: "/feed" },
  { name: "Search", link: "/search" },
  { name: "Events", link: "/event" },
  { name: "Announcements", link: "/announcement" },
];

const adminRoute = [
  { name: "Admin", link: "/admin" },
  { name: "Stats", link: "/stats" },
];
const Navbar = ({ user, currentPath }) => {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <section className="container mx-auto px-2 md:px-10 lg:px-12">
            <div className="flex justify-between h-16">
              <div className="flex px-2 py-2 md:px-0">
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
                        : "border-transparent hover:text-primary-5 text-gray-500 font-medium"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm`}
                  >
                    {name}
                  </Link>
                ))}
              </div>

              {/*  */}
              <div className="flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary-2 hover:bg-primary-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-5">
                  <span className="sr-only">Open Main Menu</span>
                  {open ? (
                    <AiOutlineClose className="block h-6 w-6" />
                  ) : (
                    <AiOutlineMenu className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
              {user ? (
                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                  <Link href="/messages">
                    <button className="flex-shrink-0 relative bg-white p-1 mr-2 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-5">
                      <span className="sr-only">View Messages</span>
                      <BiChat className="h-6 w-6 " />
                      {user.unreadMessage && (
                        <div className="absolute top-1 right-2 bg-primary-3 h-2 w-2 rounded-full"></div>
                      )}
                    </button>
                  </Link>
                  <Link href="/notifications">
                    <button className="flex-shrink-0 relative bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-5">
                      <span className="sr-only">View notifications</span>
                      <AiOutlineBell className="h-6 w-6" />
                      {user.unreadNotification && (
                        <div className="absolute top-1 right-2 bg-primary-3 h-2 w-2 rounded-full"></div>
                      )}
                    </button>
                  </Link>
                  <Menu className="ml-4 relative flex-shrink-0" as="div">
                    {({ open }) => (
                      <>
                        <section>
                          <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                            <span className="sr-only"> Open Menu</span>
                            <Image
                              className="h-8 w-8 rounded-full object-cover"
                              src={user.profilePic}
                              alt={user.name}
                              height={32}
                              width={32}
                            />
                          </Menu.Button>
                        </section>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                          >
                            <Menu.Item>
                              <Link
                                href={`/${user.userName}`}
                                className="block hover:bg-gray-100 px-4 py-2 text-sm text-gray-700"
                              >
                                Profile
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <Link
                                href={`/setting`}
                                className="block hover:bg-gray-100 px-4 py-2 text-sm text-gray-700"
                              >
                                Settings
                              </Link>
                            </Menu.Item>

                            <Menu.Item>
                              <Link
                                onClick={logoutUser}
                                className="block hover:bg-gray-100 px-4 cursor-pointer py-2 text-sm text-gray-700"
                              >
                                Logout !
                              </Link>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                  <Link
                    href="/posts/new"
                    className="bg-primary-5 hover:bg-primary-3 transition rounded-md text-white px-3 h-9 ml-5 flex items-center "
                  >
                    <AiOutlinePlus className="h-4 2-4 mr-1" />
                    <p className="text-sm">New Post</p>
                  </Link>
                </div>
              ) : (
                <div className="space-x-4 flex items-center ml-4">
                  <Link
                    href="/login"
                    className="hidden sm:flex font-semibold text-gray-600 text-sm"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="hidden sm:flex bg-primary-5 hover:ng-primary-3 transition text-white font-semibold text-sm px-3 py-2 rounded-md"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </section>
          <Disclosure.Panel className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigate.map(({ link, name }) => (
                <Link
                  href={link}
                  key={name}
                  className={
                    currentPath === link
                      ? "bg-primary-1 border-primary-3 text-primary-5 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                      : "border-transparent text-gray-600 hover:bg-primary-1 hover:border-primary-4 hover:text-primary-5 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  }
                >
                  {name}
                </Link>
              ))}
            </div>
            {user ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full object-cover"
                      src={user.profilePic}
                      alt={user.name}
                      height={48}
                      width={48}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Link href="/messages">
                      <button className="relative flex-shrink-0 mr-1 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-3">
                        <span className="sr-only">View messages</span>
                        <BiChat className="h-6 w-6" aria-hidden="true" />
                        {user.unreadMessage && (
                          <div className="absolute top-1 right-2 bg-primary-5 h-2 w-2 rounded-full"></div>
                        )}
                      </button>
                    </Link>
                    <Link href="/notifications">
                      <button className="relative flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-3">
                        <span className="sr-only">View notifications</span>
                        <AiOutlineBell className="h-6 w-6" aria-hidden="true" />
                        {user.unreadNotification && (
                          <div className="absolute top-1 right-2 bg-primary-5 h-2 w-2 rounded-full"></div>
                        )}
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    href={`/${user.userName}`}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <a
                    onClick={logoutUser}
                    className="block cursor-pointer px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    LogOut !
                  </a>
                  <Link
                    className="bg-primary-5 hover:bg-primary-3 transition rounded text-white mx-4 py-2 font-semibold flex items-center justify-center"
                    href="/posts/new"
                  >
                    <>
                      <AiOutlinePlus className="h-4 w-4 mr-1" />
                      <p className="text-sm">New Post</p>
                    </>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200 flex flex-col space-2 items-center px-4">
                <Link
                  href="/login"
                  className="font-semibold text-primary-5 text-center w-full py-2"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-5 rounded font-semibold text-white text-center w-full py-2"
                >
                  Register
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
