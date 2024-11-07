import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ThemeToggle from '../components/ThemeToggle';

export default function App({ Component, pageProps }: AppProps) {
  <ThemeToggle />
  return <Component {...pageProps} />;
}
