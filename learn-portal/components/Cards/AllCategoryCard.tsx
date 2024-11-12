import { Card, Image, Text, BackgroundImage, Center, Button, Paper, rem } from '@mantine/core';
import { IconBrandPagekit } from '@tabler/icons-react';

export function AllCategoryCard() {
  return (
    <Paper
      shadow="xs"
      component="a"
      href="#"
    //   target="_blank"
      style={{backgroundColor:'rgba(0,0,0,0.05)', marginTop:'7%'}}
    >
        <br /><br />
        <Paper
        radius="sm"
        style={{backgroundColor:'white', borderTopLeftRadius:'100px', borderBottomRightRadius:'0px'}}
        shadow='xl'
      >
        
        <center>
        <IconBrandPagekit style={{ width: rem(80), height: rem(80), backgroundColor:'white' }} stroke={1} color="black"/>
          <Button c="dark" variant="outline" style={{padding:'2%', borderRadius:'10px', marginBottom:'15%', width:'90%'}} color="gray">
            Sample type
          </Button>
        </center>
      </Paper>
    </Paper>
  );
}