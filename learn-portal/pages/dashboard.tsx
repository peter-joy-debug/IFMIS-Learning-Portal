import { Welcome } from '../components/Welcome/Welcome';
import { HeaderNavbar } from '@/components/Navbar/HeaderNavbar';
import { Hero } from '@/components/Hero/Hero';
import { Categories } from '@/components/Categories/Categories';
import { HomeContent } from '@/components/HomeContent/HomeContent';
import { Ticket } from '@/components/Ticket/Ticket';
import { Footer } from '@/components/Footer/Footer';
import { AllCategories } from '@/components/Categories/AllCategories';
// import { FAQ } from '@/components/FAQ/FAQ';
import ProtectedRoute from '../components/ProtectedRoute';
import { MainDashboard } from '@/components/Dashboard/Main';
export default function Dashboard() {
  return (
    <>
    <ProtectedRoute>
      <HeaderNavbar/>
      <MainDashboard/>
      {/* <Footer/> */}
    </ProtectedRoute>
    </>
  );
}