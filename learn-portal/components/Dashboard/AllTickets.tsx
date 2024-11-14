import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from 'mantine-react-table';
import { Box, Button, Flex, Menu, Text, Title, Paper,Container, Grid, Drawer, Spoiler, Group, Avatar, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUserCircle, IconSend, IconArrowsMaximize } from '@tabler/icons-react';
import { data } from './makeData';


export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};

const AllTickets = () => {
    const [opened, { open, close }] = useDisclosure(false);
  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        id: 'employee', //id used to define `group` column
        header: ' ',
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
            id: 'name', //id is still required when using accessorFn instead of accessorKey
            header: 'Name',
            // size: 250,
            filterVariant: 'autocomplete',
            Cell: ({ renderedCellValue, row }) => (
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <img
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  style={{ borderRadius: '50%' }}
                />
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: false,
            header: 'Subject',
            // size: 0,
          },
        ],
      },
      {
        id: 'id',
        header: ' ',
        columns: [

          {
            accessorKey: 'jobTitle', //hey a simple column for once
            header: 'Status',
            filterVariant: 'multi-select',
            // size: 350,
          },
          {
            accessorFn: (row) => {
              //convert to Date for sorting and filtering
              const sDay = new Date(row.startDate);
              sDay.setHours(0, 0, 0, 0); // remove time from date (useful if filter by equals exact date)
              return sDay;
            },
            id: 'startDate',
            header: 'Date',
            filterVariant: 'date-range',
            sortingFn: 'datetime',
            enableColumnFilterModes: false, //keep this as only date-range filter with between inclusive filterFn
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
          },
        ],
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    mantinePaginationProps: {
      radius: 'xl',
      size: 'lg',
    },
    mantineSearchTextInputProps: {
      placeholder: 'Search Employees',
    },
    renderDetailPanel: ({ row }) => (
        <Container size='lg'>
            <Grid>
            <Grid.Col span={{ base: 12, xs: 8 }}>

            <Box style={{ textAlign: 'justify', padding:'3% 5%'  }}>
            <Text style={{marginBottom:'2%'}} size='20px' fw={560}>Our responsibility center</Text>
            <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, saepe obcaecati. Explicabo porro ipsa itaque, deleniti rerum quae totam maxime repellendus quasi vitae ipsum, molestiae doloribus ducimus, incidunt dolorum ex? Ratione a repellat quam praesentium harum, libero quibusdam! Ad fuga ut expedita beatae? Esse error sint nisi maxime, fugiat corrupti placeat debitis ducimus tenetur beatae. Dignissimos numquam ratione reprehenderit nostrum libero, debitis, quidem eos soluta minima voluptatem culpa distinctio optio omnis repudiandae accusamus nulla voluptas temporibus officiis. Nobis eum molestiae voluptatem recusandae ducimus, fuga a debitis voluptatibus maxime ut sint non blanditiis quas dolorum quibusdam numquam asperiores reiciendis perferendis? Recusandae!</Text>
            </Box>

            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 4 }}>

            <Box style={{ textAlign: 'justify', padding:'3% 5%', backgroundColor:'rgba(0,0,0,0.01)', border:'1px solid lightblue' }}>

            <Drawer opened={opened} onClose={close} title="Details" position="right">
                {/* Drawer content */}
            </Drawer>

            <Button onClick={open} variant='filled'>Reply Ticket</Button>
            <br />
            <br />

            <Paper shadow='xl' style={{padding:'5%', marginBottom:'7%'}} radius='md'>
            <Group>
            <Avatar radius="xl" />
            <Text c='dimmed'>Peter Joy</Text>
            </Group>
            <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eos tempore minima obcaecati molestiae. Illo animi saepe nesciunt autem explicabo!
            </Text>
            <Group>
            <ActionIcon variant="outline" aria-label="Settings" color='teal' onClick={open}>
            <IconArrowsMaximize style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <Text c='dimmed' style={{fontSize:'12px'}}>Posted on: 12/11/2024</Text>
            </Group>


            </Paper>

            </Box>

            </Grid.Col>
            </Grid>


        </Container>

    ),
    renderRowActionMenuItems: () => (
      <>
        <Menu.Item leftSection={<IconUserCircle />}>View Profile</Menu.Item>
        <Menu.Item leftSection={<IconSend />}>Send Email</Menu.Item>
      </>
    ),
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.getValue('name'));
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.getValue('name'));
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.getValue('name'));
        });
      };

      return (
        <Flex p="md" justify="space-between">
          <Flex gap="xs">
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
          <Flex style={{ gap: '5px' }}>
            <Text style={{textAlign:'center'}} fw={500}>
                View Tickets 
            </Text>
          </Flex>
        </Flex>
      );
    },
  });

  return <MantineReactTable table={table} />;
};

export default AllTickets;