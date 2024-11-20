
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
import { List, ThemeIcon, rem } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed, IconFile } from '@tabler/icons-react';
import { IconPhoto, IconFileTypePdf, IconFileTypeDoc } from '@tabler/icons-react';
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

const MAX_FILES = 10;
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
];

export const ReplyUserTicket = ({
    ticketId,
  }: {
    ticketId: string;
  }) => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resetRef = useRef<() => void>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <IconPhoto style={{ width: rem(28), height: rem(28) }} />;
    } else if (fileType === 'application/pdf') {
      return <IconFileTypePdf style={{ width: rem(28), height: rem(28) }} />;
    } else if (
      fileType === 'application/msword' ||
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return <IconFileTypeDoc style={{ width: rem(28), height: rem(28) }} />;
    } else {
      return <IconFile style={{ width: rem(28), height: rem(28) }} />;
    }
  };

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
    content: '<p>Add your reply here</p>',
  });

  const form = useForm({
    initialValues: {
      subject: '',
      module: [],
    },
    // validate: {
    //   subject: (value) => (value.length >= 3 ? null : 'Subject must be at least 3 characters'),
    //   module: (value) => (value.length > 0 ? null : 'Select at least one module'),
    // },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('ticketId', ticketId);
      formData.append('detail', editor?.getText() || '');

      files.forEach((file) => formData.append('attachments', file));

      await ticketRoutes.addReply(formData);

      setSuccess('Reply created successfully!');
      form.reset();
      editor?.commands.clearContent();
      setFiles([]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create ticket.');
    }
  };

  const handleFileUpload = (file: File | null) => {
    if (!file) return;

    if (files.length >= MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError('Unsupported file type. Allowed types: jpg, jpeg, png, doc, docx, txt, pdf, xls, ppt, pptx, xlsx.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(`File size exceeds 15 MB limit. Please upload smaller files.`);
      return;
    }

    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <Paper style={{ padding: '2%' }} shadow="md">

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

          {/* <Text>Reply Details</Text> */}
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
            <Paper style={{boxShadow:'none', border:'1px solid rgba(0,0,0,0.3)', padding:'0.8%'}}>
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
            <List spacing="xs" size="sm" center>
            {files.map((file, index) => (
              <List.Item
                key={index}
                icon={
                  <ThemeIcon color="grey" size={40} radius="md">
                    {getFileIcon(file.type)}
                  </ThemeIcon>
                }
              >
                <Group gap={12}>
                  <Text>{file.name}</Text>
                  <Button size="xs" color="red" onClick={() => removeFile(index)}>
                    Remove
                  </Button>
                </Group>
              </List.Item>
            ))}
          </List>
          </Group>
          <br />
          <br />


          <Group justify="center">
            <Button type="submit" mt="lg" size="lg" variant="outline">
              Submit Reply
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
