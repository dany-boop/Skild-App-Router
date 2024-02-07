import { useFetcher } from '@/hooks/fetching/useFetcher';
import { JobsMaster } from '@/lib/global.types';
import React, { FC } from 'react';
import { Card, Button } from 'react-bootstrap';
import { TbThumbUpFilled, TbMessageForward } from 'react-icons/tb';
import useSWR from 'swr';

const ProjectCard: FC = () => {
	const { data: jobsData, error: jobsError, isLoading: jobsLoading } = useSWR('/api/v1/jobs', useFetcher);

	const filteredData = jobsData?.data?.filter((jobs: JobsMaster) => {
		console.log(jobs.name);
		return jobs?.name?.toLowerCase();
	});
	return (
		<div className="row row-cols-1 row-cols-md-3 gap-4 my-4">
			{jobsLoading ? (
				<>
					{[1, 2, 3, 4].map((skeletonIndex) => (
						<Card key={skeletonIndex} style={{ width: '20rem' }} className="relative overflow-hidden mb-sm-5 mb-lg-0 placeholder-glow">
							<Card.Img
								variant="top"
								className="object-cover bg-gray"
								// src="holder.js/100px180"
							/>
							<div aria-hidden="true" className="mt-3">
								<Card.Body>
									<Card.Title className="text-center mb-0 card-title placeholder w-100 py-4 bg-light " />
									<Card.Text className="text-primary font-light text-center w-100 py-2  mt-4  card-title bg-primary placeholder " />

									<Button variant="primary" className=" d-flex mt-3 px-3 py-2 mb-3 shadow-sm disabled placeholder"></Button>
								</Card.Body>
							</div>
						</Card>
					))}
				</>
			) : (
				filteredData.slice(0, 4).map((jobs: JobsMaster) => (
					<Card key={jobs.id} style={{ width: '20rem' }} className="relative overflow-hidden mb-sm-5 mb-lg-0 px-0">
						<div className="position-relative">
							<Card.Img variant="top" className="object-cover" src="/assets/images/Rectangle 191.png" />
							<div
								className="position-relative"
								style={{ width: '12rem', height: '2.5rem' }}
								// style={{ marginLeft: '8rem', marginTop: '0rem' }}
							>
								<div
									className="transform position-absolute rounded-start px-3 py-1 mt-0 ms-5"
									style={{
										width: '12rem',
										transform: 'rotate(45deg)',
										backgroundColor: '#FF9800',
									}}
								>
									<div
										className="text-white ms-5 ps-5 mb-2"
										style={{
											transform: 'rotate(-45deg)',
										}}
									>
										<TbThumbUpFilled size={21} />
									</div>
								</div>
							</div>
						</div>
						<Card.Body>
							<Card.Title>{jobs.name}</Card.Title>
							<Card.Text className="text-primary">
								{jobs && jobs.address && jobs?.address?.length > 20 ? jobs.address?.substring(0, 20) + '...' : jobs.address || 'Not Available'}
							</Card.Text>
							<Button variant="primary" className="text-white end-0">
								<TbMessageForward size={20} className="mx-2" />
								Applyy
							</Button>
						</Card.Body>
					</Card>
				))
			)}
		</div>
	);
};

export default ProjectCard;
