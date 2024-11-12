import { Grid, Skeleton, Container, Group, Button, UnstyledButton, Avatar, Text , rem, ActionIcon, Paper} from '@mantine/core';
import { IconChevronRight, IconStarFilled, IconShare, IconThumbUp, IconThumbDown, IconBookmarkFilled, IconBookmark } from '@tabler/icons-react';
import classes from './ControlSection.module.css';
const child = <Skeleton height={50} radius="md" animate={false} />;

export function ControlSection() {
  return (

      <Grid>
        <Grid.Col span={{ base: 12, xs: 7 }}>
        <Group gap="sm">

        <Paper className={classes.user} style={{backgroundColor:'rgba(0,0,0,0.0)', fontWeight:'none', textDecoration:'none', boxShadow:'none'}}>
            <Group>
                <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                radius="xl"
                />

                <div style={{ flex: 1 }}>
                <Text c="dimmed" size="xs">
                Published By
                </Text>
                <Text size="sm" fw={400}>
                 Harriette Spoonlicker
                </Text>
                <Text c="dimmed" size="xs">
                hspoonlicker@outlook.com
                </Text>
                </div>

                <div style={{ flex: 1 }}>
                <Text c="dimmed" size="xs">
                Date 
                </Text>
                <Text size="sm" fw={400}>
                12 - November - 2024
                </Text>
                </div>

                <div style={{ flex: 1 }}>
                <Text c="dimmed" size="xs">
                Reviewed By 
                </Text>
                <Text size="sm" fw={400}>
                <IconStarFilled style={{ width: rem(14), height: rem(14) }} stroke={1.5} /> 4.9 (1220 People)
                </Text>
                </div>
            </Group>
            </Paper>
        </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 5 }}>

        <Paper className={classes.user} style={{backgroundColor:'rgba(0,0,0,0.0)', fontWeight:'none', textDecoration:'none', boxShadow:'none'}}>
            <Group grow>
                <div style={{ flex: 1 }}>
                <Text c="dimmed" size="xs">
                1278 Likes
                </Text>
                <ActionIcon variant="subtle" color="gray">
                <IconThumbUp
                  style={{ width: rem(25), height: rem(25) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
                </div>

                <div style={{ flex: 1 }}>
                <Text c="dimmed" size="xs">
                72 Dislikes
                </Text>
                <ActionIcon variant="subtle" color="gray">
                <IconThumbDown
                  style={{ width: rem(25), height: rem(25) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
                </div>
                <div style={{ flex: 1 }}>
                <Text c="dimmed" size="xs">
                Bookmarked
                </Text>
                <ActionIcon variant="subtle" color="gray">
                <IconBookmarkFilled
                  style={{ width: rem(25), height: rem(25) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
                </div>
                <div style={{ flex: 1 }}>
                <Text c="dimmed" size="xs">
                Share Now
                </Text>
                <ActionIcon variant="subtle" color="gray">
                <IconShare
                  style={{ width: rem(25), height: rem(25) }}
                  color='grey'
                  stroke={1.5}
                />
              </ActionIcon>
                </div>
            </Group>
            </Paper>

        </Grid.Col>
      </Grid>

  );
}