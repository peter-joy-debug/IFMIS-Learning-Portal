
// import { useState, useEffect } from 'react';
// import { notifications } from '@mantine/notifications';
// import { MultiSelect, Button, Container, Select } from '@mantine/core';
// import { IconCheck, IconX } from '@tabler/icons-react';
// import { userRoutes, ticketRoutes } from '../../utils/api';

// export const ChangeTicketStatus = ({
//   ticketId,

// }: {
//   ticketId: string;
// }) => {
//   const [status, setStatus] = useState<{ value: string; label: string }[]>([]);

//   const [selectedStatus, setSelectedStatus] = useState<string>('');
//   const [loading, setLoading] = useState(false);

  

//   const handleAssignUsers = async () => {
//     if (selectedStatus.length === 0) {
//       notifications.show({
//         title: 'No Status Selected',
//         message: 'Please select status',
//         color: 'yellow',
//       });
//       return;
//     }

//     try {
//       setLoading(true);
//       await ticketRoutes.changeTicketStatus({ ticketId, status: selectedStatus });

//       notifications.show({
//         title: 'Success',
//         message: 'Status Changed Successfully!',
//         color: 'green',
//         icon: <IconCheck />,
//         position:'top-right',
//       });
//     } catch (error) {
//       console.error('Failed to change status:', error);
//       notifications.show({
//         title: 'Error',
//         message: 'Failed to update Status. Please try again.',
//         color: 'red',
//         icon: <IconX />,
//         position:'top-right'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <Select
//         label="Select Users"
//         placeholder="Pick Users"
//         data={status}
//         value={selectedStatus}
//         onChange={(values) => {
//           setSelectedStatus(values);
//         }}
//         searchable
//         clearable
//         disabled={loading}
//         maxDropdownHeight={200}
//       />
//       <Button
//         fullWidth
//         mt="md"
//         onClick={handleAssignUsers}
//         loading={loading}
//         disabled={selectedStatus.length === 0}
//       >
//         Submit
//       </Button>
//     </Container>
//   );
// };


import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { Select, Button, Container } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { ticketRoutes } from '../../utils/api'; // Assuming `ticketRoutes` is properly imported

export const ChangeTicketStatus = ({
  ticketId,
}: {
  ticketId: string;
}) => {
  const [statuses, setStatuses] = useState<{ value: string; label: string }[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Example: Fetch available statuses from an API or define them statically
    const fetchStatuses = async () => {
      try {
        // Example static statuses; replace with an API call if needed
        const statusOptions = [
          { value: 'Under Review', label: 'Under Review' },
          { value: 'Addressed', label: 'Addressed' },
          { value: 'OnHold', label: 'OnHold' },
          { value: 'Closed', label: 'Closed' },
          { value: 'Being Handled', label: 'Being Handled' },
          { value: 'Rejected', label: 'Rejected' },
          { value: 'RFA', label: 'RFA' },
        ];
        setStatuses(statusOptions);
      } catch (error) {
        console.error('Failed to fetch statuses:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to fetch statuses. Please try again.',
          color: 'red',
          icon: <IconX />,
        });
      }
    };

    fetchStatuses();
  }, []);

  const handleStatusChange = async () => {
    if (!selectedStatus) {
      notifications.show({
        title: 'No Status Selected',
        message: 'Please select a status to proceed.',
        color: 'yellow',
      });
      return;
    }

    try {
      setLoading(true);
      await ticketRoutes.changeTicketStatus({ ticketId, status: selectedStatus });

      notifications.show({
        title: 'Success',
        message: 'Status changed successfully!',
        color: 'green',
        icon: <IconCheck />,
        position: 'top-right',
      });
    } catch (error) {
      console.error('Failed to change status:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to update status. Please try again.',
        color: 'red',
        icon: <IconX />,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Select
        label="Select Status"
        placeholder="Pick a status"
        data={statuses}
        value={selectedStatus}
        onChange={(value) => setSelectedStatus(value)}
        searchable
        clearable
        disabled={loading}
        maxDropdownHeight={200}
      />
      <Button
        fullWidth
        mt="md"
        onClick={handleStatusChange}
        loading={loading}
        disabled={!selectedStatus}
      >
        Submit
      </Button>
    </Container>
  );
};
