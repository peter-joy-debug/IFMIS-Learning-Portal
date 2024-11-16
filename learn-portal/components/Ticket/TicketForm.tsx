// import { useState } from 'react';
// import { Stepper, Button, Group, TextInput, PasswordInput, Code, Text, Container, Paper, rem, MultiSelect, FileButton, FileInput, FileInputProps, Pill, ActionIcon } from '@mantine/core';
// import { useForm, FORM_INDEX } from '@mantine/form';
// import { RichTextEditor, Link } from '@mantine/tiptap';
// import { useEditor } from '@tiptap/react';
// import Highlight from '@tiptap/extension-highlight';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import TextAlign from '@tiptap/extension-text-align';
// import Superscript from '@tiptap/extension-superscript';
// import SubScript from '@tiptap/extension-subscript';
// import { useRef } from 'react';
// import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
// import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
// import { IconFile } from '@tabler/icons-react';


// const content =
//   '<h2 style="text-align: left;">Add your content here</h2><p>Add details</p>';

// export function TicketForm() {
//     const [file, setFile] = useState<File | null>(null);
//     const resetRef = useRef<() => void>(null);
  
//     const clearFile = () => {
//       setFile(null);
//       resetRef.current?.();
//     };
//     const form = useForm({
//         mode: 'uncontrolled',
//         validateInputOnChange: [
//           'email',
//           'name',
//           // use FORM_INDEX to reference fields indices
//           `jobs.${FORM_INDEX}.title`,
//         ],
//         initialValues: { name: '', email: '', age: 0, jobs: [{ title: '' }, { title: '' }] },
    
//         // functions will be used to validate values at corresponding key
//         validate: {
//           name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
//         //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
//         },
//       });


//       const editor = useEditor({
//         extensions: [
//           StarterKit,
//           Underline,
//           Link,
//           Superscript,
//           SubScript,
//           Highlight,
//           TextAlign.configure({ types: ['heading', 'paragraph'] }),
//         ],
//         content,
//       });
//   return (
//     <>
//     <Container size='md' style={{marginTop:'-5%', marginBottom:'15%'}}>
//     <Paper style={{padding:'2%'}} shadow='md'>
//     <Text style={{margin:'-7% 0% 5% 0%', textAlign:'center'}} fw={500} size='xl'>Create Ticket</Text>
//     <form onSubmit={form.onSubmit(console.log)}>
    
//     <TextInput
//         label="UserID"
//         placeholder="User Id"
//         value='2233334'
//         key={form.key('name')}
//         {...form.getInputProps('name')}
//       />
//     <br />
//       <TextInput
//         label="Subject"
//         placeholder="Enter Subject"
//         key={form.key('name')}
//         {...form.getInputProps('name')}
//       />
//       <br />
//       <MultiSelect
//         label="Module"
//         required
//         placeholder="Pick value"
//         data={['GeneralQuestion', 'COA', 'Budget', 'Planning', 'Debtor', 'Vendor', 'Procurement']}
//       />

//       <br />
//       <Text>Details</Text>
//       <br />
//         <RichTextEditor editor={editor}>
//         <RichTextEditor.Toolbar sticky stickyOffset={200}>

//         </RichTextEditor.Toolbar>
//         <div style={{border:'1px solid lightblue', padding:'2%'}}> 
//         <RichTextEditor.Content />
//         </div>
//         </RichTextEditor>
//         <br />
//         <br />
//         <Text>Attachments</Text><br />
//         <Group justify="left">
//         <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
//           {(props) => <Button {...props}>Upload image</Button>}
//         </FileButton>
//         <Button disabled={!file} color="red" onClick={clearFile}>
//           Reset
//         </Button>
//       </Group>

//       {file && (
//         <Text size="sm" ta="center" mt="sm">
//           Picked file: {file.name}
//         </Text>
//       )}
//     <br />
//     <br />
//     <Group justify='center'>
//       <Button type="submit" mt="lg" style={{textAlign:'right'}} size='lg' variant='outline'>
//         Submit Ticket
//       </Button>
//     </Group>
      
//     </form>
//     </Paper>
//     </Container>
//     </>
//   );
// }

// import { useState, useEffect, useRef } from 'react';
// import {
//   TextInput,
//   MultiSelect,
//   FileButton,
//   Button,
//   Text,
//   Container,
//   Paper,
//   Group,
//   Notification,
// } from '@mantine/core';
// import { RichTextEditor, Link } from '@mantine/tiptap';
// import { useEditor } from '@tiptap/react';
// import Highlight from '@tiptap/extension-highlight';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import TextAlign from '@tiptap/extension-text-align';
// import Superscript from '@tiptap/extension-superscript';
// import SubScript from '@tiptap/extension-subscript';
// import { useForm } from '@mantine/form';
// import { useNavigate } from 'react-router-dom'; // Adjust if using another routing library
// import { IconCheck, IconX } from '@tabler/icons-react';
// import api from '../../utils/api'; // Your Axios instance

// export function TicketForm() {
//   const [files, setFiles] = useState<File[]>([]); // For multiple attachments
//   const [success, setSuccess] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const resetRef = useRef<() => void>(null);
//   const navigate = useNavigate();

//   const form = useForm({
//     initialValues: {
//       userId: '',
//       subject: '',
//       module: [],
//       details: '',
//     },
//     validate: {
//       userId: (value) => (value ? null : 'User ID is required'),
//       subject: (value) => (value.length >= 3 ? null : 'Subject must be at least 3 characters'),
//       module: (value) => (value.length > 0 ? null : 'At least one module must be selected'),
//     },
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('You must be authenticated to create a ticket.');
//       navigate('/authentication');
//     }
//   }, [navigate]);

//   const handleSubmit = async (values: typeof form.values) => {
//     setError(null);
//     setSuccess(null);

//     try {
//       const formData = new FormData();
//       formData.append('userId', values.userId);
//       formData.append('subject', values.subject);
//       formData.append('module', values.module.join(','));
//       formData.append('details', values.details);

//       files.forEach((file) => formData.append('attachments', file));

//       const response = await api.post('/tickets', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setSuccess('Ticket created successfully!');
//       form.reset();
//       setFiles([]);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to create ticket.');
//     }
//   };

//   const handleFileUpload = (file: File | null) => {
//     if (file) setFiles((prevFiles) => [...prevFiles, file]);
//   };

//   const removeFile = (index: number) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//         const editor = useEditor({
//         extensions: [
//           StarterKit,
//           Underline,
//           Link,
//           Superscript,
//           SubScript,
//           Highlight,
//           TextAlign.configure({ types: ['heading', 'paragraph'] }),
//         ],
//         content,
//       });

//   return (
//     <Container size="md" style={{ marginTop: '-5%', marginBottom: '15%' }}>
//       <Paper style={{ padding: '2%' }} shadow="md">
//         <Text
//           style={{ margin: '-7% 0% 5% 0%', textAlign: 'center' }}
//           fw={500}
//           size="xl"
//         >
//           Create Ticket
//         </Text>

//         {success && (
//           <Notification icon={<IconCheck />} color="teal" onClose={() => setSuccess(null)}>
//             {success}
//           </Notification>
//         )}
//         {error && (
//           <Notification icon={<IconX />} color="red" onClose={() => setError(null)}>
//             {error}
//           </Notification>
//         )}

//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <TextInput
//             label="User ID"
//             placeholder="Enter your user ID"
//             {...form.getInputProps('userId')}
//           />
//           <br />
//           <TextInput
//             label="Subject"
//             placeholder="Enter Subject"
//             {...form.getInputProps('subject')}
//           />
//           <br />
//           <MultiSelect
//             label="Module"
//             required
//             placeholder="Select Modules"
//             data={[
//               'GeneralQuestion',
//               'COA',
//               'Budget',
//               'Planning',
//               'Debtor',
//               'Vendor',
//               'Procurement',
//             ]}
//             {...form.getInputProps('module')}
//           />
//           <br />
//           <Text>Details</Text>
//           <RichTextEditor
//             {...form.getInputProps('details')}
//           />
          
//           <br />
//           <Text>Attachments</Text>
//           <Group>
//             <FileButton resetRef={resetRef} onChange={handleFileUpload}>
//               {(props) => <Button {...props}>Upload Attachment</Button>}
//             </FileButton>
//           </Group>
//           <Group mt="sm">
//             {files.map((file, index) => (
//               <Group key={index} spacing="xs">
//                 <Text>{file.name}</Text>
//                 <Button size="xs" color="red" onClick={() => removeFile(index)}>
//                   Remove
//                 </Button>
//               </Group>
//             ))}
//           </Group>
//           <br />
//           <Group justify="center">
//             <Button type="submit" mt="lg" size="lg" variant="outline">
//               Submit Ticket
//             </Button>
//           </Group>
//         </form>
//       </Paper>
//     </Container>
//   );
// }

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/router'; // Correct import for Next.js
// import {
//   TextInput,
//   MultiSelect,
//   FileButton,
//   Button,
//   Text,
//   Container,
//   Paper,
//   Group,
//   Notification,
// } from '@mantine/core';
// import { RichTextEditor} from '@mantine/tiptap';
// import { useForm } from '@mantine/form';
// import { useNavigate } from 'react-router-dom'; // Adjust if using another routing library
// import { IconCheck, IconX } from '@tabler/icons-react';
// import { useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import Link from '@tiptap/extension-link';
// import Superscript from '@tiptap/extension-superscript';
// import Subscript from '@tiptap/extension-subscript';
// import Highlight from '@tiptap/extension-highlight';
// import TextAlign from '@tiptap/extension-text-align';
// import api from '../../utils/api'; // Your Axios instance

// export function TicketForm() {
//   const router = useRouter(); // Use Next.js router
//   const [files, setFiles] = useState<File[]>([]);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const resetRef = useRef<() => void>(null);
//   const [userId, setUserId] = useState<string | null>(null); // Store user ID
//   // const navigate = useNavigate();

//   // Initialize the editor
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Link,
//       Superscript,
//       Subscript,
//       Highlight,
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content: '<p>Add your details here</p>', // Default content
//   });

//   const form = useForm({
//     initialValues: {
//       userId: '',
//       subject: '',
//       module: [],
//     },
//     validate: {
//       userId: (value) => (value ? null : 'User ID is required'),
//       subject: (value) => (value.length >= 3 ? null : 'Subject must be at least 3 characters'),
//       module: (value) => (value.length > 0 ? null : 'At least one module must be selected'),
//     },
//   });

//     // Fetch user token and extract user ID
//     useEffect(() => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('You must be authenticated to create a ticket.');
//         router.push('/authentication');
//         return;
//       }
  
//       try {
//         const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
//         setUserId(user.id); // Set user ID from token
//       } catch (e) {
//         setError('Invalid token. Please log in again.');
//         router.push('/authentication');
//       }
//     }, [router]);


//   const handleSubmit = async (values: typeof form.values) => {
//     setError(null);
//     setSuccess(null);

//     try {
//       const formData = new FormData();
//       formData.append('userId', values.userId);
//       formData.append('subject', values.subject);
//       formData.append('module', values.module.join(','));
//       formData.append('details', editor?.getHTML() || ''); // Get editor content as HTML

//       files.forEach((file) => formData.append('attachments', file));

//       const response = await api.post('/tickets', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setSuccess('Ticket created successfully!');
//       form.reset();
//       editor?.commands.clearContent(); // Clear editor content
//       setFiles([]);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to create ticket.');
//     }
//   };

//   const handleFileUpload = (file: File | null) => {
//     if (file) setFiles((prevFiles) => [...prevFiles, file]);
//   };

//   const removeFile = (index: number) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   return (
//     <Container size="md" style={{ marginTop: '-5%', marginBottom: '15%' }}>
//       <Paper style={{ padding: '2%' }} shadow="md">
//         <Text
//           style={{ margin: '-7% 0% 5% 0%', textAlign: 'center' }}
//           fw={500}
//           size="xl"
//         >
//           Create Ticket
//         </Text>

//         {success && (
//           <Notification icon={<IconCheck />} color="teal" onClose={() => setSuccess(null)}>
//             {success}
//           </Notification>
//         )}
//         {error && (
//           <Notification icon={<IconX />} color="red" onClose={() => setError(null)}>
//             {error}
//           </Notification>
//         )}

//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <TextInput
//             label="User ID"
//             placeholder="Enter your user ID"
//             {...form.getInputProps('userId')}
//           />
//           <br />
//           <TextInput
//             label="Subject"
//             placeholder="Enter Subject"
//             {...form.getInputProps('subject')}
//           />
//           <br />
//           <MultiSelect
//             label="Module"
//             required
//             placeholder="Select Modules"
//             data={[
//               'GeneralQuestion',
//               'COA',
//               'Budget',
//               'Planning',
//               'Debtor',
//               'Vendor',
//               'Procurement',
//             ]}
//             {...form.getInputProps('module')}
//           />
//           <br />
//           <Text>Details</Text>
//           <RichTextEditor editor={editor}>
//             <RichTextEditor.Toolbar sticky stickyOffset={200}>
//               <Group>
//                 <RichTextEditor.Bold />
//                 <RichTextEditor.Italic />
//                 <RichTextEditor.Underline />
//                 <RichTextEditor.Strikethrough />
//                 <RichTextEditor.ClearFormatting />
//                 <RichTextEditor.Highlight />
//                 <RichTextEditor.Code />
//                 <RichTextEditor.H1 />
//                 <RichTextEditor.H2 />
//                 <RichTextEditor.H3 />
//                 <RichTextEditor.Blockquote />
//                 <RichTextEditor.BulletList />
//                 <RichTextEditor.OrderedList />
//               </Group>
//             </RichTextEditor.Toolbar>
//             <RichTextEditor.Content />
//           </RichTextEditor>
//           <br />
//           <Text>Attachments</Text>
//           <Group>
//             <FileButton resetRef={resetRef} onChange={handleFileUpload}>
//               {(props) => <Button {...props}>Upload Attachment</Button>}
//             </FileButton>
//           </Group>
//           <Group mt="sm">
//             {files.map((file, index) => (
//               <Group key={index} gap={12}>
//                 <Text>{file.name}</Text>
//                 <Button size="xs" color="red" onClick={() => removeFile(index)}>
//                   Remove
//                 </Button>
//               </Group>
//             ))}
//           </Group>
//           <br />
//           <Group justify="center">
//             <Button type="submit" mt="lg" size="lg" variant="outline">
//               Submit Ticket
//             </Button>
//           </Group>
//         </form>
//       </Paper>
//     </Container>
//   );
// }


import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'; // Next.js Router
import {
  TextInput,
  MultiSelect,
  FileButton,
  Button,
  Text,
  Container,
  Paper,
  Group,
  Notification,
} from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useForm } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import api from '../../utils/api'; // Axios instance
import { ticketRoutes } from '../../utils/api'; // Import ticketRoutes
export function TicketForm() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resetRef = useRef<() => void>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch user token and extract user ID
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be authenticated to create a ticket.');
      router.push('/authentication');
      return;
    }

    try {
      const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      setUserId(user.id); // Set user ID from token
    } catch {
      setError('Invalid token. Please log in again.');
      router.push('/authentication');
    }
  }, [router]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '<p>Add your details here</p>',
  });

  const form = useForm({
    initialValues: {
      subject: '',
      module: [],
    },
    validate: {
      subject: (value) => (value.length >= 3 ? null : 'Subject must be at least 3 characters'),
      module: (value) => (value.length > 0 ? null : 'Select at least one module'),
    },
  });


  const handleSubmit = async (values: typeof form.values) => {
    setError(null);
    setSuccess(null);
  
    try {
      const formData = new FormData();
      formData.append('subject', values.subject);
      formData.append('detail', editor?.getHTML() || '');
      formData.append('department', values.module.join(','));
  
      files.forEach((file) => formData.append('attachments', file));
  
      await ticketRoutes.createTicket(formData); // Structured API method with headers
  
      setSuccess('Ticket created successfully!');
      form.reset();
      editor?.commands.clearContent();
      setFiles([]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create ticket.');
    }
  };
  
  

  const handleFileUpload = (file: File | null) => {
    if (file) setFiles((prevFiles) => [...prevFiles, file]);
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Container size="md" style={{ marginTop: '-5%', marginBottom: '15%' }}>
      <Paper style={{ padding: '2%' }} shadow="md">
        <Text
          style={{ margin: '-7% 0% 5% 0%', textAlign: 'center' }}
          fw={500}
          size="xl"
        >
          Create Ticket
        </Text>

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
          {/* Hidden User ID Field */}
          <input type="hidden" value={userId || ''} name="userId" />

          <TextInput
            label="Subject"
            placeholder="Enter Subject"
            {...form.getInputProps('subject')}
          />
          <br />
          <MultiSelect
            label="Module"
            required
            placeholder="Select Modules"
            data={[
              'General',
              'COA',
              'Budget',
              'Planning',
              'Debtor',
              'Vendor',
              'Procurement',
            ]}
            {...form.getInputProps('module')}
          />
          <br />
          <Text>Details</Text>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar>
            <Group>  
            <Group>

            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            </Group>

            <Group>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
            </Group>

            <Group>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
            </Group>

            <Group>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
            </Group>

            <Group>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
            </Group>

            <Group>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
            </Group>
            </Group>  
            </RichTextEditor.Toolbar>
            <Paper style={{border:'1px solid rgba(0,0,0,0.2)', boxShadow:'none'}} >
            <RichTextEditor.Content />
            </Paper>
          </RichTextEditor>
          <br />
          <Text>Attachments</Text>
          <Group>
            <FileButton resetRef={resetRef} onChange={handleFileUpload}>
              {(props) => <Button {...props}>Upload Attachment</Button>}
            </FileButton>
          </Group>
          <Group mt="sm">
            {files.map((file, index) => (
              <Group key={index} gap={12}>
                <Text>{file.name}</Text>
                <Button size="xs" color="red" onClick={() => removeFile(index)}>
                  Remove
                </Button>
              </Group>
            ))}
          </Group>
          <br />
          <Group justify="center">
            <Button type="submit" mt="lg" size="lg" variant="outline">
              Submit Ticket
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
