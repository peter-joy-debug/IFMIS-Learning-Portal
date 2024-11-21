import { Container, Title, Button, Group, Text, List, ThemeIcon, rem, Paper } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import Image from 'next/image';
import image from './image.svg';
import classes from './Hero.module.css';
import { Search } from '../Search/Search';
import cover from '../../public/istockphoto-1311107708-612x612.jpg'
export function Hero() {
  return (
    <Container size="lg">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Create<span className={classes.highlight}>Ticket</span> On Umsebe System
          </Title>
          <Text c="dimmed" mt="md">
          Welcome to our Umsebe Support Portal! Here, access Frequently Asked Questions (FAQ), and submit tickets for any issues or inquiries. 
          </Text>
        
        <Search/>
        </div>
        <Paper shadow='xl' style={{padding:'5%', borderTopLeftRadius:'255px', borderBottomRightRadius:'255px', backgroundColor:'lightblue'}}>
        <Image src={cover} className={classes.image} alt='No Image Found'/>
        </Paper>
      </div>
    </Container>
  );
}