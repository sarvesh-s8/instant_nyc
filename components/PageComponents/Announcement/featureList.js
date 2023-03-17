// import { CheckIcon } from "@heroicons/react/outline";
import { TbTruckDelivery } from "react-icons/tb";
// import { FaHotel } from "react-icons/fa";
import { BiNews } from "react-icons/bi";
import { RiDashboardLine } from "react-icons/ri";
import { GiArtificialHive, GiMedalSkull } from "react-icons/gi";
import { BsMeta } from "react-icons/bs";
import { MdOutlineNewspaper, MdOutlineOtherHouses } from "react-icons/md";
// GiMedalSkull

const featureList = [
  {
    name: "Merchandise",
    description:
      "Get your order delivered to your doorstep within 30 minutes with our lightning-fast delivery service. Shop now for ultimate convenience, no more waiting or delayed deliveries.",
    icon: TbTruckDelivery,
  },
  {
    name: "Stay",
    description:
      "Exciting news! Enjoy luxurious stays with unbeatable convenience at lower costs through our upcoming partnership with exceptional facilities. Stay tuned for updates!",
    icon: MdOutlineOtherHouses,
  },
  {
    name: "Badges to Flex!!",
    description:
      "Elevate your social media presence! Increase your reach and earn badges by engaging with your followers. Don't miss out on a chance to receive a special gift - start posting today!",
    icon: GiMedalSkull,
  },
  {
    name: "Monthly Newsletter",
    description:
      "Stay informed and ahead of the game with our new monthly newsletter! Get the latest industry news and trends delivered weekly in a user-friendly format. Sign up now!",
    icon: BiNews,
  },

  {
    name: "Stats about your post",
    description:
      "Track the performance of your posts with a dashboard that provides total views, likes, and comments. Analyze your reach and optimize your social media strategy for better engagement.",
    icon: RiDashboardLine,
  },
  {
    name: "Introduction to AI",
    description:
      "Elevate your social media game with our upcoming AI feature. Add viral/trending tags and filters to your posts with just a few clicks. Stay tuned for updates and optimize your social media presence.",
    icon: GiArtificialHive,
  },
  {
    name: "Metaverse",
    description:
      "Immerse yourself in our virtual world with stunning graphics and realistic simulations. Explore our locations like never before, stay tuned for updates, and get ready to be transported to another world!",
    icon: BsMeta,
  },
  {
    name: "News Feed",
    description:
      "Stay informed about the latest tech trends and events with our daily news updates in 100 words or less. Sign up today to stay ahead of the curve without spending hours reading lengthy articles.",
    icon: MdOutlineNewspaper,
  },
];
export default featureList;
