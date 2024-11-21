import { useState, useEffect } from 'react';
import {
  Accordion,
  Grid,
  Container,
  Title,
  Text,
  Pagination,
  Paper,
  Group,
  ActionIcon,
  Button,
  TextInput,
  Textarea,
} from '@mantine/core';
import { IconPlus, IconEdit, IconTrash, IconCheck, IconX } from '@tabler/icons-react';
import { useApi } from '../../hooks/useApi';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import classes from './FAQ.module.css';

export function FAQConfig() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [currentPageFaqs, setCurrentPageFaqs] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi<{ faqs: any[] }>();

  const faqsPerPage = 4; // FAQs per page

  // Fetch FAQs
  const fetchFAQs = async () => {
    setError(null);
    try {
      const response = await fetchData({ method: 'GET', url: '/faqs' });
      const allFaqs = response.data.faqs;
      setFaqs(allFaqs); // Store all FAQs
      setTotalPages(Math.ceil(allFaqs.length / faqsPerPage)); // Calculate total pages
      paginateFAQs(currentPage, allFaqs); // Paginate for the current page
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load FAQs');
    }
  };

  // Paginate FAQs
  const paginateFAQs = (page: number, allFaqs = faqs) => {
    const startIndex = (page - 1) * faqsPerPage;
    const endIndex = startIndex + faqsPerPage;
    setCurrentPageFaqs(allFaqs.slice(startIndex, endIndex)); // Slice FAQs for the current page
  };

  useEffect(() => {
    fetchFAQs(); // Initial fetch
  }, []);

  useEffect(() => {
    paginateFAQs(currentPage); // Update page content when current page changes
  }, [currentPage, faqs]);

  // Add FAQ
  const handleAddFAQ = () => {
    modals.open({
      title: 'Add new FAQ',
      children: (
        <>
          <TextInput label="Question" placeholder="Enter Question" data-autofocus id="faq-question" />
          <Textarea label="Answer" placeholder="Enter Answer" id="faq-answer" mt="sm" />
          <Button
            fullWidth
            mt="md"
            onClick={async () => {
              const question = (document.getElementById('faq-question') as HTMLInputElement).value;
              const answer = (document.getElementById('faq-answer') as HTMLTextAreaElement).value;

              try {
                await fetchData({ method: 'POST', url: '/faqs/create', data: { question, answer } });
                notifications.show({
                  title: 'Success',
                  message: 'FAQ added successfully!',
                  color: 'green',
                  icon: <IconCheck />,
                });
                fetchFAQs(); // Refresh FAQs
                modals.closeAll();
              } catch (error) {
                notifications.show({
                  title: 'Error',
                  message: 'Failed to add FAQ. Please try again.',
                  color: 'red',
                  icon: <IconX />,
                });
              }
            }}
          >
            Submit FAQ
          </Button>
        </>
      ),
    });
  };

  // Update FAQ
  const handleUpdateFAQ = (faq: any) => {
    modals.open({
      title: 'Update FAQ',
      children: (
        <>
          <TextInput
            label="Question"
            defaultValue={faq.question}
            id={`faq-question-${faq.id}`}
            data-autofocus
          />
          <Textarea
            label="Answer"
            defaultValue={faq.answer}
            id={`faq-answer-${faq.id}`}
            mt="sm"
          />
          <Button
            fullWidth
            mt="md"
            onClick={async () => {
              const question = (
                document.getElementById(`faq-question-${faq.id}`) as HTMLInputElement
              ).value;
              const answer = (
                document.getElementById(`faq-answer-${faq.id}`) as HTMLTextAreaElement
              ).value;

              try {
                await fetchData({
                  method: 'PUT',
                  url: `/faqs/update`,
                  data: { id: faq.id, question, answer },
                });
                notifications.show({
                  title: 'Success',
                  message: 'FAQ updated successfully!',
                  color: 'green',
                  icon: <IconCheck />,
                });
                fetchFAQs(); // Refresh FAQs
                modals.closeAll();
              } catch (error) {
                notifications.show({
                  title: 'Error',
                  message: 'Failed to update FAQ. Please try again.',
                  color: 'red',
                  icon: <IconX />,
                });
              }
            }}
          >
            Submit Changes
          </Button>
        </>
      ),
    });
  };

  // Delete FAQ
  const handleDeleteFAQ = (id: string) => {
    modals.openConfirmModal({
      title: 'Confirm Deletion',
      centered: true,
      children: <Text size="sm">Are you sure you want to delete this FAQ? This action cannot be undone.</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await fetchData({ method: 'DELETE', url: `/faqs/delete`, data: { id } });
          notifications.show({
            title: 'Success',
            message: 'FAQ deleted successfully!',
            color: 'green',
            icon: <IconCheck />,
          });
          fetchFAQs(); // Refresh FAQs
        } catch (error) {
          notifications.show({
            title: 'Error',
            message: 'Failed to delete FAQ. Please try again.',
            color: 'red',
            icon: <IconX />,
          });
        }
      },
    });
  };

  return (
    <div className={classes.wrapper} style={{ marginTop: '-2%', marginBottom: '15%' }}>
      <Container size="lg">
        <Button leftSection={<IconPlus size={20} />} onClick={handleAddFAQ}>
          Add FAQ
        </Button>
        <Grid gutter={50} mt="sm">
          <Grid.Col span={12}>
            <Paper style={{ padding: '3%' }} shadow="lg">
              <Title order={2} ta="left" className={classes.title}>
                Frequently Asked Questions
              </Title>
              {error && <Text color="red">{error}</Text>}
              <Accordion chevronPosition="right" variant="separated">
                {currentPageFaqs.map((faq) => (
                  <Accordion.Item key={faq.id} className={classes.item} value={faq.id}>
                    <Accordion.Control>
                      {/* <Group justify="flex-start"> */}
                        <Text>{faq.question}</Text>
                        <Group justify='flex-end' style={{paddingRight:'5%'}}>
                          <ActionIcon
                            onClick={() => handleUpdateFAQ(faq)}
                            color="blue"
                            size="sm"
                            title="Edit FAQ"
                          >
                            <IconEdit />
                          </ActionIcon>
                          <ActionIcon
                            onClick={() => handleDeleteFAQ(faq.id)}
                            color="red"
                            size="sm"
                            title="Delete FAQ"
                          >
                            <IconTrash />
                          </ActionIcon>
                        </Group>
                      {/* </Group> */}
                    </Accordion.Control>
                    <Accordion.Panel>{faq.answer}</Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
              <Pagination.Root
                total={totalPages}
                value={currentPage}
                onChange={setCurrentPage}
                mt="md"
              >
                <Group gap={5} justify="center">
                  <Pagination.First />
                  <Pagination.Previous />
                  <Pagination.Items />
                  <Pagination.Next />
                  <Pagination.Last />
                </Group>
              </Pagination.Root>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
