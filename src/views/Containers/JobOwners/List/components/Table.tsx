import React, { FC, useState } from 'react';
import { data } from '@/data/owners-list';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { Button } from '@/components/core/Button';
import { TbEdit, TbSearch, TbTrash } from 'react-icons/tb';
import PaginationComponent from '@/components/integrated/Pagination';
import useSWR from 'swr';

const ITEMS_PER_PAGE = 5;

type OwnerData = {
  id: number;
  date: string;
  owner: string;
  category: string;
  vessel: string;
  status: string;
};

const TableSection: FC = () => {
  // const { data, error, isLoading } = useSWR('/api/jobs/', fetcher)

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
  };

  const filteredData = data.filter(
    (item: OwnerData) =>
      item.owner.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || item.category === selectedCategory)
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length);

  return (
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Category A">Category A</option>
                <option value="Category B">Category B</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table className="mt-5">
              <thead>
                <tr>
                  {[
                    'id',
                    'Date',
                    'Owner',
                    'Category',
                    'Vessel',
                    'Status',
                    '',
                  ].map((heading, index) => (
                    <th
                      key={index}
                      className="bg-primary text-white text-center align-middle"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData
                  .slice(startIndex, endIndex)
                  .map((item: OwnerData) => (
                    <tr key={item.id}>
                      {[
                        item.id,
                        item.date,
                        item.owner,
                        item.category,
                        item.vessel,
                        item.status,
                      ].map((cell, index) => (
                        <td key={index} className="text-center align-middle">
                          {cell}
                        </td>
                      ))}
                      <td className="text-center align-middle px-0 mx-0">
                        <Button>
                          <TbEdit size={20} />
                        </Button>
                        <Button>
                          <TbTrash className="text-danger" size={20} />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>

      <Row>
        <Col className="d-flex justify-content-start mt-1">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageClick={handlePageClick}
          />
        </Col>
        <Col className="text-end text-primary">
          Showing {startIndex + 1} - {endIndex} of {filteredData.length} items
        </Col>
      </Row>
    </Container>
  );
};

export default TableSection;
