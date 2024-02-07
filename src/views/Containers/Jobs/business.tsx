'use client';
import React, { FC } from 'react';
import ProfileCard from '@/components/integrated/TradesCard';
import JobsAddForm from '@/components/modular/jobs/forms/add';
import { useFetcher } from '@/hooks/fetching/useFetcher';
import ProjectCard from '@/components/integrated/RecCard';
import useSWR from 'swr';
import { Col, Row } from 'react-bootstrap';

const ContainerCreateJobs: FC = () => {
  return (
    <main className="py-5 ps-5 pe-4 bg-light">
      <section className="container-fluid py-5 my-5 ps-5 pe-4">
        <div className="bg-white rounded-4 shadow-sm p-3 pt-4 ">
          <JobsAddForm />
        </div>

        <div className="my-5">
          <h3>New Job Post</h3>
          <div>
            <ProjectCard />
          </div>
        </div>
        <div>
          <h3>Review Tradespersons</h3>
          <div>
            <ProfileCard />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContainerCreateJobs;
