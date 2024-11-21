
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; 
import 'mantine-react-table/styles.css'; // make sure MRT styles are imported
import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { IconPhoto, IconMessageCircle, IconSettings, IconUsers, IconMessage, IconMessage2, IconArrowUp, IconArrowDown, IconArrowLeftRight } from '@tabler/icons-react';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { modals } from '@mantine/modals';
import { useFullscreen } from '@mantine/hooks';
import { useApi } from '../../hooks/useApi'; // Custom hook for API calls
import classes from './Segment.module.css';
import CryptoJS from 'crypto-js';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from 'mantine-react-table';
import {
  SegmentedControl,
  Box,
  Text,
  Container,
  Grid,
  Paper,
  Group,
  Avatar,
  Menu,
  TextInput,
  Button,
  Pill,
  Image,
  Loader,
  rem,
  Tabs,
  ScrollArea, ComboboxItem, OptionsFilter, MultiSelect
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUserCircle, IconSend, IconDownload,IconSquareRoundedX, IconMaximize, IconTrash, IconArrowBearRight } from '@tabler/icons-react';
import { ticketRoutes } from '../../utils/api'; // API to fetch ticket data
import { userRoutes } from '../../utils/api'; // Assuming userRoutes is properly imported
import { Ticket } from '../Ticket/Ticket';
import Link from 'next/link';
export type Ticket = {
  id: string;
  subject: string;
  senderId: string;
  status: string;
  detail: string;
  department: string[];
  shared: string[];
  attachments: string[];
  assignedTo:string[];
  replies:string[];
  date: string;
  avatar: string;
};

// const repliesCache = useRef<Map<string, any[]>>(new Map()); // Cache for replies




const AllTicketsAdmin = () => {
  const secretKey = 'your_secret_key';
  const iconStyle = { width: rem(16), height: rem(16) };
  const { toggle, fullscreen } = useFullscreen();
  const [opened, { open, close }] = useDisclosure(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi<{ tickets: Ticket[] }>();
  const [loading, setLoading] = useState(true);
  const viewport = useRef<HTMLDivElement>(null);
  const optionsFilter: OptionsFilter = ({ options, search }) => {
    const splittedSearch = search.toLowerCase().trim().split(' ');
    return (options as ComboboxItem[]).filter((option) => {
      const words = option.label.toLowerCase().trim().split(' ');
      return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
    });
  };
  const scrollToBottom = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });

  const scrollToCenter = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight / 2, behavior: 'smooth' });

  const scrollToTop = () => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' });

  const attachmentCache = useRef<Map<string, { fileURL: string; contentType: string; filename: string }>>(new Map());
  const senderCache = useRef<Map<string, any>>(new Map()); // Cache for sender data

  type SharedUsersProps = {
    shared: string[]; // Array of user IDs
    ticketId: string; // Current ticket ID
  };

  type AssignedUsersProps = {
    assigned: string[]; // Array of user IDs
    ticketId: string; // Current ticket ID
  };




//Reply attachments

const ReplyAttachmentRenderer = ({ attachments }: { attachments: string[] }) => {
  const [attachmentData, setAttachmentData] = useState<
    { fileId: string; contentType: string; fileURL: string; filename: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttachmentData = async () => {
      setLoading(true);
      try {
        const dataPromises = attachments.map(async (fileId) => {
          if (attachmentCache.current.has(fileId)) {
            return { fileId, ...attachmentCache.current.get(fileId)! };
          }

          const response = await ticketRoutes.getFileById(fileId);
          const { base64Data, contentType, filename } = response.data;

          const binaryString = atob(base64Data);
          const byteArray = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
          const blob = new Blob([byteArray], { type: contentType });
          const fileURL = URL.createObjectURL(blob);

          const fileData = { fileURL, contentType, filename };
          attachmentCache.current.set(fileId, fileData);
          return { fileId, ...fileData };
        });

        const resolvedData = await Promise.all(dataPromises);
        setAttachmentData(resolvedData);
      } catch (err) {
        setError('Failed to load attachments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAttachmentData();
  }, [attachments]);

  const handleAttachmentClick = (file: { fileURL: string; contentType: string; filename: string }) => {
    modals.open({
      title: (
        <Group style={{ width: '100%' }}>
          <Pill>
            Preview: <b>{file.filename}</b>
          </Pill>
          <Button
            leftSection={<IconDownload size={18} />}
            size="xs"
            color="blue"
            onClick={() => {
              const link = document.createElement('a');
              link.href = file.fileURL;
              link.download = file.filename;
              link.click();
            }}
          >
            Download
          </Button>
          <Button leftSection={<IconSquareRoundedX size={18} />} size="xs" color="red" onClick={() => modals.closeAll()}>
            Close
          </Button>
          <Button leftSection={<IconMaximize size={18} />} size="xs" onClick={toggle} color={fullscreen ? 'indianred' : 'grey'}>
            {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
          <Button
            leftSection={<IconArrowBearRight size={18} />}
            size="xs"
            onClick={() => window.open(file.fileURL, '_blank')}
          >
            Open in New Tab
          </Button>
        </Group>
      ),
      size: '90%',
      children: (
        <>
          {file.contentType === 'application/pdf' && <iframe src={file.fileURL} width="100%" height="600px" title="PDF Preview" />}
          {file.contentType.startsWith('image/') && (
            <Image src={file.fileURL} alt="Image Preview" fit="contain" width="100%" height="600px" />
          )}
          {(file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.contentType === 'application/msword' ||
            file.contentType === 'application/ms-excel' ||
            file.contentType === 'application/vnd.ms-excel') && <Text>DOC/DOCX preview not supported. Download to view.</Text>}
        </>
      ),
    });
  };

  return (
    <Grid>
         <Grid.Col span={12}><Text style={{ margin: '1% 0%' }} size='xs'>Attachments <Pill style={{backgroundColor:'lightgreen'}}>{attachmentData.length}</Pill></Text><br /></Grid.Col>
        {attachmentData.map((file, index) => (
          <>

          <Grid.Col span={3}>
          <Paper
          withBorder
            key={file.fileId}
            radius="sm"
            style={{
              padding: '1%',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
            onClick={() => handleAttachmentClick(file)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.07)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {file.contentType.startsWith('image/') && (
              <>
              <img src={file.fileURL} alt="Image Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </>
            )}
            {file.contentType === 'application/pdf' && <Text size="xs" >PDF</Text>}
            {(file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
              file.contentType === 'application/msword' || file.contentType === 'application/ms-excel' || file.contentType === 'application/vnd.ms-excel') && (
              <Text size="xs">DOC/DOCX</Text>
            )}
          </Paper>
          <br />
          <Text size='xs' c='dimmed'>{file.filename}</Text> <br />
          </Grid.Col>
          
        </>))}
      {error && <Text color="red">{error}</Text>}
    </Grid>
  );
};




  const AssignedUsersRenderer = ({ assigned, ticketId }: AssignedUsersProps) => {
    const [assignedUsers, setAssignedUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userCache = useRef<Map<string, any>>(new Map()); // Cache for user data
  
    const fetchAssignedUsers = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const dataPromises = assigned.map(async (userId) => {
          if (userCache.current.has(userId)) {
            return userCache.current.get(userId); // Use cached data
          }
          // console.log("USERS-test: ",userId);
          
          try {
            const response = await userRoutes.getUserById(userId);
            const userData = response.data.user;
            userCache.current.set(userId, userData); // Cache the fetched data
            return userData;
          } catch (err) {
            console.error(`Failed to fetch user with ID: ${userId}`, err);
            return null; // Handle errors for individual user fetch
          }
        });
  
        const users = await Promise.all(dataPromises);
        setAssignedUsers(users.filter(Boolean)); // Filter out null values (failed fetches)
      } catch (err) {
        console.error('Failed to fetch assigned users:', err);
        setError('Failed to load assigned users.');
      } finally {
        setLoading(false);
      }
    };
  


const handleRemoveUser = async (userId: string) => {
  modals.openConfirmModal({
    title: 'Confirm Removal',
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to remove this user from the assigned list? This action cannot be undone.
      </Text>
    ),
    labels: { confirm: 'Remove', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    onConfirm: async () => {
      try {
        setLoading(true);

        // Call the API to revoke the user with ticketId
        await ticketRoutes.revokeUserFromAssigned({ ticketId, userId });

        // Remove the user from cache and state
        userCache.current.delete(userId);
        setAssignedUsers((prev) => prev.filter((user) => user.id !== userId));

        console.log(`User ${userId} removed successfully`);
      } catch (err) {
        console.error(`Failed to remove user with ID: ${userId}`, err);
        setError('Failed to remove user from assigned list.');
      } finally {
        setLoading(false);
      }
    },
  });
};


    useEffect(() => {
      if (assigned.length > 0) {
        fetchAssignedUsers();
      } else {
        setAssignedUsers([]); // Reset if no assigned users
        setLoading(false);
      }
    }, [assigned]);
  
    if (loading) return <Loader size="sm" />;
    if (error) return <Text color="red">{error}</Text>;
  
    return (
      <Group gap="sm">
        {assignedUsers.length > 0 ? (
          assignedUsers.map((user) => (
            <Group key={user.id} gap="sm">
              <Avatar src={user.avatar || ''} radius="xl" />
              <Box>
                <Text size="sm" fw={500}>
                  {user.first_name} {user.last_name}
                </Text>
                <Text size="xs" color="dimmed">
                  {user.email_address || 'No email provided'}
                </Text>
                <Button leftSection={<IconTrash style={iconStyle} />} variant='outline' size='xs' onClick={() => handleRemoveUser(user.user_id)}>Remove</Button>
              </Box>
            </Group>
          ))
        ) : (
          <Text size="sm" color="dimmed">
            No assigned users available.
          </Text>
        )}
      </Group>
    );
  };


  const SharedUsersRenderer = ({ shared, ticketId }: SharedUsersProps) => {
    const [sharedUsers, setSharedUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userCache = useRef<Map<string, any>>(new Map()); // Cache for user data
  
    const fetchSharedUsers = async () => {
      setLoading(true);
      try {
        
        const dataPromises = shared.map(async (userId) => {
          if (userCache.current.has(userId)) {
            return userCache.current.get(userId); // Use cached data
          }
  
          const response = await userRoutes.getUserById(userId);
          const userData = response.data.user;
          userCache.current.set(userId, userData); // Cache the fetched data
          return userData;
        });
        
        const users = await Promise.all(dataPromises);
        setSharedUsers(users);
      } catch (err) {
        console.error('Failed to fetch shared users:', err);
        setError('Failed to load shared users.');
      } finally {
        setLoading(false);
      }
    };



const handleRemoveUser = async (userId: string) => {
  modals.openConfirmModal({
    title: 'Confirm Removal',
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to remove this user from the shared list? This action cannot be undone.
      </Text>
    ),
    labels: { confirm: 'Remove', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    onConfirm: async () => {
      try {
        setLoading(true);

        // Call the API to revoke the user with ticketId
        await ticketRoutes.revokeUserFromShared({ ticketId, userId });

        // Remove the user from cache and state
        userCache.current.delete(userId);
        setSharedUsers((prev) => prev.filter((user) => user.id !== userId));

        console.log(`User ${userId} removed successfully`);
      } catch (err) {
        console.error(`Failed to remove user with ID: ${userId}`, err);
        setError('Failed to remove user from assigned list.');
      } finally {
        setLoading(false);
      }
    },
  });
};
  
    useEffect(() => {
      fetchSharedUsers();
    }, [shared]);

    // useEffect(() => {
    //   if (shared.length > 0) {
    //     fetchSharedUsers();
    //   } else {
    //     setSharedUsers([]); // Reset if no assigned users
    //     setLoading(false);
    //   }
    // }, [shared]);
  
    if (loading) return <Loader size="sm" />;
    if (error) return <Text color="red">{error}</Text>;
  
    return (
      <Group gap="sm">
        {sharedUsers.length > 0 ? (
          sharedUsers.map((user) => (
            <Group key={user.id} gap="sm">
              <Avatar src={user.avatar || ''} radius="xl" />
              <Box>
                <Text size="sm" fw={500}>
                  {user.first_name} {user.last_name}
                </Text>
                <Text size="xs" color="dimmed">
                  {user.email_address || 'No email provided'}
                </Text>
                <Button leftSection={<IconTrash style={iconStyle} />} variant='outline' size='xs' onClick={() => handleRemoveUser(user.user_id)}>Remove</Button>
              </Box>

            </Group>
          ))
        ) : (
          <Text size="sm" color="dimmed">
            No shared users available.
          </Text>
        )}
      </Group>
    );
  };




  const fetchTickets = useCallback(async () => {
    try {
      const response = await ticketRoutes.getAllTickets(); // API call
      const newTickets = response.data.tickets;
      // Only update tickets if there are new changes
      if (JSON.stringify(newTickets) !== JSON.stringify(tickets)) {
        setTickets(newTickets);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load tickets.');
    } finally {
      setLoading(false);
    }
  }, [tickets]);

  useEffect(() => {
    fetchTickets(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchTickets(); // Fetch data every 10 seconds
    }, 10000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [fetchTickets]);


  const RepliesRenderer = ({ ticketId }: { ticketId: string }) => {
    const [replies, setReplies] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const repliesCache = useRef<Map<string, any[]>>(new Map()); // Cache for replies
    const { fetchData } = useApi<{ replies: any[] }>(); // Using your existing useApi hook
  
    const fetchReplies = useCallback(async () => {
      setLoading(true);
      try {
        const cachedReplies = repliesCache.current.get(ticketId);
        if (cachedReplies) {
          setReplies(cachedReplies);
          setLoading(false);
          return;
        }
  
        const response = await fetchData({
          method: 'GET',
          url: `/tickets/${ticketId}/replies`,
        });
  
        const fetchedReplies = response.data.replies;
  
        repliesCache.current.set(ticketId, fetchedReplies);
        setReplies(fetchedReplies);
      } catch (err) {
        console.error('Failed to fetch replies:', err);
        setError('No Replies');
      } finally {
        setLoading(false);
      }
    }, [ticketId, fetchData]);
  
    useEffect(() => {
      fetchReplies(); // Initial fetch
  
      const intervalId = setInterval(() => {
        fetchReplies(); // Poll every 10 seconds
      }, 10000);
  
      return () => clearInterval(intervalId); // Cleanup on unmount
    }, [fetchReplies]);
  
    if (loading) return <Loader size="sm" />;
    if (error) return <Text c="dimmed">{error}</Text>;

    return (
      <Box>
        {replies.length > 0 ? (
          replies.map((reply) => (
            <>
            <Paper key={reply.id} withBorder style={{ marginBottom: '10px', padding: '10px' }}>
              <Grid>
                <Grid.Col span={2}><Avatar src={reply.user?.avatar || ''} radius="xl" /></Grid.Col>
                <Grid.Col span={6}>
                  <Text fw={500}>{reply.user?.first_name || 'Unknown'}</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                <Text size="sm" color="dimmed">
                    {reply.detail}
                  </Text>                  
                </Grid.Col>

                  <br />
              </Grid>
              <Paper style={{boxShadow:'none'}}>
                    <ReplyAttachmentRenderer attachments={reply.attachments} />
              </Paper>
              <Text size="xs" color="dimmed">
                {new Date(reply.date).toLocaleString()}
              </Text>
            </Paper>
            </>))
        ) : (
          <Text size="sm" color="dimmed">
            No replies available.
          </Text>
        )}
      </Box>
    );
  };

  
  
  const columns = useMemo<MRT_ColumnDef<Ticket>[]>(
    () => [
      {
        id: 'ticketDetails',
        header: 'Ticket Details',
        columns: [

          {
            accessorKey: 'senderId', // Key to fetch senderId from row
            id: 'sender',
            header: 'Sender',
            filterVariant: 'autocomplete',
            Cell: ({ cell }) => {
              const senderId = cell.getValue<string>();
              const [senderInfo, setSenderInfo] = useState<any>(null); // Store user info
              const [loading, setLoading] = useState<boolean>(true);
        
              useEffect(() => {
                const fetchSenderInfo = async () => {
                  if (senderCache.current.has(senderId)) {
                    // Use cached data if available

                    setSenderInfo(senderCache.current.get(senderId));
                    
                    setLoading(false);
                    return;
                  }
          
                  try {
                    const response = await userRoutes.getUserById(senderId); // Use userRoutes to fetch user data
                    const userData = response.data.user;
                    senderCache.current.set(senderId, userData); // Cache the fetched data
                    setSenderInfo(userData);
                    
                  } catch (err) {
                    console.error('Failed to fetch sender info:', err);
                  } finally {
                    setLoading(false);
                  }
                };
        
                fetchSenderInfo();
              }, [senderId]);
        
              if (loading) {
                return <Text>Loading...</Text>; // Show a loading state
              }
        
              if (!senderInfo) {
                return <Text color="red">Error fetching sender</Text>; // Error state
              }
        
              return (
                <Group gap="sm">
                  <Avatar src={senderInfo.avatar || ''} radius="xl" />
                  <Box>
                    {/* <Text fw={500}>{senderInfo.name || 'Unknown Sender'}</Text> */}
                    <Text size="sm" color="dimmed">
                      {senderInfo.first_name}
                    </Text>
                  </Box>
                </Group>
              );
            },
          }
          ,
          {
            accessorFn: (row) => `${row.subject}`, // Subject
            id: 'subject',
            header: 'Subject',
            filterVariant: 'autocomplete',
            Cell: ({ renderedCellValue }) => (
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Text fw={500}>{renderedCellValue}</Text>
              </Box>
            ),
          },
          {
            accessorKey: 'status',
            header: 'Status',
            filterVariant: 'multi-select',
          },
          {
            accessorFn: (row) => new Date(row.date).toLocaleDateString(),
            id: 'date',
            header: 'Date',
            filterVariant: 'date-range',
            Cell: ({ cell }) => cell.getValue<string>(),
          },
          {
            accessorKey: 'department',
            header: 'Department',
            Cell: ({ cell }) => (
              <Group>
                {cell.getValue<string[]>().map((dept) => (
                  <Pill>
                  <Text key={dept} size="sm">
                    {dept}
                  </Text>
                  </Pill>
                ))}
              </Group>
            ),
          },
        ],
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: tickets,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableRowActions: true,
    enableExpanding: true, // Enable expand row
    enableRowSelection: true,
    initialState: {
      columnPinning: {
        right: ['mrt-row-actions', 'mrt-row-expand'], // Pin both actions and expand columns to the right
      },
    },
    renderRowActionMenuItems: ({ row }) => {
  // Encrypt the data
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify({
        ticketId: row.original.id,
        subject: row.original.subject,
        assigned: row.original.assignedTo,
        senderId:row.original.senderId
      }),
      secretKey
    ).toString();

    const encryptedDataShared = CryptoJS.AES.encrypt(
      JSON.stringify({
        ticketId: row.original.id,
        subject: row.original.subject,
        shared: row.original.shared,
        senderId:row.original.senderId
      }),
      secretKey
    ).toString();


    const encryptedDataStatus = CryptoJS.AES.encrypt(
      JSON.stringify({
        ticketId: row.original.id,
        subject: row.original.subject,
      }),
      secretKey
    ).toString();


    const encryptedDataReply = CryptoJS.AES.encrypt(
      JSON.stringify({
        ticketId: row.original.id,
        subject: row.original.subject,
        senderId:row.original.senderId
      }),
      secretKey
    ).toString();


      return(
      <>
      <Link
          href={{
            pathname: '/assign',
            query: {
              data: encryptedData, // Encrypted data is passed in the query
            },
          }}
          style={{textDecoration:'none'}}
        >
        <Menu.Item leftSection={<IconUsers />}>
          Assign
        </Menu.Item>
        </Link>
        <Link
          href={{
            pathname: '/shared',
            query: {
              data: encryptedDataShared, // Encrypted data is passed in the query
            },
          }}
          style={{textDecoration:'none'}}
        >
        <Menu.Item leftSection={<IconUsers />}>
          Shared
        </Menu.Item>
        </Link>
        <Link
          href={{
            pathname: '/reply',
            query: {
              data: encryptedDataReply, // Encrypted data is passed in the query
            },
          }}
          style={{textDecoration:'none'}}
        >
        <Menu.Item leftSection={<IconMessage />}>
          Reply
        </Menu.Item>
        </Link>
        <Link
          href={{
            pathname: '/status',
            query: {
              data: encryptedDataStatus, // Encrypted data is passed in the query
            },
          }}
          style={{textDecoration:'none'}}
        >
        <Menu.Item leftSection={<IconSettings />}>
          Change Status
        </Menu.Item>
        </Link>
      </>
  )},
 
    renderDetailPanel: ({ row }) => {
      const editor = useEditor({
        extensions: [
          StarterKit,
          Underline,
          Superscript,
          SubScript,
          Highlight,
          TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: row.original.detail || '<p>No details available</p>',
        editable: false, // Make the editor read-only
      });



      const AttachmentRenderer = ({ attachments }: { attachments: string[] }) => {
        const [attachmentData, setAttachmentData] = useState<
          { fileId: string; contentType: string; fileURL: string; filename: string }[]
        >([]);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);
    
        useEffect(() => {
          const fetchAttachmentData = async () => {
            setLoading(true);
            try {
              const dataPromises = attachments.map(async (fileId) => {
                if (attachmentCache.current.has(fileId)) {
                  return { fileId, ...attachmentCache.current.get(fileId)! };
                }
    
                const response = await ticketRoutes.getFileById(fileId);
                const { base64Data, contentType, filename } = response.data;
    
                const binaryString = atob(base64Data);
                const byteArray = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
                const blob = new Blob([byteArray], { type: contentType });
                const fileURL = URL.createObjectURL(blob);
    
                const fileData = { fileURL, contentType, filename };
                attachmentCache.current.set(fileId, fileData);
                return { fileId, ...fileData };
              });
    
              const resolvedData = await Promise.all(dataPromises);
              setAttachmentData(resolvedData);
            } catch (err) {
              setError('Failed to load attachments.');
            } finally {
              setLoading(false);
            }
          };
    
          fetchAttachmentData();
        }, [attachments]);
    
        const handleAttachmentClick = (file: { fileURL: string; contentType: string; filename: string }) => {
          modals.open({
            title: (
              <Group style={{ width: '100%' }}>
                <Pill>
                  Preview: <b>{file.filename}</b>
                </Pill>
                <Button
                  leftSection={<IconDownload size={18} />}
                  size="xs"
                  color="blue"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = file.fileURL;
                    link.download = file.filename;
                    link.click();
                  }}
                >
                  Download
                </Button>
                <Button leftSection={<IconSquareRoundedX size={18} />} size="xs" color="red" onClick={() => modals.closeAll()}>
                  Close
                </Button>
                <Button leftSection={<IconMaximize size={18} />} size="xs" onClick={toggle} color={fullscreen ? 'indianred' : 'grey'}>
                  {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </Button>
                <Button
                  leftSection={<IconArrowBearRight size={18} />}
                  size="xs"
                  onClick={() => window.open(file.fileURL, '_blank')}
                >
                  Open in New Tab
                </Button>
              </Group>
            ),
            size: '90%',
            children: (
              <>
                {file.contentType === 'application/pdf' && <iframe src={file.fileURL} width="100%" height="600px" title="PDF Preview" />}
                {file.contentType.startsWith('image/') && (
                  <Image src={file.fileURL} alt="Image Preview" fit="contain" width="100%" height="600px" />
                )}
                {(file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                  file.contentType === 'application/msword' ||
                  file.contentType === 'application/ms-excel' ||
                  file.contentType === 'application/vnd.ms-excel') && <Text>DOC/DOCX preview not supported. Download to view.</Text>}
              </>
            ),
          });
        };
      
        return (
          <Grid>
            <Grid.Col span={12}>
            <Text style={{ margin: '1% 0%' }}>Attachments <Pill style={{backgroundColor:'lightgreen'}}>{attachmentData.length}</Pill></Text>
            </Grid.Col>

              {attachmentData.map((file, index) => (
                <>
                 <Grid.Col span={3}>
                <Paper
                withBorder
                  key={file.fileId}
                  radius="sm"
                  style={{
                    padding: '1%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    width: '150px',
                    height: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                  onClick={() => handleAttachmentClick(file)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.07)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {file.contentType.startsWith('image/') && (
                    <img src={file.fileURL} alt="Image Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  {file.contentType === 'application/pdf' && <Text size="xs" >PDF</Text>}
                  {(file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                    file.contentType === 'application/msword' || file.contentType === 'application/ms-excel' || file.contentType === 'application/vnd.ms-excel') && (
                    <Text size="xs">DOC/DOCX</Text>
                  )}
                </Paper>
                <br />
                <Text size='xs'>{file.filename}</Text>
                </Grid.Col>
                </>
              ))}

            {error && <Text color="red">{error}</Text>}
          </Grid>
        );
      };
    
      return (
        <Container fluid>
          <Grid>
            <Grid.Col span={8}>
              <Box>
                {/* <Text size="lg" fw={600}>
                  {row.original.subject}
                </Text> */}
                <RichTextEditor editor={editor}>
                  <RichTextEditor.Content />
                </RichTextEditor>
              </Box>
            </Grid.Col>
            <Grid.Col span={4}>
              <Paper style={{boxShadow:'none', padding:'3%'}}>
   
              <Tabs defaultValue="reply">
              <Tabs.List>
                <Tabs.Tab value="reply" leftSection={<IconMessage style={iconStyle} />}>
                  Replies
                </Tabs.Tab>
                <Tabs.Tab value="assignee" leftSection={<IconUsers style={iconStyle} />}>
                  Assignee
                </Tabs.Tab>
                <Tabs.Tab value="shared" leftSection={<IconUsers style={iconStyle} />}>
                  Shared
                </Tabs.Tab>
              </Tabs.List>
              <ScrollArea h={400} offsetScrollbars scrollbarSize={14} viewportRef={viewport}>
              <Tabs.Panel value="reply">
                <p>Replies</p>
                <RepliesRenderer ticketId={row.original.id} />
              </Tabs.Panel>

              <Tabs.Panel value="assignee">
                <p>Assigned</p>
                <AssignedUsersRenderer assigned={row.original.assignedTo} ticketId={row.original.id}/>
              </Tabs.Panel>

              <Tabs.Panel value="shared">
                <p>Shared</p>
                <SharedUsersRenderer shared={row.original.shared} ticketId={row.original.id}/>
              </Tabs.Panel>
              </ScrollArea>
              <Group justify="center">
              <Button onClick={scrollToTop} color='grey' variant='outline' leftSection={<IconArrowUp style={iconStyle} />} size='xs'>Top</Button>
              <Button onClick={scrollToCenter} color='grey' variant='outline' leftSection={<IconArrowLeftRight style={iconStyle} />} size='xs'>Center</Button>
              <Button onClick={scrollToBottom} color='grey' variant='outline' leftSection={<IconArrowDown style={iconStyle} />} size='xs'>Down</Button>
            </Group>
            </Tabs>
           
              </Paper>
            </Grid.Col>
            <Grid.Col span={12}>
            <AttachmentRenderer attachments={row.original.attachments} />
            </Grid.Col>
          </Grid>
        </Container>
      );
    },
    
  });


  return (
    <Box>
      {/* {error && <Text color="red">{error}</Text>} */}
      {loading && <Loader size="xl" />}
        {/* {error && <Text color="red">{error}</Text>} */}
        {!loading && tickets.length === 0 && <Text>No tickets available.</Text>}
        {!loading && tickets.length > 0 && (
      <MantineReactTable table={table} />
    )}
    </Box>
  );
};

export default AllTicketsAdmin;
