import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { MultiSelect, Button, Container } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { userRoutes, ticketRoutes } from '../../utils/api';

export const SharedUserToTicket = ({
  ticketId,
  senderId,
  shared,
}: {
  ticketId: string;
  senderId: string;
  shared: string[];
}) => {
  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userRoutes.getAllUsers();
        const allUsers = response.data.users;

        const filteredUsers = allUsers
          .filter(
            (user: any) =>
              user.user_id !== senderId && !shared.includes(user.user_id)
          )
          .map((user: any) => ({
            value: user.user_id,
            label: `${user.first_name} ${user.last_name}`,
          }));

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to fetch users. Please try again later.',
          color: 'red',
          icon: <IconX />,
        });
      }
    };

    fetchUsers();
  }, [senderId, shared]);

  const handleSharedUsers = async () => {
    if (selectedUsers.length === 0) {
      notifications.show({
        title: 'No User Selected',
        message: 'Please select at least one user to assign.',
        color: 'yellow',
      });
      return;
    }

    try {
      setLoading(true);
      await ticketRoutes.addUserToShared({ ticketId, userId: selectedUsers });

      notifications.show({
        title: 'Success',
        message: 'Users shared successfully!',
        color: 'green',
        icon: <IconCheck />,
        position:'top-right',
      });
    } catch (error) {
      console.error('Failed to shared users:', error);
      notifications.show({
        title: 'Error',
        message: 'User Already Shared. Please try again.',
        color: 'red',
        icon: <IconX />,
        position:'top-right'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <MultiSelect
        label="Select Users"
        placeholder="Pick Users"
        data={users}
        value={selectedUsers}
        onChange={(values) => {
          setSelectedUsers(values);
        }}
        searchable
        clearable
        disabled={loading}
        maxDropdownHeight={200}
        hidePickedOptions
      />
      <Button
        fullWidth
        mt="md"
        onClick={handleSharedUsers}
        loading={loading}
        disabled={selectedUsers.length === 0}
      >
        Submit
      </Button>
    </Container>
  );
};
