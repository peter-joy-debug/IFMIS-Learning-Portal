import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots';
import classes from './Ticket.module.css';
import Link from 'next/link';


export function Ticket() {
  return (
    <Container fluid className={classes.wrapper} size='xl' style={{marginTop:'5%', paddingBottom:'20%', backgroundColor:''}}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />
      <br /> <br />
      <div className={classes.inner} style={{backgroundColor:'', width:'90%'}}>
        <center>
        <Title className={classes.title}>
          Create {' '}
          <Text component="span" className={classes.highlight} inherit>
            Ticket
          </Text>{' '}
          with Us!
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            With this portal you can create a ticket for any enquiry, our team will respond to you as soon as possible.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link href='/ticket'>
          <Button className={classes.control} size="lg" variant="light">
            Create Ticket
          </Button>
          </Link>
        </div>
        </center>
      </div>
    </Container>
  );
}