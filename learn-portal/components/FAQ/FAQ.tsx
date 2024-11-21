

import { useState, useEffect } from 'react';
import FAQs from '../../public/FAQ.jpg'
import Image from 'next/image';
import {
  // Image,
  Accordion,
  Grid,
  Container,
  Title,
  Text,
  Pagination,
  Paper,
  Group,
  ActionIcon,
  rem,
  Tooltip,
} from '@mantine/core';
import { IconThumbUp, IconThumbDown, IconMessage } from '@tabler/icons-react';
import { useApi } from '../../hooks/useApi';
import classes from './FAQ.module.css';

export function FAQ() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [currentPageFaqs, setCurrentPageFaqs] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi<{ faqs: any[] }>();

  const faqsPerPage = 7; // FAQs per page

  // Function to fetch all FAQs
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

  // Function to paginate FAQs
  const paginateFAQs = (page: number, allFaqs = faqs) => {
    const startIndex = (page - 1) * faqsPerPage;
    const endIndex = startIndex + faqsPerPage;
    setCurrentPageFaqs(allFaqs.slice(startIndex, endIndex)); // Slice FAQs for the current page
  };

  // Polling mechanism to update FAQs
  useEffect(() => {
    fetchFAQs(); // Fetch FAQs initially

    const intervalId = setInterval(() => {
      fetchFAQs(); // Fetch FAQs every 10 seconds
    }, 10000);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [currentPage]);

  useEffect(() => {
    paginateFAQs(currentPage); // Update page content when current page changes
  }, [currentPage, faqs]);

  return (
    <div className={classes.wrapper} style={{ marginTop: '-10%', marginBottom: '15%' }}>
      <Container size="lg">
        <Text>FAQs Section</Text>
        <br />
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Image
              style={{ borderTopLeftRadius: '100px', borderBottomRightRadius: '100px',height:'500px', width:'100%' }}
              src={FAQs}
              alt="Frequently Asked Questions"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper style={{ padding: '5%' }} shadow="lg">
              <Title order={2} ta="left" className={classes.title}>
                Frequently Asked Questions
              </Title>

              {error && <Text color="red">{error}</Text>}

              <Accordion chevronPosition="right" variant="separated">
                {currentPageFaqs.map((faq) => (
                  <Accordion.Item key={faq.id} className={classes.item} value={faq.id}>
                    <Accordion.Control>{faq.question}</Accordion.Control>
                    <Accordion.Panel>
                      {faq.answer}
                      <Group gap={10} style={{ marginTop: '2%' }}>
                        {/* <Tooltip label="Like" withArrow arrowOffset={26} arrowSize={8}>
                          <ActionIcon variant="subtle" color="gray">
                            <IconThumbUp
                              style={{ width: rem(30), height: rem(30) }}
                              color="grey"
                              stroke={1.5}
                            />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Dislike" withArrow arrowOffset={26} arrowSize={8}>
                          <ActionIcon variant="subtle" color="gray">
                            <IconThumbDown
                              style={{ width: rem(30), height: rem(30) }}
                              color="grey"
                              stroke={1.5}
                            />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Add Comment" withArrow arrowOffset={26} arrowSize={8}>
                          <ActionIcon variant="subtle" color="gray">
                            <IconMessage
                              style={{ width: rem(30), height: rem(30) }}
                              color="grey"
                              stroke={1.5}
                            />
                          </ActionIcon>
                        </Tooltip> */}
                      </Group>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>

              <br />
              <Pagination.Root total={totalPages} value={currentPage} onChange={setCurrentPage}>
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
