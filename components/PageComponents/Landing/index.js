import Link from "next/link";
const index = () => {
  return (
    <>
      <section className="bg-[#ddd6fe]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#220337] sm:text-4xl">
            <span className="block">Join the fun now!</span>
            <span className="block text-[#6d28d9]">Join Traveloo today</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#6d28d9] hover:bg-[#5b21b6]"
                href="/register"
              >
                Get Started !
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
