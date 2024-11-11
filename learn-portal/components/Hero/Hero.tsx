import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem, Paper } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from './image.svg';
import classes from './Hero.module.css';
import { Search } from '../Search/Search';
export function Hero() {
  return (
    <Container size="lg">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>modern</span> React <br /> components library
          </Title>
          <Text c="dimmed" mt="md">
          Welcome to our IFMIS Support Portal! Here, you can access learning content, Frequently Asked Questions (FAQ), and submit tickets for any issues or inquiries. 
          </Text>
        
        <Search/>
        </div>
        <Paper shadow='xl' style={{padding:'5%', borderTopLeftRadius:'255px', borderBottomRightRadius:'255px', backgroundColor:'lightblue'}}>
        <Image src="https://media.istockphoto.com/id/1311107708/photo/focused-cute-stylish-african-american-female-student-with-afro-dreadlocks-studying-remotely.webp?b=1&s=612x612&w=0&k=20&c=fpQZIyrCZorMYI4DoEP6opgP0IzXnlEFVlK3lOWIWEM=" className={classes.image} />
        </Paper>
      </div>
    </Container>
  );
}