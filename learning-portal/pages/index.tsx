import Image from "next/image";
import localFont from "next/font/local";
// import ThemeToggle from '../components/ThemeToggle';
import Navbar from '../components/Navbar';
import HeroPage from '../components/HeroPage';


export default function Home() {
  return (
    <div>
  <Navbar/>
  <HeroPage/>
    </div>

  );
}
