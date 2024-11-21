import { Grid, Skeleton, Container, Tabs, Paper, rem, Group } from '@mantine/core';
import { IconDashboard, IconArrowDownRight, IconTicket, IconUser, IconSettings2, IconQuestionMark } from '@tabler/icons-react';
import {jwtDecode} from 'jwt-decode';
import { Profile } from './Profile';
import { Stats } from './Stats';
import AllTickets from './AllTickets';
import { FAQConfig } from './FAQConfig';
import AllTicketsAdmin from './AllTicketAdmin';
import { useState, useEffect } from 'react';
const child = <Skeleton height={140} radius="md" animate={false} />;
type User = {
  first_name: string;
  last_name: string;
  email_address: string;
  user_type: string;
  user_image_id?: string | null;
};

export function MainDashboard() {
    //Escarate ticket or assign, assignee
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decode the token
        const userData = decodedToken.user; // Extract user data
        setUser(userData); // Set user state
      } catch (error) {
        console.error('Failed to decode token:', error);
        setUser(null);
      }
    }
  }, []);
  console.log("USER: ",user?.user_type );
  return (
    <Container size="xl" style={{marginTop:'-7%', marginBottom:'1%'}}>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 12 }}>
        <Tabs defaultValue="dashboard" orientation="horizontal" variant='pills'>
        <Paper shadow='md' style={{padding:'2%', height:'', marginTop:'-3%'}}>
        <Tabs.List>
            <Tabs.Tab value="dashboard">
                <Group><IconDashboard style={{ width: rem(18), height: rem(18) }} stroke={1.5} /> Dashboard</Group>
                 
            </Tabs.Tab>
            <Tabs.Tab value="tickets">
            <Group><IconTicket style={{ width: rem(18), height: rem(18) }} stroke={1.5} /> Ticket</Group>
            </Tabs.Tab>
            <Tabs.Tab value="profile">
            <Group><IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} /> Profile</Group>
            </Tabs.Tab>
            {user?.user_type === 'INSTITUTION_ADMIN' ? 
            <Tabs.Tab value="faq">
            <Group><IconQuestionMark style={{ width: rem(18), height: rem(18) }} stroke={1.5} /> FAQ</Group>
            </Tabs.Tab>
            : ''}
        </Tabs.List>
        </Paper>
        <Tabs.Panel value="dashboard">
            <Stats/>
        </Tabs.Panel>
        <Tabs.Panel value="tickets">
            <br />
            {user?.user_type === 'INSTITUTION_ADMIN' ? <AllTicketsAdmin /> : <AllTickets />}
        </Tabs.Panel>
        <Tabs.Panel value="profile">
          <br />
            <Profile user={user}/>
        </Tabs.Panel>
        <Tabs.Panel value="faq">
           <FAQConfig/>
        </Tabs.Panel>
        </Tabs>
        </Grid.Col>
      </Grid>
    </Container>
  );
}