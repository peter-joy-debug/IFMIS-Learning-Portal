import { Image, Accordion, Grid, Container, Title,Text, Pagination, Paper, Group, ActionIcon, rem , Tooltip} from '@mantine/core';
import image from './image.svg';
import classes from './FAQ.module.css';
import { IconHeart, IconBookmark, IconShare, IconThumbUp, IconThumbDown, IconMessage } from '@tabler/icons-react';

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';

export function FAQ() {
  return (
    <div className={classes.wrapper} style={{marginTop:'-10%', marginBottom:'15%'}}>
      <Container size="lg" >
        <Text>FAQs Section</Text>
        <br />
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Image style={{borderTopLeftRadius:'100px',borderBottomRightRadius:'100px'}} src='https://plus.unsplash.com/premium_photo-1678216285963-253d94232eb7?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Frequently Asked Questions" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Paper style={{padding:'5%'}} shadow='lg'>
            <Title order={2} ta="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated">
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>How can I reset my password?</Accordion.Control>
                <Accordion.Panel>{placeholder}
                <Group gap={10} style={{marginTop:'2%'}}>
                <Tooltip label="Like" withArrow arrowOffset={26} arrowSize={8}>
                <ActionIcon variant="subtle" color="gray">
                    <IconThumbUp
                    style={{ width: rem(30), height: rem(30) }}
                    color='grey'
                    stroke={1.5}
                    />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Dislike" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconThumbDown
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
              <Tooltip label="Add Comment" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconMessage
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
            </Group>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>Can I create more that one account?</Accordion.Control>
                <Accordion.Panel>{placeholder}
                <Group gap={10} style={{marginTop:'2%'}}>
                <Tooltip label="Like" withArrow arrowOffset={26} arrowSize={8}>
                <ActionIcon variant="subtle" color="gray">
                    <IconThumbUp
                    style={{ width: rem(30), height: rem(30) }}
                    color='grey'
                    stroke={1.5}
                    />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Dislike" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconThumbDown
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
              <Tooltip label="Add Comment" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconMessage
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
            </Group>
                </Accordion.Panel>
                
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>How can I subscribe to monthly newsletter?</Accordion.Control>
                <Accordion.Panel>{placeholder}
                <Group gap={10} style={{marginTop:'2%'}}>
                <Tooltip label="Like" withArrow arrowOffset={26} arrowSize={8}>
                <ActionIcon variant="subtle" color="gray">
                    <IconThumbUp
                    style={{ width: rem(30), height: rem(30) }}
                    color='grey'
                    stroke={1.5}
                    />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Dislike" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconThumbDown
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
              <Tooltip label="Add Comment" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconMessage
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
            </Group>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Do you store credit card information securely?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}
                <Group gap={10} style={{marginTop:'2%'}}>
                <Tooltip label="Like" withArrow arrowOffset={26} arrowSize={8}>
                <ActionIcon variant="subtle" color="gray">
                    <IconThumbUp
                    style={{ width: rem(30), height: rem(30) }}
                    color='grey'
                    stroke={1.5}
                    />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Dislike" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconThumbDown
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
              <Tooltip label="Add Comment" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconMessage
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
            </Group>
                </Accordion.Panel>
              </Accordion.Item>


              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Do you store credit card information securely?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}
                <Group gap={10} style={{marginTop:'2%'}}>
                <Tooltip label="Like" withArrow arrowOffset={26} arrowSize={8}>
                <ActionIcon variant="subtle" color="gray">
                    <IconThumbUp
                    style={{ width: rem(30), height: rem(30) }}
                    color='grey'
                    stroke={1.5}
                    />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Dislike" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconThumbDown
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
              <Tooltip label="Add Comment" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconMessage
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
            </Group>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Do you store credit card information securely?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}
                <Group gap={10} style={{marginTop:'2%'}}>
                <Tooltip label="Like" withArrow arrowOffset={26} arrowSize={8}>
                <ActionIcon variant="subtle" color="gray">
                    <IconThumbUp
                    style={{ width: rem(30), height: rem(30) }}
                    color='grey'
                    stroke={1.5}
                    />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Dislike" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconThumbDown
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
              <Tooltip label="Add Comment" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconMessage
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
            </Group>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Do you store credit card information securely?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}
                <Group gap={10} style={{marginTop:'2%'}}>
                <Tooltip label="Like" withArrow arrowOffset={26} arrowSize={8}>
                <ActionIcon variant="subtle" color="gray">
                    <IconThumbUp
                    style={{ width: rem(30), height: rem(30) }}
                    color='grey'
                    stroke={1.5}
                    />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Dislike" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconThumbDown
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
              <Tooltip label="Add Comment" withArrow arrowOffset={26} arrowSize={8}>
              <ActionIcon variant="subtle" color="gray">
                <IconMessage
                  style={{ width: rem(30), height: rem(30) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              </Tooltip>
            </Group>
                </Accordion.Panel>
              </Accordion.Item>



            </Accordion>
            {/* <Paper> */}
                <br /><br />
            <Pagination.Root total={5}>
            <Group gap={5} justify="center">
                <Pagination.First />
                <Pagination.Previous />
                <Pagination.Items />
                <Pagination.Next />
                <Pagination.Last />
            </Group>
            </Pagination.Root>
            {/* </Paper> */}
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}