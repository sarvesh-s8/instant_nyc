import Link from "next/link";
import { socialAccount } from "./social.accounts";
// import { socialAccount, navigations } from "./social.accounts";
const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <section className="max-w-7xl mx-auto py-10 px-4 overflow-hidden sm:px-6 lg:px-8">
        {/* <nav className="mx-5 my-5 flex flex-wrap justify-center">
          {navigations.map((i) => (
            <div key={i.name} className="px-5">
              <Link
                href={i.link}
                className="text-base text-gray-500 hover:text-gray-900"
              >
                {i.name}
              </Link>
            </div>
          ))}
        </nav> */}
        <div className="mt-5 flex justify-center space-x-6">
          {socialAccount.map((s) => (
            <a
              key={s.name}
              href={s.link}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{s.name}</span>
              <s.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
        <p className="text-center text-base mt-6 text-gray-400">
          &copy; {new Date().getFullYear()} RoamMate
        </p>
      </section>
    </footer>
  );
};
export default Footer;
