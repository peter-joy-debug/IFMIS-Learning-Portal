// import { useToggle, upperFirst } from '@mantine/hooks';
// import { useForm } from '@mantine/form';
// import {
//   TextInput,
//   PasswordInput,
//   Text,
//   Paper,
//   Group,
//   PaperProps,
//   Button,
//   Divider,
//   Checkbox,
//   Anchor,
//   Stack,
//   Container,
//   Notification,
// } from '@mantine/core';
// import { useState } from 'react';
// import {useApi} from '../../hooks/useApi'; // Import the custom hook

// export function Authentication(props: PaperProps) {
//   const [type, toggle] = useToggle(['Login', 'Register']);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const { fetchData } = useApi();

//   const form = useForm({
//     initialValues: {
//       username: '',
//       name: '',
//       password: '',
//       terms: true,
//     },

//     validate: {
//       username: (val) => (val.trim().length > 0 ? null : 'Username is required'),
//       password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
//       ...(type === 'Register' && {
//         name: (val) => (val.trim().length > 0 ? null : 'Name is required'),
//       }),
//     },
//   });

//   const handleSubmit = async (values: typeof form.values) => {
//     setError(null);
//     setSuccess(null);
//     try {
//       if (type === 'Login') {
//         const response = await fetchData({
//           method: 'POST',
//           url: '/login',
//           data: {
//             user_id: values.username,
//             password: values.password,
//           },
//         });
//         localStorage.setItem('token', response.data.token);
//         setSuccess('Login successful');
//       } else {
//         setError('Registration is not implemented yet');
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to login');
//     }
//   };

//   return (
//     <Container size="xs" style={{ marginTop: '-5%', marginBottom: '15%' }}>
//       <Paper radius="md" p="xl" shadow="xl">
//         <Text
//           size="lg"
//           fw={500}
//           style={{
//             textAlign: 'center',
//             borderBottom: '1.7px solid lightblue',
//             padding: '2%',
//             borderBottomLeftRadius: '100px',
//             borderBottomRightRadius: '100px',
//           }}
//         >
//           {type}
//         </Text>

//         <Divider label="Type your credentials below" labelPosition="center" my="lg" />

//         {error && <Notification color="red">{error}</Notification>}
//         {success && <Notification color="green">{success}</Notification>}

//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <Stack>
//             {type === 'Register' && (
//               <TextInput
//                 label="Name"
//                 placeholder="Your name"
//                 value={form.values.name}
//                 onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
//                 error={form.errors.name}
//                 radius="md"
//               />
//             )}

//             <TextInput
//               required
//               label="Username"
//               placeholder="Your username"
//               value={form.values.username}
//               onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
//               error={form.errors.username}
//               radius="md"
//             />

//             <PasswordInput
//               required
//               label="Password"
//               placeholder="Your password"
//               value={form.values.password}
//               onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
//               error={form.errors.password}
//               radius="md"
//             />

//             {type === 'Register' && (
//               <Checkbox
//                 label="I accept terms and conditions"
//                 checked={form.values.terms}
//                 onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
//               />
//             )}
//           </Stack>

//           <Group justify="space-between" mt="xl">
//             <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
//               {type === 'Register'
//                 ? 'Already have an account? Login'
//                 : "Don't have an account? Register"}
//             </Anchor>
//             <Button type="submit" radius="sm" size="md">
//               {upperFirst(type)}
//             </Button>
//           </Group>
//         </form>
//       </Paper>
//     </Container>
//   );
// }

// import { useToggle, upperFirst } from '@mantine/hooks';
// import { useForm } from '@mantine/form';
// import {
//   TextInput,
//   PasswordInput,
//   Text,
//   Paper,
//   Group,
//   PaperProps,
//   Button,
//   Divider,
//   Checkbox,
//   Anchor,
//   Stack,
//   Container,
//   Notification,
// } from '@mantine/core';
// import { useState } from 'react';
// import {useApi} from '../../hooks/useApi'; // Correct path for the custom hook

// export function Authentication(props: PaperProps) {
//   const [type, toggle] = useToggle(['Login', 'Register']);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   // Initialize the custom hook
//   const { fetchData } = useApi('/login'); // If it uses a base URL pattern

//   const form = useForm({
//     initialValues: {
//       username: '',
//       name: '',
//       password: '',
//       terms: true,
//     },

//     validate: {
//       username: (val) => (val.trim().length > 0 ? null : 'Username is required'),
//       password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
//       ...(type === 'Register' && {
//         name: (val) => (val.trim().length > 0 ? null : 'Name is required'),
//       }),
//     },
//   });

//   const handleSubmit = async (values: typeof form.values) => {
//     setError(null);
//     setSuccess(null);
//     try {
//       if (type === 'Login') {
//         const response = await fetchData({
//           method: 'POST',
//           url: '/login',
//           data: {
//             user_id: values.username,
//             password: values.password,
//           },
//         });
//         localStorage.setItem('token', response.data.token);
//         setSuccess('Login successful');
//       } else {
//         setError('Registration is not implemented yet');
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to login');
//     }
//   };

//   return (
//     <Container size="xs" style={{ marginTop: '-5%', marginBottom: '15%' }}>
//       <Paper radius="md" p="xl" shadow="xl">
//         <Text
//           size="lg"
//           fw={500}
//           style={{
//             textAlign: 'center',
//             borderBottom: '1.7px solid lightblue',
//             padding: '2%',
//             borderBottomLeftRadius: '100px',
//             borderBottomRightRadius: '100px',
//           }}
//         >
//           {type}
//         </Text>

//         <Divider label="Type your credentials below" labelPosition="center" my="lg" />

//         {error && <Notification color="red">{error}</Notification>}
//         {success && <Notification color="green">{success}</Notification>}

//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <Stack>
//             {type === 'Register' && (
//               <TextInput
//                 label="Name"
//                 placeholder="Your name"
//                 value={form.values.name}
//                 onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
//                 error={form.errors.name}
//                 radius="md"
//               />
//             )}

//             <TextInput
//               required
//               label="Username"
//               placeholder="Your username"
//               value={form.values.username}
//               onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
//               error={form.errors.username}
//               radius="md"
//             />

//             <PasswordInput
//               required
//               label="Password"
//               placeholder="Your password"
//               value={form.values.password}
//               onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
//               error={form.errors.password}
//               radius="md"
//             />

//             {type === 'Register' && (
//               <Checkbox
//                 label="I accept terms and conditions"
//                 checked={form.values.terms}
//                 onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
//               />
//             )}
//           </Stack>

//           <Group justify="center" mt="xl">
//             {/* <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
//               {type === 'Register'
//                 ? 'Already have an account? Login'
//                 : "Don't have an account? Register"}
//             </Anchor> */}
//             <Button type="submit" radius="sm" size="md">
//               {upperFirst(type)}
//             </Button>
//           </Group>
//         </form>
//       </Paper>
//     </Container>
//   );
// }


// import { useToggle, upperFirst } from '@mantine/hooks';
// import { useForm } from '@mantine/form';
// import {
//   TextInput,
//   PasswordInput,
//   Text,
//   Paper,
//   Group,
//   PaperProps,
//   Button,
//   Divider,
//   Checkbox,
//   Anchor,
//   Stack,
//   Container,
//   Notification,
// } from '@mantine/core';
// import { useState } from 'react';
// import { userRoutes } from '../../utils/api'; // Correct path for your API routes
// import { useRouter } from 'next/router';

// export function Authentication(props: PaperProps) {
//   const [type, toggle] = useToggle(['Login', 'Register']);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const router = useRouter();

//   const form = useForm({
//     initialValues: {
//       username: '',
//       name: '',
//       password: '',
//       terms: true,
//     },

//     validate: {
//       username: (val) => (val.trim().length > 0 ? null : 'Username is required'),
//       password: (val) =>
//         val.length <= 6 ? 'Password should include at least 6 characters' : null,
//       ...(type === 'Register' && {
//         name: (val) => (val.trim().length > 0 ? null : 'Name is required'),
//       }),
//     },
//   });

//   const handleSubmit = async (values: typeof form.values) => {
//     setError(null);
//     setSuccess(null);

//     try {
//       if (type === 'Login') {
//         const response = await userRoutes.login({
//           user_id: values.username,
//           password: values.password,
//         });

//         localStorage.setItem('token', response.data.token);
//         setSuccess('Login successful');
//         const redirectTo = router.query.redirect || '/dashboard';
//         console.log("ROUTER: ",redirectTo);
        
//         router.push(redirectTo as string);
//       } else {
//         // Simulate register action
//         setError('Registration is not implemented yet');
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to login');
//     }
//   };

//   return (
//     <Container size="xs" style={{ marginTop: '-5%', marginBottom: '15%' }}>
//       <Paper radius="md" p="xl" shadow="xl">
//         <Text
//           size="lg"
//           fw={500}
//           style={{
//             textAlign: 'center',
//             borderBottom: '1.7px solid lightblue',
//             padding: '2%',
//             borderBottomLeftRadius: '100px',
//             borderBottomRightRadius: '100px',
//           }}
//         >
//           {type}
//         </Text>

//         <Divider label="Type your credentials below" labelPosition="center" my="lg" />

//         {error && <Notification color="red">{error}</Notification>}
//         {success && <Notification color="green">{success}</Notification>}

//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <Stack>
//             {type === 'Register' && (
//               <TextInput
//                 label="Name"
//                 placeholder="Your name"
//                 value={form.values.name}
//                 onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
//                 error={form.errors.name}
//                 radius="md"
//               />
//             )}

//             <TextInput
//               required
//               label="Username"
//               placeholder="Your username"
//               value={form.values.username}
//               onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
//               error={form.errors.username}
//               radius="md"
//             />

//             <PasswordInput
//               required
//               label="Password"
//               placeholder="Your password"
//               value={form.values.password}
//               onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
//               error={form.errors.password}
//               radius="md"
//             />

//             {type === 'Register' && (
//               <Checkbox
//                 label="I accept terms and conditions"
//                 checked={form.values.terms}
//                 onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
//               />
//             )}
//           </Stack>

//           <Group justify="center" mt="xl">
//             {/* <Anchor component="button" type="button" onClick={() => toggle()} size="xs">
//               {type === 'Register'
//                 ? 'Already have an account? Login'
//                 : "Don't have an account? Register"}
//             </Anchor> */}
//             <Button type="submit" radius="sm" size="md">
//               {upperFirst(type)}
//             </Button>
//           </Group>
//         </form>
//       </Paper>
//     </Container>
//   );
// }


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
  Stack,
  Container,
  Notification,
} from '@mantine/core';
import { useState } from 'react';
import { userRoutes } from '../../utils/api'; // Correct path for your API routes
import { useRouter } from 'next/router';
import { IconCheck, IconX } from '@tabler/icons-react';
export function Authentication(props: PaperProps) {
  const [type, toggle] = useToggle(['Login', 'Register']);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (val) => (val.trim().length > 0 ? null : 'Username is required'),
      password: (val) =>
        val.length >= 6 ? null : 'Password should include at least 6 characters',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await userRoutes.login({
        username: values.username,
        password: values.password,
      });

      localStorage.setItem('token', response.data.token); // Store token
      setSuccess('Login successful');
      
      // Redirect to the desired route after login
      const redirectTo = (router.query.redirect as string) || '/dashboard';
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };
console.log("PROCESS .ENV: ",process.env.NEXT_PUBLIC_BASE_URL);

  return (
    <Container size="xs" style={{ marginTop: '-5%', marginBottom: '15%' }}>
      <Paper radius="md" p="xl" shadow="xl">
        <Text size="lg" fw={500} style={{textAlign:'center', borderBottom: '1.7px solid lightblue',padding: '2%', borderBottomLeftRadius: '100px',borderBottomRightRadius: '100px'}} mb="sm" >
          {upperFirst(type)}
        </Text>
        <Divider label="Enter your credentials" labelPosition="center" my="lg" />

        {success && (
          <Notification icon={<IconCheck />} color="teal" onClose={() => setSuccess(null)}>
            {success}
          </Notification>
        )}
        {error && (
          <Notification icon={<IconX />} color="red" onClose={() => setError(null)}>
            {error}
          </Notification>
        )}


        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Username"
              placeholder="Your username"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps('password')}
            />
          </Stack>

          <Group justify="center" mt="xl">
            <Button type="submit" radius="sm" size="md">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
