
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; // if using Mantine date picker features
import 'mantine-react-table/styles.css'; // make sure MRT styles are imported
import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
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
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from 'mantine-react-table';
import {
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
  Loader
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUserCircle, IconSend, IconDownload,IconSquareRoundedX, IconMaximize, IconTrash, IconArrowBearRight } from '@tabler/icons-react';
import { ticketRoutes } from '../../utils/api'; // API to fetch ticket data
import { userRoutes } from '../../utils/api'; // Assuming userRoutes is properly imported
export type Ticket = {
  id: string;
  subject: string;
  senderId: string;
  status: string;
  detail: string;
  department: string[];
  shared: string[];
  attachments: string[];
  replies:string[];
  date: string;
  avatar: string;
};

const AllTickets = () => {
  const { toggle, fullscreen } = useFullscreen();
  const [opened, { open, close }] = useDisclosure(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi<{ tickets: Ticket[] }>();
  const [loading, setLoading] = useState(true);
  const attachmentCache = useRef<Map<string, { fileURL: string; contentType: string; filename: string }>>(new Map());
  const senderCache = useRef<Map<string, any>>(new Map()); // Cache for sender data
  const fetchTickets = useCallback(async () => {
    try {
      const response = await ticketRoutes.getTicketsByUser(); // API call
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
    renderRowActionMenuItems: ({ row }) => (
      <>
        <Menu.Item leftSection={<IconUserCircle />}>View Ticket</Menu.Item>
        <Menu.Item leftSection={<IconSend />}>Assign</Menu.Item>
        <Menu.Item leftSection={<IconSend />}>Share</Menu.Item>
      </>
    ),
 
    renderDetailPanel: ({ row }) => {
      const editor = useEditor({
        extensions: [
          StarterKit,
          Underline,
          Link,
          Superscript,
          SubScript,
          Highlight,
          TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: row.original.detail || '<p>No details available</p>',
        editable: false, // Make the editor read-only
      });

      // const AttachmentRenderer = ({ attachments }: { attachments: string[] }) => {
      //   const [attachmentData, setAttachmentData] = useState<
      //     { fileId: string; contentType: string; fileURL: string; filename: string }[]
      //   >([]);
      //   const [error, setError] = useState<string | null>(null);
      
      //   useEffect(() => {
      //     const fetchAttachmentData = async () => {
      //       try {
              
      //         const dataPromises = attachments.map(async (fileId) => {
      //           const response = await ticketRoutes.getFileById(fileId);
      //           const { base64Data, contentType, filename } = response.data;
      
      //           // Decode base64 and create a Blob URL for preview
      //           const binaryString = atob(base64Data);
      //           const byteArray = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
      //           const blob = new Blob([byteArray], { type: contentType });
      //           const fileURL = URL.createObjectURL(blob);
      
      //           return { fileId, contentType, fileURL, filename };
      //         });
      
      //         const resolvedData = await Promise.all(dataPromises);
      //         setAttachmentData(resolvedData);
      //       } catch (err) {
      //         setError('Failed to load attachments.');
      //       }
      //     };
      
      //     fetchAttachmentData();
      //   }, [attachments]);
      
      //   const handleAttachmentClick = (file: { fileURL: string; contentType: string; filename: string }) => {
      //     modals.open({
      //       title: (
      //         <Group style={{ width: '100%' }}>
      //           <Pill>Preview: <b>{file.filename}</b></Pill>
      //           <Button
      //             leftSection={<IconDownload size={18} />}
      //             size="xs"
      //             color="blue"
      //             onClick={() => {
      //               const downloadLink = document.createElement('a');
      //               downloadLink.href = file.fileURL;
      //               downloadLink.download = file.filename;
      //               downloadLink.click();
      //             }}
      //           >
      //             Download
      //           </Button>
      //           <Button 
      //           leftSection={<IconSquareRoundedX size={18} />}
      //           size="xs"
      //           color="red" onClick={() => modals.closeAll()}>
      //             Close
      //           </Button>
      //           <Button 
      //           leftSection={<IconMaximize size={18} />}
      //           size="xs"
      //           onClick={toggle} 
      //           color={fullscreen ? 'indianred' : 'grey'}  
      //           >
      //              {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      //           </Button>
      //           <Button
      //           leftSection={<IconArrowBearRight size={18} />}
      //           size='xs'
      //              onClick={() => {
      //              window.open(file.fileURL, '_blank'); // Opens in a new tab
      //                }}
      //            >
      //          Open in New Tab
      //        </Button>
      //         </Group>
      //       ),
      //       size: '90%',
      //       children: (
      //         <>
      //           {file.contentType === 'application/pdf' && (
      //             <iframe src={file.fileURL} width="100%" height="600px" title="PDF Preview" />
      //           )}
      //           {file.contentType.startsWith('image/') && (
      //             <Image src={file.fileURL} alt="Image Preview" fit="contain" width="100%" height="600px" />
      //           )}
      //           {file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      //           file.contentType === 'application/msword' || file.contentType === 'application/ms-excel' || file.contentType === 'application/vnd.ms-excel'? (
      //             <Text>DOC/DOCX preview is not supported. Download to view.</Text>
      //           ) : null}
      

      //         </>
      //       ),
      //     });
      //   };

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
          <Grid.Col span={12}>
            <Text style={{ margin: '1% 0%' }}>Attachments <Pill style={{backgroundColor:'lightgreen'}}>{attachmentData.length}</Pill></Text>
            <Group>
              {attachmentData.map((file, index) => (
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
              ))}
            </Group>
            {error && <Text color="red">{error}</Text>}
          </Grid.Col>
        );
      };
    
      return (
        <Container>
          <Grid>
            <Grid.Col span={8}>
              <Box>
                <Text size="lg" fw={600}>
                  {row.original.subject}
                </Text>
                <RichTextEditor editor={editor}>
                  <RichTextEditor.Content />
                </RichTextEditor>
              </Box>
            </Grid.Col>
            <Grid.Col span={4}>
              <Paper>
                <Group>
                  <Avatar radius="xl" />
                  <Text>{row.original.senderId}</Text>
                </Group>
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
      {error && <Text color="red">{error}</Text>}
      {loading && <Loader size="xl" />}
        {error && <Text color="red">{error}</Text>}
        {!loading && tickets.length === 0 && <Text>No tickets available.</Text>}
        {!loading && tickets.length > 0 && (
      <MantineReactTable table={table} />
    )}
    </Box>
  );
};

export default AllTickets;
