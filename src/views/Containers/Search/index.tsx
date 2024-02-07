'use client';

import React, { FC, useEffect, useRef } from 'react';
import { useSession } from '@/hooks/session';
import { Spinner } from 'react-bootstrap';
import ContainerSearchAdmin from './Layout/admin';
import ContainerSearchTrades from './Layout/trades';
import ContainerSearchContractor from './Layout/contractor';
import { JobsMaster, ProfilesMaster } from '@/lib/global.types';

const ContainerSearch: FC = () => {
  const role = useSession();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  });

  const handleTradesMounted = () => {
    mounted.current = true;
  };
  const handleContractorMounted = () => {
    mounted.current = true;
  };
  return (
    <>
      {!mounted.current && (
        <main className="vh-100 py-5 bg-body-light">
          <section className="container py-5 my-5 max-w-xl mx-auto">
            <Spinner animation="border" variant="primary" />
          </section>
        </main>
      )}
      {mounted.current &&
        (role?.user?.user_metadata.roles === 'admin' ||
          role?.user?.user_metadata.roles === 'dev' ||
          role?.user?.user_metadata.roles === 'owner') && (
          <ContainerSearchAdmin />
        )}
      {mounted.current &&
        role?.user?.user_metadata.roles === 'tradesperson' && (
          <ContainerSearchTrades onMounted={()=>{}} />
        )}
      {mounted.current && role?.user?.user_metadata.roles === 'contractor' && (
        <ContainerSearchContractor onMounted={()=>{}} />
      )}
    </>
  );
};

export default ContainerSearch;
