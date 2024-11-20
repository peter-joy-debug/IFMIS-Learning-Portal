// import { useForm } from '@mantine/form';
// import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
// import { Ticket } from '../Ticket/Ticket';
// import { ticketRoutes } from '../../utils/api'; // API to fetch ticket data
// import { userRoutes } from '../../utils/api'; // Assuming userRoutes is properly imported
// import { IconPhoto, IconMessageCircle, IconSettings, IconUsers, IconMessage, IconMessage2, IconArrowUp, IconArrowDown, IconArrowLeftRight } from '@tabler/icons-react';
// import {
//     SegmentedControl,
//     Box,
//     Text,
//     Container,
//     Grid,
//     Paper,
//     Group,
//     Avatar,
//     Menu,
//     TextInput,
//     Button,
//     Pill,
//     Image,
//     Loader,
//     rem,
//     Tabs,
//     ScrollArea, ComboboxItem, OptionsFilter, MultiSelect
//   } from '@mantine/core';

// export const AssignUserToTicket = ({
//     ticketId,
//     senderId,
//     assignedTo,
//   }: {
//     ticketId: string;
//     senderId: string;
//     assignedTo: string[];
//   }) => {
//     const [users, setUsers] = useState<{ value: string; label: string }[]>([]);
//     const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//     const [loading, setLoading] = useState(false);
    
//     useEffect(() => {
//       const fetchUsers = async () => {
//         try {
//           const response = await userRoutes.getAllUsers();
//           const allUsers = response.data.users;
  
//           const filteredUsers = allUsers
//             .filter(
//               (user: any) =>
//                 user.user_id !== senderId && !assignedTo.includes(user.user_id)
//             )
//             .map((user: any) => ({
//               value: user.user_id,
//               label: `${user.first_name} ${user.last_name}`,
//             }));
  
//           setUsers(filteredUsers);
//         } catch (error) {
//           console.error('Failed to fetch users:', error);
//         }
//       };
  
//       fetchUsers();
//     }, [senderId, assignedTo]);
  
//     const handleAssignUsers = async () => {
//       if (selectedUsers.length === 0) {
//         console.log("No User Selected");
   
//         return;
//       }
  
//       try {
//         setLoading(true);
//         console.log("DATA TO BE SENT: ",selectedUsers);
        
//         await ticketRoutes.addUserToAssigned({ ticketId, userId: selectedUsers });
//         console.log('Users assigned successfully');
//       } catch (error) {
//         console.error('Failed to assign users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     return (<>
// <Container>
//                 <MultiSelect
//                   label="Select Users"
//                   placeholder="Pick Users"
//                   data={users}
//                   value={selectedUsers} // Controlled component
//                   onChange={(values) => {
//                     setSelectedUsers(values);
//                   }}
//                   searchable
//                   clearable
//                   disabled={loading}
//                   maxDropdownHeight={200}
//                   hidePickedOptions
//                 />
//                   <Button
//                     fullWidth
//                     mt="md"
//                     onClick={handleAssignUsers}
//                     loading={loading}
//                     disabled={selectedUsers.length === 0} // Disable if no user selected
//                   >
//                     Submit
//                   </Button>
//                   </Container>
//                   </>

//     );
//   };

import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { MultiSelect, Button, Container } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { userRoutes, ticketRoutes } from '../../utils/api';

export const AssignUserToTicket = ({
  ticketId,
  senderId,
  assignedTo,
}: {
  ticketId: string;
  senderId: string;
  assignedTo: string[];
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
              user.user_id !== senderId && !assignedTo.includes(user.user_id)
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
  }, [senderId, assignedTo]);

  const handleAssignUsers = async () => {
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
      await ticketRoutes.addUserToAssigned({ ticketId, userId: selectedUsers });

      notifications.show({
        title: 'Success',
        message: 'Users assigned successfully!',
        color: 'green',
        icon: <IconCheck />,
        position:'top-right',
      });
    } catch (error) {
      console.error('Failed to assign users:', error);
      notifications.show({
        title: 'Error',
        message: 'User Already Assigned. Please try again.',
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
        onClick={handleAssignUsers}
        loading={loading}
        disabled={selectedUsers.length === 0}
      >
        Submit
      </Button>
    </Container>
  );
};
