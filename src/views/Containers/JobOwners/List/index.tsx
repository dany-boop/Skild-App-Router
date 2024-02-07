'use client';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { headerNavLinks } from '@/data/headerNavLinks';
import TableSection from './components/Table';
import useSWR from 'swr';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { TbMessageForward, TbSearch } from 'react-icons/tb';
import { Button } from '@/components/core/Button';
import { ProfilesMaster } from '@/lib/global.types';

const ITEMS_PER_PAGE = 5;

const ContainerJobList: FC = () => {
  const { pathname } = useParams<{ pathname: string }>();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRoles, setSelectedRoles] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
  };

  const fetcher = async (data: string) => {
    const response = await fetch(data);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const { data, error, isLoading } = useSWR('/api/v1/profiles', fetcher);

  const filteredData = data?.filter(
    (item: ProfilesMaster) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedRoles || item.roles?.name === selectedRoles)
  );

  const totalPages = Math.ceil(filteredData?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData?.length);

  const pageTitle =
    headerNavLinks.find((link) => link.path === pathname)?.title ||
    'Page Not Found';

  return (
    <>
      <section className="vh-100  bg-secondary">
        <div className="container my-5 py-5 max-w-7xl mx-auto ">
          <h3>{pageTitle}</h3>

          <Container>
            <div className="bg-white my-3 py-4 px-5 rounded-3 min-vh-50">
              <Row className="mt-4">
                <Col md={4}>
                  <Form.Group>
                    <TbSearch
                      style={{
                        marginLeft: '0.5rem',
                        marginTop: '0.5rem',
                        position: 'absolute',
                      }}
                      color="#1E1E1E"
                      size="1.25rem"
                    />
                    <Form.Control
                      className="py-2 px-5 border-2 border-primary text-black"
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Select
                      className="py-2 border-2 border-primary"
                      value={selectedRoles}
                      onChange={(e) => setSelectedRoles(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      <option value="Roles A">Roles A</option>
                      <option value="Roles B">Roles B</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              {filteredData?.map((profile: ProfilesMaster) => (
                <Card
                  key={profile.id}
                  style={{ width: '30rem' }}
                  className="relative overflow-hidden mb-sm-5 mb-lg-0"
                >
                  <Card.Img
                    variant="top"
                    src="assets/images/Rectangle 191.png"
                  />
                  <Card.Body>
                    <Card.Title>
                      {profile.name && profile.name?.length > 30
                        ? profile.name.substring(0, 30) + '...'
                        : profile.name || 'Name Not Available'}
                    </Card.Title>
                    <Card.Text className="text-primary">
                      {
                        <Card.Text className="text-primary">
                          {(profile?.roles && profile.roles.name) ??
                            'Roles Not Available'}
                        </Card.Text>
                      }
                    </Card.Text>
                    <Button variant="primary" className="text-white end-0">
                      <TbMessageForward size={20} className="mx-2" />
                      Apply
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Container>
        </div>
      </section>
    </>
  );
};

export default ContainerJobList;
