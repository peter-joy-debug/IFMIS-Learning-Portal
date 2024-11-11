import { Card, Image, Text, BackgroundImage, Center, Button, Paper, rem } from '@mantine/core';
import { IconBrandPagekit } from '@tabler/icons-react';

export function CategoryCard() {
  return (
    <Paper
      shadow="xs"
      component="a"
      href="#"
    //   target="_blank"
      style={{backgroundColor:'lightblue'}}
    >
        <br /><br />
        <Paper
        radius="sm"
        style={{backgroundColor:'white', borderTopLeftRadius:'100px'}}
        shadow='xl'
      >
        
        <center>
        <IconBrandPagekit style={{ width: rem(80), height: rem(80), backgroundColor:'white' }} stroke={1} color="black"/>
          <Button c="dark" variant="outline" style={{padding:'2%', borderRadius:'10px', marginBottom:'10%', width:'90%'}} color="gray">
            Sample type
          </Button>
        </center>
      </Paper>
    </Paper>
  );
}