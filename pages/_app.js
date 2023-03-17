import "@/styles/globals.css";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import {} from "react"

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
