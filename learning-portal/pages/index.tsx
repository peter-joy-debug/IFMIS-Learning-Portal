import Image from "next/image";
import localFont from "next/font/local";
// import ThemeToggle from '../components/ThemeToggle';
import Navbar from '../components/Navbar';
import HeroPage from '../components/HeroPage';
import ArticleCard from '../components/ArticleCard';
import ArticleHandler from '../components/ArticleHandler';

export default function Home() {
  return (
    <div>
    <Navbar/>
    <HeroPage/>
    {/* <ArticleCard/> */}
    <ArticleHandler />
    </div>

  );
}
