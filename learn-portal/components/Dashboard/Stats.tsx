// import { Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
// import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
// import classes from './Stats.module.css';

// const data = [
//   { title: 'Revenue', value: '$13,456', diff: 34 },
//   { title: 'Profit', value: '$4,145', diff: -13 },
//   { title: 'Coupons usage', value: '745', diff: 18 },
// ];

// export function Stats() {
//   const stats = data.map((stat) => {
//     const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

//     return (
//       <Paper withBorder p="md" radius="md" key={stat.title}>
//         <Group justify="apart">
//           <div>
//             <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={classes.label}>
//               {stat.title}
//             </Text>
//             <Text fw={700} fz="xl">
//               {stat.value}
//             </Text>
//           </div>
//           <ThemeIcon
//             color="gray"
//             variant="light"
//             style={{
//               color: stat.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
//             }}
//             size={38}
//             radius="md"
//           >
//             <DiffIcon size="1.8rem" stroke={1.5} />
//           </ThemeIcon>
//         </Group>
//         <Text c="dimmed" fz="sm" mt="md">
//           <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
//             {stat.diff}%
//           </Text>{' '}
//           {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
//         </Text>
//       </Paper>
//     );
//   });

//   return (
//     <div className={classes.root}>
//       <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Group, Paper, Text, ThemeIcon, SimpleGrid, Loader } from '@mantine/core';
import { IconTicket, IconMessageCircle, IconShare } from '@tabler/icons-react';
import { ticketRoutes } from '../../utils/api';
import classes from './Stats.module.css';


export type Ticket = {
  id: string;
  subject: string;
  senderId: string;
  status: string;
  detail: string;
  department: string[];
  shared: string[];
  attachments: string[];
  assignedTo:string[];
  replies:string[];
  date: string;
  avatar: string;
};

export function Stats() {
  const [totalTickets, setTotalTickets] = useState<number | null>(null);
  const [totalReplies, setTotalReplies] = useState<number | null>(null);
  const [totalShared, setTotalShared] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch all tickets for the user
        const ticketResponse = await ticketRoutes.getTicketsByUser();
        const tickets = ticketResponse.data.tickets;
        console.log("TICKETS: ",tickets);
        
        // Calculate stats
        const ticketCount = tickets.length;
        const replyCount = tickets.reduce((acc: number, ticket: Ticket) => acc + (ticket.replies?.length || 0), 0);
        const sharedCount = tickets.reduce((acc: number, ticket: Ticket) => acc + (ticket.shared?.length || 0), 0);

        setTotalTickets(ticketCount);
        setTotalReplies(replyCount);
        setTotalShared(sharedCount);
      } catch (error) {
        console.error('Failed to fetch ticket stats:', error);
        setTotalTickets(0);
        setTotalReplies(0);
        setTotalShared(0);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <Loader size="lg" />;
  }

  const statsData = [
    {
      title: 'Total Tickets',
      value: totalTickets || 0,
      icon: <IconTicket size="1.8rem" stroke={1.5} />,
      color: 'blue',
    },
    {
      title: 'Total Replies',
      value: totalReplies || 0,
      icon: <IconMessageCircle size="1.8rem" stroke={1.5} />,
      color: 'green',
    },
    {
      title: 'Total Shared Tickets',
      value: totalShared || 0,
      icon: <IconShare size="1.8rem" stroke={1.5} />,
      color: 'orange',
    },
  ];

  const stats = statsData.map((stat) => (
    <Paper withBorder p="md" radius="md" key={stat.title}>
      <Group justify="apart">
        <div>
          <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={classes.label}>
            {stat.title}
          </Text>
          <Text fw={700} fz="xl">
            {stat.value}
          </Text>
        </div>
        <ThemeIcon color={stat.color} variant="light" size={38} radius="md">
          {stat.icon}
        </ThemeIcon>
      </Group>
    </Paper>
  ));

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}
