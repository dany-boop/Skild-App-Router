'use client';

import React, { useEffect, useRef } from 'react';
import ContainerDashboardAdmin from './layout/admin';
import ContainerDashboardTrades from './layout/trades';
import ContainerDashboardContractor from './layout/contractor';
import { useSession } from '@/hooks/session';
import { Spinner } from 'react-bootstrap';

const ContainerDashboard = () => {
	const role = useSession();
	const mounted = useRef(false);

	useEffect(() => {
		mounted.current = true;
	});

	return (
		<>
			{!mounted.current && (
				<main className="vh-100 py-5 bg-body-light">
					<section className="container py-5 my-5 max-w-xl mx-auto">
						<Spinner animation="border" variant="primary" />
					</section>
				</main>
			)}
			{mounted.current && (role?.user?.user_metadata.roles === 'admin' || role?.user?.user_metadata.roles === 'dev' || role?.user?.user_metadata.roles === 'owner') && (
				<ContainerDashboardAdmin />
			)}
			{mounted.current && role?.user?.user_metadata.roles === 'tradesperson' && <ContainerDashboardTrades />}
			{mounted.current && role?.user?.user_metadata.roles === 'contractor' && <ContainerDashboardContractor />}
		</>
	);
};

export default ContainerDashboard;
