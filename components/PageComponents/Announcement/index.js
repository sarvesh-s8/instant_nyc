import { useState } from "react";
import ContactModal from "./Contact.Modal.jsx";
const LandingComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="bg-[#220337]">
      <section className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold  tracking-tight text-white sm:text-4xl">
          <span className="block">Found a bug or issue?</span>
          <span className="block">Report it on GitHub</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="https://github.com/sarvesh-s8/instant_nyc/issues"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#7c3aed] hover:bg-[#5b21b6]"
              target="_blank"
              rel="noreferrer"
            >
              Open Issue
            </a>
          </div>
          <div className="ml-3 inline-flex">
            <a
              onClick={() => setOpen(true)}
              className="inline-flex items-center cursor-pointer justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#5b21b6] bg-[#ede9fe] hover:bg-[#ddd6fe]"
            >
              Contact Us
            </a>
            <ContactModal open={open} setOpen={setOpen} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default LandingComponent;
