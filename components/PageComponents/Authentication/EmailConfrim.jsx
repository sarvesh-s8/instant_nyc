import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
const EmailConfirmationModal = ({ open, setOpen }) => {
  const router = useRouter();
  return <Transition.Root show={open} as={Fragment}>
    
  </Transition.Root>;
};
