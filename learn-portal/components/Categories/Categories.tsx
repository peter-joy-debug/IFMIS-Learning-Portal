import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, Text, Title, Button, useMantineTheme, rem, Container, Grid } from '@mantine/core';
import classes from './Categories.module.css';
import { CategoryCard } from '../Cards/CategoryCard';
import { IconBrandPagekit, IconArrowRight } from '@tabler/icons-react';
export function Categories() {

  return (
    <>
    <Container size='lg' style={{marginTop:'12px'}}>
    <Title style={{fontWeight:'normal', marginBottom:'50px', fontSize:'20px'}}>Our category</Title>
    
    <Grid>
        <Grid.Col span={{ base: 12, xs: 3 }}><CategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}><CategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}><CategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}><CategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}> <Button variant='outline' c='dark' color='grey' size='md' style={{width:'100%', marginTop:'15px'}} rightSection={<IconArrowRight size={20} />}>See More Categories</Button></Grid.Col>
    </Grid>
   
    </Container>
    </>
  );
}