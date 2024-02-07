'use client';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { headerNavLinks } from '@/data/headerNavLinks';
import useSWR from 'swr';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import {
  TbMessageDots,
  TbMessageForward,
  TbSearch,
  TbUserCircle,
} from 'react-icons/tb';
import { ProfilesMaster, TradesSkillsMaster } from '@/lib/global.types';
import { useFetcher } from '@/hooks/fetching/useFetcher';

const ITEMS_PER_PAGE = 10;

const ContainerTradesList: FC = () => {
  const { pathname } = useParams<{ pathname: string }>();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRoles, setSelectedRoles] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
  };

  const {
    data: tradesData,
    error: tradesError,
    isLoading: tradesLoading,
  } = useSWR('/api/v1/trades/profiles', useFetcher);

  const {
    data: skillsData,
    error: skillsError,
    isLoading: skillsLoading,
  } = useSWR('/api/v1/trades/tradeskills', useFetcher);

  const filteredData = tradesData?.data?.filter((item: TradesSkillsMaster) => {
    console.log(item.name);
    return (
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.roles.name === selectedRoles
    );
    // (!selectedRoles || item.roles.name === selectedRoles);
  });

  const roles = Array.from(
    new Set(tradesData?.data?.map((item: ProfilesMaster) => item.roles.name))
  );

  // const totalPages = Math.ceil(filteredData?.length / ITEMS_PER_PAGE);
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData?.length);

  const pageTitle =
    headerNavLinks.find((link) => link.path === pathname)?.title ||
    'Page Not Found';

  console.log('filteredData:', filteredData);
  return (
    <>
      <section className=" mt-5 py-5 ps-5 pe-4 bg-light">
        <div className="container-fluid py-5">
          <h3>{pageTitle}</h3>

          <div className="bg-white my-3 py-4 px-5 rounded-3 min-vh-50 shadow">
            <Row className="mt-4">
              <Col md={4}>
                <Form.Group className="">
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
                    {/* {roles.map((role, i) => (
                      <option key={i} value={role}>
                        {role}
                      </option>
                    ))} */}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div className="row row-cols-1 row-cols-md-3 gap-3 my-4">
              {tradesLoading ? (
                <>
                  {[1, 2, 3, 4].map((skeletonIndex) => (
                    <Card
                      key={skeletonIndex}
                      style={{ width: '20rem' }}
                      className="relative overflow-hidden mb-sm-5 mb-lg-0 border border-3 border-primary shadow shadow-primary px-3 placeholder-glow"
                    >
                      <div className="mx-auto mt-4 bg-primary rounded-circle profile-lg d-flex justify-content-center align-items-center">
                        {/* You can replace this with your custom skeleton content */}
                      </div>
                      <div aria-hidden="true" className="mt-3">
                        <div className="text-center mb-0 card-title placeholder w-100 py-4 bg-light "></div>
                        <div className="text-primary font-light text-center w-100 py-2  mt-4  card-title bg-primary placeholder "></div>
                        <div className="d-flex text-center my-4 w-50 justify-content-center px-2 py-3 bg-info placeholder">
                          {/* Add more skeleton placeholders here */}
                        </div>

                        <div className="d-flex gap-3">
                          <Button
                            variant="primary"
                            className="text-white d-flex mt-3 mb-3 shadow-sm disabled placeholder"
                          ></Button>
                          <Button
                            variant="secondary"
                            className="text-white d-flex mt-3 mb-3 shadow-sm disabled placeholder"
                          ></Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </>
              ) : (
                filteredData?.map((profile: ProfilesMaster) => (
                  <Card
                    key={profile.id}
                    style={{ width: '20rem' }}
                    className="relative overflow-hidden mb-sm-5 mb-lg-0 border border-3 border-primary shadow shadow-primary px-3"
                  >
                    <div className="mx-auto mt-4 bg-primary rounded-circle profile-lg d-flex justify-content-center align-items-center">
                      {profile.avatar ? (
                        <Card.Img
                          className="profile rounded-circle"
                          src={profile.avatar}
                        />
                      ) : (
                        <div className="text-white">
                          <TbUserCircle size={90} />
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <h2 className="text-center mb-0">
                        {profile.name || 'Name Not Available'}
                      </h2>
                      <h5 className="text-primary font-light text-center mt-0">
                        {profile.roles?.name || 'Member'}
                      </h5>
                      <div className="d-flex justify-content-center my-4">
                        {skillsData?.data?.map(
                          (skillsData: TradesSkillsMaster) => (
                            <span
                              key={skillsData?.id}
                              className="text-primary bg-info rounded-4 px-2 py-1 me-2"
                            >
                              {skillsData.skills.name}
                            </span>
                          )
                        )}
                      </div>

                      <div className="d-flex gap-3">
                        <Button
                          variant="primary"
                          className="text-white d-flex mt-3 mb-3 shadow-sm"
                        >
                          <TbUserCircle size={35} className="mx-2" />
                          <p className="ms-2 mt-2 mb-1">Profile</p>
                        </Button>
                        <Button
                          variant="secondary"
                          className="text-white d-flex mt-3 mb-3 shadow-sm"
                        >
                          <TbMessageDots size={35} className="mx-2" />
                          <p className="ms-2 mt-2 mb-1">Chat</p>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContainerTradesList;
