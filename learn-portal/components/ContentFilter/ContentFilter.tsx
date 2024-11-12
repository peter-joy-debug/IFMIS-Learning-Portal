import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper,Text, TextInput, Title, Button, useMantineTheme, rem, Container, Grid, Pagination, Group, MultiSelect , ActionIcon} from '@mantine/core';
// import classes from './Categories.module.css';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { AllCategoryCard } from '../Cards/AllCategoryCard';
import { ContentCard } from '../Cards/ContentCard';
import { IconBrandPagekit } from '@tabler/icons-react';
export function ContentFilter() {
    const theme = useMantineTheme();
  return (
    <>
    <Container size='lg' style={{marginTop:'-5%', marginBottom:'25%'}}>
    <Title style={{fontWeight:'normal', marginBottom:'1%', fontSize:'16px'}}>Filter Content</Title>
    
    <Grid>
        <Grid.Col span={{ base: 12, xs: 12 }}>
        <Paper style={{padding:'2%', borderBottomLeftRadius:'40px', borderTopRightRadius:'40px', border:'1.7px solid lightblue'}} shadow='lg'>
        <Grid>
        <Grid.Col span={{ base: 12, xs: 4 }}>
        <MultiSelect
        label="Category"
        placeholder="Pick category"
        data={['All', 'Angular', 'Vue', 'Svelte']}
        searchable
        defaultValue={["All"]}
        nothingFoundMessage="Nothing found..."
        />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
        <MultiSelect
        label="Module"
        placeholder="Pick module"
        data={['All', 'General Information', 'COA', 'Planning', 'Budget', 'Debtor', 'Vendor', 'Procurement', 'Payroll']}
        searchable
        defaultValue={["All"]}
        nothingFoundMessage="Nothing found..."
        />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
        <Text style={{fontSize:'14px'}}>Search By Keywords</Text>
        <TextInput
        radius="sm"
        size="sm"
        placeholder="Type Keyword Here ..."
        rightSectionWidth={42}
        leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
        rightSection={
            <ActionIcon size={32} radius="md" color={theme.primaryColor} variant="filled">
            <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
        }
        
        />
        </Grid.Col>
        
        </Grid>
        </Paper>
        <br />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><ContentCard/> </Grid.Col>
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