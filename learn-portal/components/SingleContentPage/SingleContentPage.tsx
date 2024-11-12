import { Grid, Skeleton, Container, Paper, Image, Text, Center, Box, Group, Button, Slider, Textarea, Select, Avatar, ActionIcon, rem } from '@mantine/core';
import { TableOfContent } from './TableOfContent';
import { ControlSection } from './ControlsSection';
import { IconChevronRight, IconThumbUp, IconThumbDown, IconMessage } from '@tabler/icons-react';
import { ContentCard } from '../Cards/ContentCard';
const child = <Skeleton height={500} radius="md" animate={false} />;

export function SingleContentPage() {
  return (
    <Container size="xl" fluid style={{marginTop:'-7%', marginBottom:'25%'}}>
      <Grid>
        
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <Paper>
        <Center  h={400} bg="lightblue">
        <Box bg="" style={{paddingLeft:'7%'}}>
        <Paper style={{padding:'2%', borderTopLeftRadius:'20px', borderTopRightRadius:'20px', backgroundColor:'rgba(0,0,0,0.0)'}}>
        <Text size="43px" fw={300} style={{textAlign:'center'}} c='dark'>
                 How to recover your username after loosing your password, for instance if it is a new account ?
        </Text>
        </Paper>
        </Box>
        </Center>
        </Paper>
    </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 3 }} style={{marginTop:'-7%', marginLeft:'2%'}}>
        <Paper>
            <TableOfContent/>
        </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 8.7 }} style={{marginTop:'0%', marginRight:'-12%',backgroundColor:''}}>

        <Paper style={{marginTop:'-7%',marginBottom:'5%', borderRadius:'20px', backgroundColor:'', borderTop:'5px solid grey', padding:'1%'}} shadow='xl'>
            <ControlSection/>
        </Paper>

        <Paper style={{padding:'1% 2%'}}>
        
            <Text size="30px" fw={400} style={{textAlign:'start', marginBottom:'2%'}}>
                 Summary
            </Text>
            <Text c="dimmed" size="md" style={{textAlign:'start', marginBottom:'2%'}}>
                10000 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sed corrupti similique ipsum illum delectus ex facere. Maiores earum dolores velit ratione blanditiis eum expedita? Quia consequuntur labore eligendi ipsa? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos ratione, eveniet beatae explicabo error, tempore sed eos officiis assumenda at adipisci sequi! Deserunt voluptatem facere consectetur vitae minus ratione autem. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus assumenda quos perspiciatis enim? Veniam adipisci nulla cupiditate a molestiae sit nemo, totam accusamus doloribus ut sunt debitis labore quasi corrupti!
            </Text>

 
        </Paper>

        </Grid.Col>

      </Grid>

      <Grid>
      <Grid.Col span={{ base: 12, xs: 12 }} style={{padding:'4%', marginTop:'0%'}}>
        <Paper>
            <Text size="30px" fw={400} style={{textAlign:'start', marginBottom:'2%'}}>
                 Reseting Password
            </Text>
            {child}
            <br />
            <Text c="dimmed" size="md" style={{textAlign:'start', marginBottom:'2%'}}>
                10000 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sed corrupti similique ipsum illum delectus ex facere. Maiores earum dolores velit ratione blanditiis eum expedita? Quia consequuntur labore eligendi ipsa? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos ratione, eveniet beatae explicabo error, tempore sed eos officiis assumenda at adipisci sequi! Deserunt voluptatem facere consectetur vitae minus ratione autem. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus assumenda quos perspiciatis enim? Veniam adipisci nulla cupiditate a molestiae sit nemo, totam accusamus doloribus ut sunt debitis labore quasi corrupti!
            </Text>
            <Text size="30px" fw={400} style={{textAlign:'start', marginBottom:'2%'}}>
                 Setting New Password
            </Text>
            <Text c="dimmed" size="md" style={{textAlign:'start', marginBottom:'2%'}}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum inventore iure nostrum amet assumenda magni soluta blanditiis tenetur! Cum sed, autem doloremque, iusto ea odit illum aliquid, aperiam ipsum nemo veritatis dolores? Aspernatur maxime repellat quisquam magni nisi commodi iure dolore tempora, dolores sapiente culpa qui voluptate incidunt. Debitis, corrupti laboriosam ullam corporis hic tempore doloremque odit neque culpa ea quia facilis tenetur quam perspiciatis maiores, quidem qui odio ipsa voluptates nemo error minima animi blanditiis? Veniam est natus rem nulla ea magni quae provident sapiente, eveniet obcaecati minus temporibus repellat cupiditate. Nemo odio aut accusantium officiis natus animi enim.
            </Text>
            <Grid style={{marginBottom:'2%'}}>
            <Grid.Col span={{ base: 12, xs: 6 }} style={{padding:'0% 1%', marginTop:'0%'}}>
            {child}
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 6 }} style={{padding:'0% 1%', marginTop:'0%'}}>
            {child}
            </Grid.Col>
            </Grid>
            <Text c="dimmed" size="md" style={{textAlign:'start', marginBottom:'2%'}}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima asperiores doloribus porro, modi suscipit natus. Id error quaerat porro, ullam libero autem quasi unde perferendis veniam minima repudiandae commodi delectus, nemo at architecto quae exercitationem! Ab in cumque quo praesentium ducimus pariatur, aut facere saepe sunt illum repellendus quod eligendi repellat natus voluptas error doloribus unde aperiam fugit ea quaerat. Repudiandae molestias nobis cum quos possimus maxime quisquam libero magnam quod obcaecati blanditiis modi eligendi nostrum, culpa quasi? Impedit corrupti, labore aperiam fugiat voluptatibus quidem laudantium similique minus animi iusto cum cumque esse eos aliquam eveniet ex, officiis reprehenderit! Asperiores neque eos sequi sunt veniam quaerat cum officiis magnam dolores minus debitis harum mollitia, placeat ipsam nobis quod facilis eius pariatur, aspernatur enim magni molestias quis officia. Deleniti quaerat alias ducimus sint quam ut excepturi accusamus? Quas consequuntur possimus ipsam earum quaerat quia maiores et? Eum, dolorum ex officia iste quia veniam nihil, rem omnis nam illum minus deserunt totam eaque molestias velit quas? Doloremque ipsum optio similique distinctio eveniet, velit quisquam in debitis dolorem fugiat asperiores, libero voluptatibus quaerat quidem impedit maxime placeat. Iusto culpa vitae voluptatem veniam fugit a officiis porro voluptatibus dicta fuga. Quod ex sunt provident.
            </Text>
            <Text size="30px" fw={400} style={{textAlign:'start', marginBottom:'2%'}}>
                 Conclusion
            </Text>
            <Text c="dimmed" size="md" style={{textAlign:'start', marginBottom:'2%'}}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum veritatis aliquam, magni, qui deserunt eius itaque quo dolor similique tenetur vel non illo numquam tempora quis ex. Rem earum facere minus! Excepturi incidunt aliquid animi saepe qui. Laborum libero consequuntur, esse autem placeat quod aspernatur, mollitia, vitae eligendi aliquid amet.
            </Text>
            <br />
            <hr />
        </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12 }} style={{padding:'0% 4%', marginTop:'0%'}}>

        <p>Was this content helpful?</p>
        <Group>
        <Button variant='outline' color='dark'>Yes</Button>
        <Button variant='outline' color='dark' radius='sm'>No</Button>
        </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12 }} style={{padding:'0% 4%', marginTop:'0%'}}>
        <Paper>
            <Text size="20px" fw={500} style={{margin:'1.7% 0%'}}>Add Review</Text>
            <Text style={{marginBottom:'3%'}}>Your reviews are very important to our content, Please drag the slider below to the percentage you want and click on Submit.</Text>
            <Grid style={{marginBottom:'2%'}}>
            <Grid.Col span={{ base: 12, xs: 6 }} style={{padding:'0% 0%', marginTop:'2%', marginBottom:'0%'}}>
            <Slider
                color="lightblue"
                size="xl"
                style={{width:'100%'}}
                marks={[
                    { value: 20, label: '20%' },
                    { value: 50, label: '50%' },
                    { value: 80, label: '80%' },
                    { value: 100, label: '100%' },
                ]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 6 }} style={{padding:'0% 4%', marginTop:'2%'}}>
            <Button variant='outline' color='dark' size='sm'>Submit</Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 10 }} style={{padding:'0% 0%', marginTop:'2%'}}>
            <Textarea
            variant="filled"
            placeholder="Add your thoughts here ..."
            />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 2 }} style={{padding:'0% 0%', marginTop:'2%'}}>
            <Button variant='filled' style={{marginLeft:'3%', marginTop:'1%'}} size='lg'>
                Post
            </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 7 }} style={{padding:'0% 0%', marginTop:'2%'}}>
            <Text size="20px" fw={500}>Comment (12)</Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs:3.87 }} style={{padding:'0% 0%', marginTop:'2%'}}>
            <Select
            placeholder="Pick filter"
            data={['Newest', 'This Month', 'This Year']}
            defaultValue="React"
            clearable
            />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs:11 }} style={{padding:'0% 1%', marginTop:'2%'}}>
            {/* Comment */}

            <Paper style={{marginBottom:'2%', borderBottom:'1px solid rgba(0,0,0,0.09)', paddingBottom:'2%'}}>
            <Grid >
            <Grid.Col span={{ base: 12, xs:1 }} style={{padding:'0% 2%', marginTop:'2%'}}>
            <Avatar color="dark" radius="xl" size='lg'>P J</Avatar>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs:10 }} style={{padding:'0% 0%', marginTop:'2%'}}>
            <Text>Peter Joy</Text>
            <Text c='dimmed'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum quasi nam, in cumque eos aut.
            </Text>
            <Group>
            <Text c='dimmed'>Posted 1 day ago</Text>
            <Text c='dimmed'>|</Text>
            <Button leftSection={<IconThumbUp size={14} />} variant="transparent">
                Like (12)
            </Button>
              <Text c='dimmed'>|</Text>
              <Button leftSection={<IconMessage size={14} />} variant="transparent">
                Reply (40)
            </Button>
            </Group>
            
            </Grid.Col>
            </Grid>   
            </Paper>

            <Paper style={{marginBottom:'2%', borderBottom:'1px solid rgba(0,0,0,0.09)', paddingBottom:'2%'}}>
            <Grid >
            <Grid.Col span={{ base: 12, xs:1 }} style={{padding:'0% 2%', marginTop:'2%'}}>
            <Avatar color="dark" radius="xl" size='lg'>T C</Avatar>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs:10 }} style={{padding:'0% 0%', marginTop:'2%'}}>
            <Text>Tom Chriss</Text>
            <Text c='dimmed'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, in.</Text>
            <Group>
            <Text c='dimmed'>Posted 1 day ago</Text>
            <Text c='dimmed'>|</Text>
            <Button leftSection={<IconThumbUp size={14} />} variant="transparent">
                Like (12)
            </Button>
              <Text c='dimmed'>|</Text>
              <Button leftSection={<IconMessage size={14} />} variant="transparent">
                Reply (6)
            </Button>
            </Group>
            
            </Grid.Col>
            </Grid>   
            </Paper>

            <Paper style={{marginBottom:'2%', borderBottom:'1px solid rgba(0,0,0,0.09)', paddingBottom:'2%'}}>
            <Grid >
            <Grid.Col span={{ base: 12, xs:1 }} style={{padding:'0% 2%', marginTop:'2%'}}>
            <Avatar color="dark" radius="xl" size='lg'>J B</Avatar>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs:10 }} style={{padding:'0% 0%', marginTop:'2%'}}>
            <Text>Jane Betty</Text>
            <Text c='dimmed'>Lorem ipsum dolor sit amet.</Text>
            <Group>
            <Text c='dimmed'>Posted 1 day ago</Text>
            <Text c='dimmed'>|</Text>
            <Button leftSection={<IconThumbUp size={14} />} variant="transparent">
                Like (3)
            </Button>
              <Text c='dimmed'>|</Text>
              <Button leftSection={<IconMessage size={14} />} variant="transparent">
                Reply (2)
            </Button>
            </Group>
            
            </Grid.Col>
            </Grid>   
            </Paper>

            <Paper style={{marginBottom:'2%', borderBottom:'0px solid rgba(0,0,0,0.09)', paddingBottom:'2%'}}>
                <Button radius='lg' variant='outline'>Load more Comment...</Button>
            </Paper>


            </Grid.Col>
            </Grid>

        </Paper>
        </Grid.Col>
        <br />
        <Grid.Col span={{ base: 12, xs: 12 }} style={{padding:'0% 2%', marginTop:'0%'}}>
        <Paper>
        <Text size="20px" fw={500} style={{margin:'1.7% 0%'}}>Similar Content</Text>
        </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12 }} style={{padding:'0% 2%', marginTop:'0%'}}>
        <Paper>
        <Grid>
        <Grid.Col span={{ base: 12, xs: 3 }} style={{padding:'2% 1%', marginTop:'0%'}}>
        <ContentCard/>
        </Grid.Col>   
        <Grid.Col span={{ base: 12, xs: 3 }} style={{padding:'2% 1%', marginTop:'0%'}}>
        <ContentCard/>
        </Grid.Col> 
        <Grid.Col span={{ base: 12, xs: 3 }} style={{padding:'2% 1%', marginTop:'0%'}}>
        <ContentCard/>
        </Grid.Col>       
        <Grid.Col span={{ base: 12, xs: 3 }} style={{padding:'2% 1%', marginTop:'0%'}}>
        <ContentCard/>
        </Grid.Col>      
        </Grid>
        </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }} style={{padding:'0% 2%', marginTop:'0%'}}></Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }} style={{padding:'0% 2%', marginTop:'0%'}}>
        <Paper>
            <Button style={{width:'100%'}} variant='light' size='lg'>
            View More Content.....
            </Button>
        </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }} style={{padding:'0% 2%', marginTop:'0%'}}></Grid.Col>
      </Grid>
    </Container>
  );
}