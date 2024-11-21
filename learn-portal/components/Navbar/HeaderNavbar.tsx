

import { useState, useEffect, use } from 'react';
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
import Link from 'next/link';


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
          <Link href='/' style={{textDecoration:'none', color:'black'}}>
          <h2>
            Umsebe - <span style={{ fontSize: '15px', fontWeight: 'lighter' }}>Support Portal</span>
          </h2>
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href='/' style={{textDecoration:'none', color:'black'}}> Home </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href='/dashboard' style={{textDecoration:'none', color:'black'}}> My Tickets </Link>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href='/faq' style={{textDecoration:'none', color:'black'}}> FAQ </Link>
          </Group>

          <Group visibleFrom="sm">
          <Link href='/ticket'> 
          <Button rightSection={<IconPlus size={18} />} variant="outline" size="md" radius="md">
              Create Ticket
            </Button>
          </Link>


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
          <Link href='/' style={{textDecoration:'none', color:'black'}}> Home </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href='/dashboard' style={{textDecoration:'none', color:'black'}}> Tickets </Link>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href='/faq' style={{textDecoration:'none', color:'black'}}> FAQ </Link>
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
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
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
