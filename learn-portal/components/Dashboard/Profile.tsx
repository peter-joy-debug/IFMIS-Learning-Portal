// import { Card, Avatar, Text, Group, Button } from '@mantine/core';
// import classes from './Profile.module.css';

// const stats = [
//   { value: '34K', label: 'Followers' },
//   { value: '187', label: 'Follows' },
//   { value: '1.6K', label: 'Posts' },
// ];

// export function Profile() {
//   const items = stats.map((stat) => (
//     <div key={stat.label}>
//       <Text ta="center" fz="lg" fw={500}>
//         {stat.value}
//       </Text>
//       <Text ta="center" fz="sm" c="dimmed" lh={1}>
//         {stat.label}
//       </Text>
//     </div>
//   ));

//   return (
//     <Card  padding="xl" radius="md" className={classes.card}>
//       <Card.Section
//         h={140}
//         style={{
//         backgroundColor:'lightblue'
//         }}
//       />
//       <Avatar
//         src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
//         size={80}
//         radius={80}
//         mx="auto"
//         mt={-30}
//         className={classes.avatar}
//       />
//       <Text ta="center" fz="lg" fw={500} mt="sm">
//         Berkov Zechvic
//       </Text>
//       <Text ta="center" fz="sm" c="dimmed">
        
//       </Text>
//       {/* <Group mt="md" justify="center" gap={30}>
//         {items}
//       </Group> */}
//       {/* <Button fullWidth radius="md" mt="xl" size="md" variant="default">
//         Follow
//       </Button> */}
//     </Card>
//   );
// }

// import { Card, Avatar, Text, Group, Button } from '@mantine/core';
// import classes from './Profile.module.css';

// type ProfileProps = {
//   user: {
//     first_name: string;
//     last_name: string;
//     email_address: string;
//     user_image_id?: string | null;
//   } | null;
// };

// export function Profile({ user }: ProfileProps) {
//   if (!user) {
//     return (
//       <Card padding="xl" radius="md" className={classes.card}>
//         <Text ta="center" fz="lg" fw={500}>
//           Loading...
//         </Text>
//       </Card>
//     );
//   }

//   return (
//     <Card padding="xl" radius="md" className={classes.card}>
//       <Card.Section
//         h={140}
//         style={{
//           backgroundColor: 'lightblue',
//         }}
//       />
//       <Avatar
//         src={
//           user.user_image_id
//             ? `/path-to-images/${user.user_image_id}` // Replace with your actual image path logic
//             : ''
//         }
//         size={80}
//         radius={80}
//         mx="auto"
//         mt={-30}
//         className={classes.avatar}
//       />
//       <Text ta="center" fz="lg" fw={500} mt="sm">
//         {user.first_name} {user.last_name}
//       </Text>
//       <Text ta="center" fz="sm" c="dimmed">
//         {user.email_address}
//       </Text>
//       <Group mt="md" justify="center" gap={30}>
//         <Text ta="center" fz="sm" c="dimmed">
//           Update your profile from your account settings.
//         </Text>
//       </Group>
//     </Card>
//   );
// }


import { Card, Avatar, Text, Group, Divider, Box } from '@mantine/core';
import classes from './Profile.module.css';

type ProfileProps = {
  user: {
    first_name: string;
    last_name: string;
    email_address: string;
    user_image_id?: string | null;
    biography?: string | null;
    phone_number?: string | null;
    gender?: string | null;
    user_type?: string | null;
    status?: string | null;
  } | null;
};

export function Profile({ user }: ProfileProps) {
  if (!user) {
    return (
      <Card padding="xl" radius="md" className={classes.card}>
        <Text ta="center" fz="lg" fw={500}>
          Loading...
        </Text>
      </Card>
    );
  }

  return (
    <Card padding="xl" radius="md" className={classes.card}>
      <Card.Section
        h={140}
        style={{
          backgroundColor: 'lightblue',
        }}
      />

      <Avatar
        src={
          user.user_image_id
            ? `/path-to-images/${user.user_image_id}` // Replace with your actual image path logic
            : ''
        }
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {user.first_name} {user.last_name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {user.email_address}
      </Text>
      <Divider my="lg" />
      <Box style={{marginLeft:'10%'}}>
        {user.biography && (
          <Group>
            <Text fw={500}>Biography:</Text>
            <Text c="dimmed">{user.biography}</Text>
          </Group>
        )}
        {user.phone_number && (
          <Group>
            <Text fw={500}>Phone Number:</Text>
            <Text c="dimmed">{user.phone_number}</Text>
          </Group>
        )}
        {user.gender && (
          <Group>
            <Text fw={500}>Gender:</Text>
            <Text c="dimmed">{user.gender}</Text>
          </Group>
        )}
        {user.user_type && (
          <Group>
            <Text fw={500}>User Type:</Text>
            <Text c="dimmed">{user.user_type}</Text>
          </Group>
        )}
        {user.status && (
          <Group>
            <Text fw={500}>Status:</Text>
            <Text c="dimmed">{user.status}</Text>
          </Group>
        )}
      </Box>
    </Card>
  );
}
