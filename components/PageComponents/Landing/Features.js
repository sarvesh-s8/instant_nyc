const { default: featureList } = require("./featureList");

const Feature = () => {
  return (
    <section className="py-12 bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#6d28d9] font-bold uppercase tracking-wide">
            Features
          </h2>
          <p className="mt-2 text=3xl leading-8 font-bold tracking-light text-gray-900 sm:text-4xl ">
            Why Join Us ?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Connect with like-minded people, explore new possibilities, and
            let's embark on an exciting journey together!
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {featureList.map((f) => {
              return (
                <div key={f.name} className="relative selection:bg-violet-100">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#7c3aed] text-white">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-semibold text-[#220337]">
                      {f.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500 ">
                    {f.description}
                  </dd>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Feature;
