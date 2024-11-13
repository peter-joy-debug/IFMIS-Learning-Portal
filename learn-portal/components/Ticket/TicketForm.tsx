import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code, Text, Container, Paper, rem, MultiSelect, FileInput, FileInputProps, Pill } from '@mantine/core';
import { useForm } from '@mantine/form';
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
  '<h2 style="text-align: center;">Add your content here</h2><p><code>RichTextEditor</code> component users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

export function TicketForm() {
  const icon = <IconFile style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
  const [active, setActive] = useState(0);
  const openRef = useRef<() => void>(null);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      website: '',
      github: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          username:
            values.username.trim().length < 6
              ? 'This field must include at least 6 characters'
              : null,
        //   password:
        //     values.password.length < 6 ? 'Password must include at least 6 characters' : null,
        };
      }

      if (active === 1) {
        return {
        //   name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
        //   email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));






  //Rich Text Editor Content

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

  const ValueComponent: FileInputProps['valueComponent'] = ({ value }) => {
    if (value === null) {
      return null;
    }
  
    if (Array.isArray(value)) {
      return (
        <Pill.Group>
          {value.map((file, index) => (
            <Pill key={index}>{file.name}</Pill>
          ))}
        </Pill.Group>
      );
    }
  
    return <Pill>{value.name}</Pill>;
  };
  
  return (
    <>
    <Container size='md' style={{marginTop:'-5%', marginBottom:'15%'}}>
    <Text style={{textAlign:'center',borderTop:'1.7px solid lightblue', padding:'2%', borderTopLeftRadius:'100px', borderTopRightRadius:'100px', marginBottom:'5%', marginTop:'-10%'}} size="lg" fw={400}>Create Ticket</Text>
      <Stepper active={active} >
        <Stepper.Step label="First step" description="Requester Information">
        <Text style={{margin:'1% 0%'}}>Requester Name</Text>
          <TextInput
            // label="Username"
            placeholder="Type fullname"
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
        <Text style={{margin:'1% 0%'}}>Email</Text>
            <TextInput
            // label="Your email"
            placeholder="Your email"
            withAsterisk
            mt="md"
            key={form.key('email')}
            {...form.getInputProps('email')}
        />
        {/* <Text style={{margin:'1% 0%'}}>Mobile</Text>
          <TextInput
            // label="Username"
            placeholder="Type mobile number: +268 --- -----"
            key={form.key('username')}
            {...form.getInputProps('username')}
          /> */}
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Ticket Details">
        <Text style={{marginBottom:'1%'}}>Subject</Text>
          <TextInput
            // label="Subject"
            placeholder="Enter the subject"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <br />
          <Text style={{marginBottom:'1%'}}>Add Details</Text>
            <RichTextEditor editor={editor} >
            <RichTextEditor.Toolbar sticky stickyOffset={100}>
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

                <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

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
            <Paper style={{border:'1px solid rgba(0,0,0,0.2)', padding:'2% 1%', height:''}}>
            <RichTextEditor.Content />
            </Paper>

            </RichTextEditor>
            <Text style={{margin:'1% 0%'}}>Attachments</Text>
            <Paper>
            <Group>
            <FileInput
                leftSection={icon}
                placeholder="Attach file (Accepted format: JPEG, PNG, DOCX, XLS, PDF, PPTX)"
                leftSectionPointerEvents="none"
            />
            <Button variant='subtle'>Upload</Button>
            </Group> <br />

            </Paper>
 
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Review and Submission">
            <MultiSelect
            label="Ministry"
            placeholder="Select concerned Ministry..."
            data={['React', 'Angular', 'Vue', 'Svelte']}
            // defaultValue={['React']}
            clearable
            searchable
            />
            <br />
            <MultiSelect
            label="Module"
            placeholder="Select module(s)..."
            data={['React', 'Angular', 'Vue', 'Svelte']}
            // defaultValue={['React']}
            clearable
            searchable
            />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.getValues(), null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        {active !== 0 && (
            <>
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>

          </>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
        {active === 3 && <Button variant="filled" onClick={prevStep} color='teal'>Submit Ticket</Button>}
      </Group>
      </Container>
    </>
  );
}