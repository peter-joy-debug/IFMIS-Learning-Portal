// import {
//     HoverCard,
//     Group,
//     Button,
//     UnstyledButton,
//     Text,
//     SimpleGrid,
//     ThemeIcon,
//     Anchor,
//     Divider,
//     Center,
//     Box,
//     Burger,
//     Drawer,
//     Collapse,
//     ScrollArea,
//     rem,
//     useMantineTheme,
//   } from '@mantine/core';

//   import { useDisclosure } from '@mantine/hooks';
//   import {
//     IconNotification,
//     IconCode,
//     IconBook,
//     IconChartPie3,
//     IconFingerprint,
//     IconCoin,
//     IconChevronDown,
//     IconPlus
//   } from '@tabler/icons-react';
//   import classes from './HeaderNavbar.module.css';
//   import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
  
//   const mockdata = [
//     {
//       icon: IconCode,
//       title: 'Open source',
//       description: 'This Pokémon’s cry is very loud and distracting',
//     },
//     {
//       icon: IconCoin,
//       title: 'Free for everyone',
//       description: 'The fluid of Smeargle’s tail secretions changes',
//     },
//     {
//       icon: IconBook,
//       title: 'Documentation',
//       description: 'Yanma is capable of seeing 360 degrees without',
//     },
//     {
//       icon: IconFingerprint,
//       title: 'Security',
//       description: 'The shell’s rounded shape and the grooves on its.',
//     },
//     {
//       icon: IconChartPie3,
//       title: 'Analytics',
//       description: 'This Pokémon uses its flying ability to quickly chase',
//     },
//     {
//       icon: IconNotification,
//       title: 'Notifications',
//       description: 'Combusken battles with the intensely hot flames it spews',
//     },
//   ];
  
//   export function HeaderNavbar() {
//     const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
//     const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
//     const theme = useMantineTheme();
  
//     const links = mockdata.map((item) => (
//       <UnstyledButton className={classes.subLink} key={item.title}>
//         <Group wrap="nowrap" align="flex-start">
//           <ThemeIcon size={34} variant="default" radius="md">
//             <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
//           </ThemeIcon>
//           <div>
//             <Text size="sm" fw={500}>
//               {item.title}
//             </Text>
//             <Text size="xs" c="dimmed">
//               {item.description}
//             </Text>
//           </div>
//         </Group>
//       </UnstyledButton>
//     ));
  
//     return (
//       <Box pb={120}>
//         <header className={classes.header}>
//           <Group justify="space-between" h="100%">
//             <h2>Umsebe - <span style={{fontSize:'15px', fontWeight:'lighter'}}> Support Portal</span></h2>
  
//             <Group h="100%" gap={0} visibleFrom="sm">
//               <a href="#" className={classes.link}>
//                 Home
//               </a>

//               <a href="#" className={classes.link}>
//                 Learn
//               </a>
//               <a href="#" className={classes.link}>
//                 FAQ
//               </a>
//             </Group>
  
//             <Group visibleFrom="sm">
//             <Button rightSection={<IconPlus size={18} />} variant="outline" size="md" radius="md">Create Ticket</Button>
//             <Button variant="default" size="md" radius="md">Log in</Button>
//             <ColorSchemeToggle/>
              
//             </Group>
  
//             <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
//           </Group>
//         </header>
  
//         <Drawer
//           opened={drawerOpened}
//           onClose={closeDrawer}
//           size="100%"
//           padding="md"
//           title="Navigation"
//           hiddenFrom="sm"
//           zIndex={1000000}
//         >
//           <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
//             <Divider my="sm" />
  
//             <a href="#" className={classes.link}>
//               Home
//             </a>
//             <Collapse in={linksOpened}>{links}</Collapse>
//             <a href="#" className={classes.link}>
//               Learn
//             </a>
//             <a href="#" className={classes.link}>
//               FAQ
//             </a>
  
//             <Divider my="sm" />
  
//             <Group justify="center" grow pb="xl" px="md">
//             <Button rightSection={<IconPlus size={18} />} variant="outline" size="md" radius="md">Create Ticket</Button>
//             <Button variant="default" size="md" radius="md">Log in</Button>
//             <ColorSchemeToggle/>
//             </Group>
//           </ScrollArea>
//         </Drawer>
//       </Box>
//     );
//   }

import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'next/router';
import {
  Group,
  Button,
  Avatar,
  Menu,
  UnstyledButton,
  Text,
  Box,
  Divider,
  Drawer,
  ScrollArea,
  rem,
  Burger,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconPlus,
  IconLogout,
  IconChevronRight,
} from '@tabler/icons-react';
import classes from './HeaderNavbar.module.css';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { notifications } from '@mantine/notifications';

type User = {
  first_name: string;
  last_name: string;
  email_address: string;
  user_image_id?: string | null;
};

export function HeaderNavbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from storage
    setUser(null);
    notifications.show({
      title:'Logged Out',
      message:'You Logged Out from the System',
      color: 'red',
      autoClose: 5000,
      position: 'top-right',
      withCloseButton: true,
      style:{width:'80%'}
    });
    router.push('/authentication'); // Redirect to login page
    console.log('User logged out');
  };

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <h2>
            Umsebe - <span style={{ fontSize: '15px', fontWeight: 'lighter' }}>Support Portal</span>
          </h2>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Home
            </a>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              FAQ
            </a>
          </Group>

          <Group visibleFrom="sm">
            <Button rightSection={<IconPlus size={18} />} variant="outline" size="md" radius="md">
              Create Ticket
            </Button>

            {user ? (
              <Menu withArrow>
                <Menu.Target>
                  <UnstyledButton
                    style={{
                      padding: 'var(--mantine-spacing-md)',
                      color: 'var(--mantine-color-text)',
                      borderRadius: 'var(--mantine-radius-sm)',
                    }}
                  >
                    <Group>
                      <Avatar
                        src={user.user_image_id || 'https://via.placeholder.com/150'} // Fallback avatar
                        radius="xl"
                      />
                      <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>
                          {user.first_name} {user.last_name}
                        </Text>
                        <Text c="dimmed" size="xs">
                          {user.email_address}
                        </Text>
                      </div>
                      <IconChevronRight size="1rem" />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconLogout />} onClick={handleLogout}>
                    Log Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button
                variant="default"
                size="md"
                radius="md"
                onClick={() => (window.location.href = '/authentication')}
              >
                Log In
              </Button>
            )}

            <ColorSchemeToggle />
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            FAQ
          </a>
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button rightSection={<IconPlus size={18} />} variant="outline" size="md" radius="md">
              Create Ticket
            </Button>
            {user ? (
              <Button variant="default" size="md" radius="md" onClick={handleLogout}>
                Log Out
              </Button>
            ) : (
              <Button
                variant="default"
                size="md"
                radius="md"
                onClick={() => (window.location.href = '/authentication')}
              >
                Log In
              </Button>
            )}
            <ColorSchemeToggle />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
