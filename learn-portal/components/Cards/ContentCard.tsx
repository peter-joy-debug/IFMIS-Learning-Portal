import {
    Card,
    Image,
    ActionIcon,
    Group,
    Text,
    Avatar,
    Badge,
    useMantineTheme,
    rem,
  } from '@mantine/core';
  import { IconHeart, IconBookmark, IconShare, IconThumbUp, IconThumbDown } from '@tabler/icons-react';
  import classes from './ContentCard.module.css';
  
  export function ContentCard() {
    const theme = useMantineTheme();
  
    return (
      <Card withBorder padding="lg" radius="md" className={classes.card} style={{marginTop:'20px'}}>
        <Card.Section mb="sm">
          <Image
            src="https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            alt="Top 50 underrated plants for house decoration"
            height={230}
          />
        </Card.Section>
  
        <Badge w="fit-content" variant="outline">
          Authentication
        </Badge>
  
        <Text fw={500} className={classes.title} mt="xs">
          Top 50 underrated plants for house decoration, today it is good
        </Text>
  
        <Group mt="lg">
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
            radius="lg"
          />
          <div>
            <Text fw={350}>Elsa Gardenowl</Text>
            <Text fz="xs" c="dimmed">
              posted 34 minutes ago
            </Text>
          </div>
        </Group>
  
        <Card.Section className={classes.footer}>
          <Group justify="space-between">
            <Text fz="xs" c="dimmed">
              733 people liked this
            </Text>
            <Group gap={0}>
              <ActionIcon variant="subtle" color="gray">
                <IconThumbUp
                  style={{ width: rem(20), height: rem(20) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray">
                <IconThumbDown
                  style={{ width: rem(20), height: rem(20) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray">
                <IconBookmark
                  style={{ width: rem(20), height: rem(20) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray">
                <IconShare
                  style={{ width: rem(20), height: rem(20) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          </Group>
        </Card.Section>
      </Card>
    );
  }