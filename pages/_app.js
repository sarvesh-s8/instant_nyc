import "@/styles/globals.css";
import axios from "axios";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { parseCookies, destroyCookie } from "nookies";
import Head from "../components/Head/index";
import { redirectUser } from "@/utils/authentication";
import backendUrl from "@/utils/baseUrl";
import Layout from "@/components/Layout";
function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps}>
          <Layout {...pageProps}>
            <ToastContainer />
            <Head title={pageProps.title} />
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
App.getInitialProps = async ({ ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};
  const protectedRoutes = ctx.pathname === "/feed";
  const adminRoutes =
    ctx.pathname === "/admin" ||
    ctx.pathname === "/events/new" ||
    ctx.pathname === "/admin/info";
  const unProtectedRoutes =
    ctx.pathname === "/home" ||
    ctx.pathname === "/posts/[id]" ||
    ctx.pathname === "/search" ||
    ctx.pathname === "/announcement" ||
    ctx.pathname === "/events";
  if (!token) {
    destroyCookie(ctx, "token");
    protectedRoutes && redirectUser(ctx, "/login");
  } else {
    try {
      const res = await axios.get(`${backendUrl}/api/auth`, {
        headers: { Authorization: token },
      });
      const { user } = res.data;
      if (user && !unProtectedRoutes) {
        !protectedRoutes && redirectUser(c, "/home");
      }
      pageProps.user = user;
    } catch (e) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/login");
    }
  }
  return { pageProps };
};
export default App;
