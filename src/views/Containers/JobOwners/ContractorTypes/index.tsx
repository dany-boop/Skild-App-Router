import React from 'react';

import { headerNavLinks } from '@/data/headerNavLinks';
import { useParams } from 'react-router-dom';
import TableSection from './components/Table';

const ContainerContractor = () => {
  const { pathname } = useParams<{ pathname: string }>();

  const pageTitle =
    headerNavLinks.find((link) => link.path === pathname)?.title ||
    'Page Not Found';

  const secondTitle =
    headerNavLinks.find((link) => link.path === pathname)?.title ||
    'Page Not Found';
  return (
    <>
      <section className="vh-100 py-5 bg-secondary">
        <div className="container max-w-7xl mx-auto ">
          <h3>{pageTitle + '>>' + secondTitle} </h3>

          <TableSection />
        </div>
      </section>
    </>
  );
};

export default ContainerContractor;
