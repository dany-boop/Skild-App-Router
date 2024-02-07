'use client';
import React, { FC, useEffect, useState } from 'react';
import SearchComponent from '@/components/modular/search/forms';
import ProjectCard from '@/components/integrated/RecCard';
import { JobsMaster } from '@/lib/global.types';
import useSWR from 'swr';
import { useFetcher } from '@/hooks/fetching/useFetcher';
import { TbThumbUpFilled, TbMessageForward } from 'react-icons/tb';
import { Button, Card } from 'react-bootstrap';
import { Link } from '@/hooks/navigation';

type ContainerSearchTradesProps = {
  onMounted: () => void;
};

const ContainerSearchTrades: FC<ContainerSearchTradesProps> = ({
  onMounted,
  ...rest
}) => {
  const {
    data: jobsData,
    error: jobsError,
    isLoading: jobsLoading,
  } = useSWR('/api/v1/jobs', useFetcher);

  const [filteredJobs, setFilteredData] = useState<JobsMaster[]>([]);

  const handleSearch = (query: string) => {
    const filteredJobs = jobsData?.data?.filter((jobs: JobsMaster) => {
      // console.log(jobs.name);
      return jobs.name?.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredData(filteredJobs || []);
  };
  // useEffect(() => onMounted());

  return (
    <main className="py-5 my-5 ps-5 ">
      <section className="py-5   bg-body-light me-lg-0 me-sm-4 ">
        <SearchComponent onSubmit={handleSearch} roles="tradesperson" />

        <div className="py-2 px-5 mt-3 rounded-3 bg-white">
          <div className="row row-cols-1 row-cols-md-3 gap-4 my-4">
            {jobsLoading ? (
              <>
                {[1, 2, 3, 4].map((skeletonIndex) => (
                  <Card
                    key={skeletonIndex}
                    style={{ width: '20rem' }}
                    className="relative overflow-hidden mb-sm-5 mb-lg-0 placeholder-glow"
                  >
                    <Card.Img
                      variant="top"
                      className="object-cover bg-gray"
                      // src="holder.js/100px180"
                    />
                    <div aria-hidden="true" className="mt-3">
                      <Card.Body>
                        <Card.Title className="text-center mb-0 card-title placeholder w-100 py-4 bg-light " />
                        <Card.Text className="text-primary font-light text-center w-100 py-2  mt-4  card-title bg-primary placeholder " />

                        <Button
                          variant="primary"
                          className=" d-flex mt-3 px-3 py-2 mb-3 shadow-sm disabled placeholder"
                        ></Button>
                      </Card.Body>
                    </div>
                  </Card>
                ))}
              </>
            ) : (
              filteredJobs.map((jobs: JobsMaster) => (
                <Card
                  key={jobs.id}
                  style={{ width: '20rem' }}
                  className="relative overflow-hidden mb-sm-5 mb-lg-0 px-0"
                >
                  <Card.Img
                    variant="top"
                    className="object-cover"
                    src="/assets/images/Rectangle 191.png"
                  />

                  <Card.Body>
                    <Card.Title>{jobs.name}</Card.Title>
                    <Card.Text className="text-primary">
                      {jobs && jobs.address && jobs?.address?.length > 20
                        ? jobs.address?.substring(0, 20) + '...'
                        : jobs.address || 'Not Available'}
                    </Card.Text>
                    <Link href={`/projects${jobs.id}`}>
                      <Button variant="primary" className="text-white end-0">
                        <TbMessageForward size={20} className="mx-2" />
                        Apply
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContainerSearchTrades;
