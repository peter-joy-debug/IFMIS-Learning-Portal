
import { Welcome } from '../components/Welcome/Welcome';
import { HeaderNavbar } from '@/components/Navbar/HeaderNavbar';
import { Hero } from '@/components/Hero/Hero';
import { Categories } from '@/components/Categories/Categories';
import { HomeContent } from '@/components/HomeContent/HomeContent';
import { Ticket } from '@/components/Ticket/Ticket';
import { Footer } from '@/components/Footer/Footer';
import { AllCategories } from '@/components/Categories/AllCategories';
import { Authentication } from '@/components/Auth/Auth';
import { ForgetPassword } from '@/components/Auth/ForgetPassword';
export default function Forget() {
  return (
    <>
      <HeaderNavbar/>
      <ForgetPassword/>
      <Footer/>
    </>
  );
}