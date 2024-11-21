import { Anchor, Group, ActionIcon, rem, Container, Text } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Footer.module.css';
import Link from 'next/link';

const links = [
  { link: '/', label: 'Home' },
  { link: '/dashboard', label: 'Tickets' },
  { link: '/faq', label: 'FAQ' },
];

export function Footer() {
  // const items = links.map((link) => (
  //   <Link
  //     key={link.label}
  //     href={link.link}
  //     style={{textDecoration:'none', color:'black'}}
  //   >
  //     {link.label}
  //   </Link>
  // ));

  return (
    <Container className={classes.footer} fluid>
      <div className={classes.inner}>
      <Link href='/' style={{textDecoration:'none', color:'black'}}>
          <h2>
            Umsebe - <span style={{ fontSize: '15px', fontWeight: 'lighter' }}>Support Portal</span>
          </h2>
          </Link>

        <Group className={classes.links} style={{marginLeft:'15%'}}>
        {/* {items} */}
        </Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
        
        <Text c="dimmed" size="sm">
          © 2024 Umsebe System. All rights reserved.
        </Text>
        </Group>
      </div>
    </Container>
  );
}