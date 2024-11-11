import { Card, Image, Text, BackgroundImage, Center, Button, Paper, rem, Grid, Container } from '@mantine/core';
import { IconBrandPagekit } from '@tabler/icons-react';
import { ContentCard } from '../Cards/ContentCard';
import { IconArrowRight } from '@tabler/icons-react';

export function HomeContent() {
  return (
    <Container size='xl' pt={60}>
    <Paper style={{padding:'0%'}}>
    <Grid>
    <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
    <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
    <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
    <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
    <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
    <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
    <Grid.Col span={{ base: 12, xs: 4 }}></Grid.Col>
    <Grid.Col span={{ base: 12, xs: 4 }}>
    <Button variant='outline' c='dark' color='lightgrey' size='md' style={{ marginTop:'15px', width:'100%'}} rightSection={<IconArrowRight size={20} />}>Load More Content</Button>     
    </Grid.Col>
    </Grid>
    <Center>
    
    </Center>
    </Paper>
    </Container>
  );
}