import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container
} from '@mantine/core';


export function ForgetPassword(props: PaperProps) {
  const [type, toggle] = useToggle(['Request Password Reset', 'Register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Container size='xs' style={{marginTop:'-5%', marginBottom:'15%'}}>
    <Paper radius="md" p="xl" shadow='xl'>
      <Text size="lg" fw={300} style={{textAlign:'center',borderBottom:'1.7px solid lightblue', padding:'2%', borderBottomLeftRadius:'100px', borderBottomRightRadius:'100px'}}>
        {type} 
      </Text>

      <Group grow mb="md" mt="md">

      </Group>

      <Divider label="Type email and submit to request new password" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {/* {type === 'Register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )} */}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          {/* <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          /> */}

          {/* {type === 'Register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )} */}
        </Stack>

        <Group justify="space-between" mt="xl">
          {/* <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'Register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor> */}
          <Button type="submit" radius="sm" size='md'>
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
    </Container>
  );
}