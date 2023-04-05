import NextNProgress from "nextjs-progressbar";
import Router, { useRouter } from "next/router";
import Footer from "../Footer";
import Navbar from "../Navbar";
const Layout = ({ children, user }) => {
  const router = useRouter();
  const paths = [
    "/",
    "/register",
    "/login",
    "/induction",
    "/forgot-password",
    "/reset-password/[token",
  ];
  const showNavbar = () => {
    if (paths.includes(router.pathname)) {
      return true;
    }
    return false;
  };
  const showFooter = () => {
    if (paths.includes(router.pathname)) {
      return true;
    } else if (router.pathname === "/messages") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <NextNProgress color="primary-5" />
      <div className="flex flex-col min-h-screen">
        {showNavbar() && <Navbar />}
        <main className="flex-1">{children}</main>
        {showFooter() && <Footer />}
      </div>
    </>
  );
};
export default Layout;
