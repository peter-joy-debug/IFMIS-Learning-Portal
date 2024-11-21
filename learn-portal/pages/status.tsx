
import { Welcome } from '../components/Welcome/Welcome';
import { HeaderNavbar } from '@/components/Navbar/HeaderNavbar';
import { Hero } from '@/components/Hero/Hero';
import { Categories } from '@/components/Categories/Categories';
import { HomeContent } from '@/components/HomeContent/HomeContent';
import { Ticket } from '@/components/Ticket/Ticket';
import { Footer } from '@/components/Footer/Footer';
import { ContentFilter } from '@/components/ContentFilter/ContentFilter';
import { useRouter } from 'next/router';
import CryptoJS from 'crypto-js';
import { AssignUserToTicket } from '@/components/Dashboard/AssignToTicket';
import { Container, Text, Grid, Button, Group, Center, Paper } from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';
import Link from 'next/link';
import { ChangeTicketStatus } from '@/components/Dashboard/ChangeStatus';
import ProtectedRoute from '../components/ProtectedRoute';

const secretKey = 'your_secret_key'; // Use the same secret key as above

const StatusPage = () => {
  const router = useRouter();
  const { data } = router.query;

  let decryptedData = null;

  if (data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, secretKey);
      decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Failed to decrypt data:', error);
    }
  }

  return (
    <>
    <ProtectedRoute>
    <HeaderNavbar/>
    <Container size='sm' style={{margin:'-4% 0% 20% 25%'}}>
    <Link href='/dashboard' style={{textDecoration:'none'}}>
    <Button variant='outline' radius='sm' color='grey' leftSection={<IconArrowBackUp size={20} color='grey'/>}>Back to Tickets</Button>
    </Link>
    <br />
    <br />
    <Paper style={{padding:'5%'}} shadow='md'>
    <Grid>
        <Grid.Col span={12}>
        <Text fw={600} size='xl' style={{textAlign:'center', borderBottomLeftRadius:'100px', borderBottom:'1px solid lightblue',borderBottomRightRadius:'100px', paddingBottom:'1%'}}> Change Ticket Status </Text>
        </Grid.Col>


      {decryptedData ? (<>
        <Grid.Col span={12}>
            <Group>
            <Text>Ticket Subject: </Text>
            <Text fw={600}>{decryptedData.subject}</Text>
            </Group>

        </Grid.Col>
        <Grid.Col span={12}>
        <ChangeTicketStatus ticketId={decryptedData.ticketId}/>
        </Grid.Col>

        </>
      ) : (
        <p>No data available</p>
      )}
    </Grid>
    </Paper>
    </Container>
    <Footer/>
    </ProtectedRoute>
    </>
  );
};

export default StatusPage;
