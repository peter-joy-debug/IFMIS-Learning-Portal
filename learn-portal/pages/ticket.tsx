
import { Welcome } from '../components/Welcome/Welcome';
import { HeaderNavbar } from '@/components/Navbar/HeaderNavbar';
import { Hero } from '@/components/Hero/Hero';
import { Categories } from '@/components/Categories/Categories';
import { HomeContent } from '@/components/HomeContent/HomeContent';
import { Ticket } from '@/components/Ticket/Ticket';
import { Footer } from '@/components/Footer/Footer';
import { ContentFilter } from '@/components/ContentFilter/ContentFilter';
import { SingleContentPage } from '@/components/SingleContentPage/SingleContentPage';
import { TicketForm } from '@/components/Ticket/TicketForm';
import ProtectedRoute from '../components/ProtectedRoute';

export default function TicketPage() {
  return (
    <>
    <ProtectedRoute>
      <HeaderNavbar/>
      <TicketForm/>
      <Footer/>
    </ProtectedRoute>
    </>
  );
}