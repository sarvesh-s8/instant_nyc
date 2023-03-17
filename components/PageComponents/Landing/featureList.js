import { BiPhotoAlbum } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { BsChatDots, BsCalendar2Event } from "react-icons/bs";
import { SiMeetup, SiFreecodecamp } from "react-icons/si";
const featureList = [
  {
    name: "Discover new posts",
    description:
      "Personalized feed of diverse, high-quality content from global creators. Explore Discover Posts for tailored, enjoyable content that matches your interests.",
    icon: BiPhotoAlbum,
  },
  {
    name: "Meetups and Gatherings",
    description:
      "Explore shared interests and connect with like-minded people through Meetups. Join organized gatherings of individuals with similar hobbies, interests, or professions.",
    icon: SiMeetup,
  },
  {
    name: "Like, Comment and follow",
    description:
      "Connect with creators, tap to appreciate, comment to share thoughts, and follow for updates. Engage with your favorite content easily.",
    icon: AiOutlineLike,
  },
  {
    name: "Chat and connect with people",
    description:
      "Expand social circle with messaging, connect with global people. Stay in touch with friends and make new ones effortlessly.",
    icon: BsChatDots,
  },
  {
    name: "Get all events happening in city",
    description:
      "Stay updated with city events, concerts, festivals, cultural gatherings. Find exciting happenings and activities for everyone.",
    icon: BsCalendar2Event,
  },

  {
    name: "Free and open-source",
    description:
      "Empower yourself with the freedom and flexibility to use, modify, and share software code without restrictions or fees. ",
    icon: SiFreecodecamp,
  },
];

export default featureList;
