import { useState } from 'react';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { Badge, Button, Center, Group, Text, TextInput, TextInputProps, ActionIcon, useMantineTheme, rem, Paper, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import {IconArrowRight } from '@tabler/icons-react';

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    title: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
    new: true,
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    title: 'Carol Miller',
    description: 'One of the richest people on Earth',
    new: false,
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    title: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
    new: false,
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    title: 'Spongebob Squarepants',
    description: 'Not just a sponge',
    new: false,
  },
];

export function Search() {
  const [query, setQuery] = useState('');

  const items = data
  .filter((item) => item.title.toLowerCase().includes(query.toLowerCase().trim()))
  .map((item) => (
    <Spotlight.Action key={item.title} onClick={() => console.log(item)}>
      <Group wrap="nowrap" w="100%">
        {item.image && (
          <Center>
            <img src={item.image} alt={item.title} width={50} height={50} />
          </Center>
        )}

        <div style={{ flex: 1 }}>
          <Text>{item.title}</Text>

          {item.description && (
            <Text opacity={0.6} size="xs">
              {item.description}
            </Text>
          )}
        </div>

        {item.new && <Badge variant="default">new</Badge>}
      </Group>
    </Spotlight.Action>
  ));
  const theme = useMantineTheme();
  return (
    <>

    
    <Paper shadow='xl' style={{padding:'10%', borderTopRightRadius:'200px', border:'1.8px solid lightblue', marginTop:'60px'}}>
    {/* <Text c="dark">Search anything</Text> */}

      <TextInput
      radius="md"
      size="lg"
      onClick={spotlight.open}
      placeholder="Search Content ..."
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon size={32} radius="xl" color='dark' variant="filled">
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }

    />
    </Paper>
      <Spotlight.Root query={query} onQueryChange={setQuery} style={{padding:'5%'}}>
        <Paper style={{padding:'2%'}}>
            <Title style={{fontWeight:'normal', fontSize:'20px'}} >How can we help you today ?</Title>
        </Paper>
        <Spotlight.Search placeholder="Search anything here..." leftSection={<IconSearch stroke={1.5} />} style={{padding:'1%'}}/>
        <Spotlight.ActionsList style={{padding:'5%'}}>
          {items.length > 0 ? items : <Spotlight.Empty>Nothing found...</Spotlight.Empty>}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
}