import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, Text, Title, Button, useMantineTheme, rem, Container, Grid, Pagination, Group } from '@mantine/core';
import classes from './Categories.module.css';
import { AllCategoryCard } from '../Cards/AllCategoryCard';
import { IconBrandPagekit, IconArrowRight } from '@tabler/icons-react';
export function AllCategories() {

  return (
    <>
    <Container size='lg' style={{marginTop:'-5%', marginBottom:'15%'}}>
    <Title style={{fontWeight:'normal', marginBottom:'50px', fontSize:'16px'}}>All Content Category</Title>
    
    <Grid>
        <Grid.Col span={{ base: 12, xs: 4 }}><AllCategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><AllCategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><AllCategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><AllCategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><AllCategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><AllCategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><AllCategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><AllCategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><AllCategoryCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}> 
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
        </Grid.Col>

    </Grid>
   
    </Container>
    </>
  );
}