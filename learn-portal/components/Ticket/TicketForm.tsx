import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code, Text, Container, Paper, rem, MultiSelect, FileButton, FileInput, FileInputProps, Pill, ActionIcon } from '@mantine/core';
import { useForm, FORM_INDEX } from '@mantine/form';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useRef } from 'react';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconFile } from '@tabler/icons-react';


const content =
  '<h2 style="text-align: left;">Add your content here</h2><p>Add details</p>';

export function TicketForm() {
    const [file, setFile] = useState<File | null>(null);
    const resetRef = useRef<() => void>(null);
  
    const clearFile = () => {
      setFile(null);
      resetRef.current?.();
    };
    const form = useForm({
        mode: 'uncontrolled',
        validateInputOnChange: [
          'email',
          'name',
          // use FORM_INDEX to reference fields indices
          `jobs.${FORM_INDEX}.title`,
        ],
        initialValues: { name: '', email: '', age: 0, jobs: [{ title: '' }, { title: '' }] },
    
        // functions will be used to validate values at corresponding key
        validate: {
          name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
        //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });


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
        content,
      });
  return (
    <>
    <Container size='md' style={{marginTop:'-5%', marginBottom:'15%'}}>
    <Paper style={{padding:'2%'}} shadow='md'>
    <Text style={{margin:'-7% 0% 5% 0%', textAlign:'center'}} fw={500} size='xl'>Create Ticket</Text>
    <form onSubmit={form.onSubmit(console.log)}>
    
    <TextInput
        label="UserID"
        placeholder="User Id"
        value='2233334'
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
    <br />
      <TextInput
        label="Subject"
        placeholder="Enter Subject"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <br />
      <MultiSelect
        label="Module"
        required
        placeholder="Pick value"
        data={['GeneralQuestion', 'COA', 'Budget', 'Planning', 'Debtor', 'Vendor', 'Procurement']}
      />

      <br />
      <Text>Details</Text>
      <br />
        <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={200}>
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
            {/* <Group>

            </Group> */}
            </Group>  
        </RichTextEditor.Toolbar>
        <div style={{border:'1px solid lightblue', padding:'2%'}}> 
        <RichTextEditor.Content />
        </div>
        </RichTextEditor>
        <br />
        <br />
        <Text>Attachments</Text><br />
        <Group justify="left">
        <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
        <Button disabled={!file} color="red" onClick={clearFile}>
          Reset
        </Button>
      </Group>

      {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
    <br />
    <br />
    <Group justify='center'>
      <Button type="submit" mt="lg" style={{textAlign:'right'}} size='lg' variant='outline'>
        Submit Ticket
      </Button>
    </Group>
      
    </form>
    </Paper>
    </Container>
    </>
  );
}