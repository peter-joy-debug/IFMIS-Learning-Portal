import { Anchor, Group, ActionIcon, rem, Container, Text } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Footer.module.css';


const links = [
  { link: '#', label: 'Home' },
  { link: '#', label: 'Learn' },
  { link: '#', label: 'FAQ' },
  { link: '#', label: 'About' },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Container className={classes.footer} fluid>
      <div className={classes.inner}>
      <h2>Umsebe - <span style={{fontSize:'15px', fontWeight:'lighter'}}> Support Portal</span></h2>

        <Group className={classes.links} style={{marginLeft:'15%'}}>
        {items}
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