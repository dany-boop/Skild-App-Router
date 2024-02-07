'use client';

import React, { useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import { Button } from '@/components/core/Button';
import { TbX, TbUser } from 'react-icons/tb';
import ThemeToggler from '@/components/integrated/ThemeToggler';
import useSWR from 'swr';
// import Link from '@/hooks/navigation/link';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/v1/jobs', fetcher);

  return (
    <>
      <button className="btn mx-2 my-2">Testing</button>
      <Button variant="warning" disabled>
        Testing
      </Button>
      <Button
        leftIcon={<TbUser size={20} />}
        variant="danger"
        className="mx-4 px-4"
      >
        Test
      </Button>
      <ThemeToggler />
      <h1>Testing</h1>
      <h2>Testing</h2>
      <h3>Testing</h3>
      <h4>Testing</h4>
      <h5>Testing</h5>
      <h6>Testing</h6>
      <p>Testing</p>{' '}
      {data ? <>{data.message}</> : isLoading ? <>loading...</> : <>Error</>}
    </>
  );
}
