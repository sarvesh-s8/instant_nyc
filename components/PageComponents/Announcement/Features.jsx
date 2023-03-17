import featureList from "./featureList";

const Features = () => {
  return (
    <section
      className="bg-white selection:bg-violet-400
    "
    >
      <div className="container mx-auto pb-16 px-2 md:px-10 lg:px-12 sm:px-6 lg:pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Upcoming Features List
          </h2>
          <p className="mt-4 text-lg text-gray-500 px-2">
            Stay tuned for upcoming features currently under development. Take
            advantage of new functionalities in the future by keeping up with
            our updates.
          </p>
        </div>
        <dl className="mt-12 sm:space-y-0 px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {featureList.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <feature.icon className="absolute h-6 w-6 text-[#57068C]" />
                <p className="ml-9 text-lg leading-6 font-medium text-[#57068C]">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-9 text-base text-[#57068c]-500 ">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Features;
