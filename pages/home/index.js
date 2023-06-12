import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { QueryClient, useInfiniteQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import backendUrl from "@/utils/baseUrl";

const getPosts = async (page) => {
  const { data } = await axios.get(`${backendUrl}/api/posts?page=${page}`);
  return data;
};

const Home = ({ user }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(["posts"], ({ pageParam = 1 }) => getPosts(pageParam), {
      getNextPageParam: (lastPage) => lastPage.next,
    });
  return <div>Home</div>;
};

export default Home;
