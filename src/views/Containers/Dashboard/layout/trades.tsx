'use client';
import React, { FC, useState } from 'react';
import CardComponents from '@/components/integrated/Card';
import SearchComponent from '@/components/modular/search/forms';

import { TbEdit, TbFileSearch, TbMessageForward, TbSearch, TbThumbUpFilled } from 'react-icons/tb';
import { Link } from '@/hooks/navigation/router-overrides/link';
import { Button } from '@/components/core/Button';
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import ProjectCard from '@/components/integrated/RecCard';
import useSWR from 'swr';
import { useFetcher } from '@/hooks/fetching/useFetcher';
import { JobsMaster } from '@/lib/global.types';
import { useSession } from '@/hooks/session';
import dayjs from 'dayjs';

interface Project {
	id: number;
	user: string;
	date: string;
	projectName: string;
	progress: number;
	weeksLeft: number;
	uv: number;
	pv: number;
	amt: number;
}

const project: Project[] = [
	{
		id: 1,
		user: 'Robert Efendy',
		date: '2023-08-23',
		projectName: 'Project A',
		progress: 50,
		weeksLeft: 3,
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		id: 2,
		user: 'owner1',
		date: '2023-02-15',
		projectName: 'Project B',
		progress: 80,
		weeksLeft: 6,
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		id: 3,
		user: 'owner4',
		date: '2023-02-23',
		projectName: 'Project A',
		progress: 50,
		weeksLeft: 6,
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		id: 4,
		user: 'owner2',
		date: '2023-08-15',
		projectName: 'Project B',
		progress: 80,
		weeksLeft: 0,
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		id: 5,
		user: 'owner4',
		date: '2023-02-23',
		projectName: 'Project A',
		progress: 50,
		weeksLeft: 3,
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		id: 6,
		user: 'owner7',
		date: '2023-04-15',
		projectName: 'Project B',
		progress: 80,
		weeksLeft: 5,
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		id: 7,
		user: 'owner8',
		date: '2023-08-23',
		projectName: 'Project A',
		progress: 50,
		weeksLeft: 3,
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		id: 8,
		user: 'owner9',
		date: '2023-08-15',
		projectName: 'Project B',
		progress: 80,
		weeksLeft: 5,
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
];

const ProjectTable: FC<{ colorClassName: string }> = ({ colorClassName }) => (
	<div className="table-rounded">
		<Table className={`rounded-4 border ${colorClassName}`}>
			<thead>
				<tr>
					{['Task Name', 'Project Name', 'Deadline', 'status'].map((heading) => (
						<th key={heading} className="text-center align-middle border-none " style={{ backgroundColor: 'rgba(0, 123, 255, 0.5)' }}>
							{heading}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{project.slice(0, 4).map((project, index) => (
					<tr key={project.id} className={`${index === 3 ? colorClassName : 'border-secondary'}`}>
						<td className="text-center align-middle">{project.user}</td>
						<td className="text-center align-middle">{project.projectName}</td>
						<td className="text-center align-middle">{project.date}</td>
						<td className="text-center align-middle">{project.date}</td>
					</tr>
				))}
			</tbody>
		</Table>
	</div>
);

const ContainerDashboardTrades: FC<Project> = ({ weeksLeft }) => {
	let cardBackgroundColor = '#0089C4';
	let buttonColor = 'primary';

	if (weeksLeft > 4) {
		cardBackgroundColor = '#0089C4';
		buttonColor = 'primary';
	} else if (weeksLeft > 0) {
		cardBackgroundColor = '#FE9A00';
		buttonColor = 'warning';
	} else {
		cardBackgroundColor = '#862A1A';
		buttonColor = 'danger';
	}

	const backgroundColorWithOpacity = `${cardBackgroundColor}70`;
	const progressVariant = `bg-${cardBackgroundColor}`;

	const { data: ProfileData, error: ProfileError, isLoading: ProfileLoading } = useSWR('/api/v1/trades/profiles', useFetcher);

	const { data: JobsData, error: JobsError, isLoading: JobsLoading } = useSWR('/api/v1/jobs', useFetcher);

	const session = useSession();
	const formattedDate = dayjs(session?.user.created_at).format('YYYY');

	return (
		<>
			{/* Top Section */}
			<section className="py-5 vh-100 bg-body-light justify-content-center my-5">
				<div className="container my-5">
					<div className="row">
						{/* Card Proile */}
						<div className="col-12 col-md-4 col-lg-4">
							<div className=" bg-white rounded-4 shadow-sm p-3 pt-4 min-h-2lg">
								<div className="d-flex justify-content-between">
									<div>
										<h6>Welcome Back,</h6>
										<h3 className="text-primary mt-2">{session ? session?.user.user_metadata.fullname : 'Loading.....'}</h3>
									</div>
									<Button className="mb-2">
										<TbEdit size={25} className="text-end" />
									</Button>
								</div>

								<div className="d-flex">
									<div className=" overflow-hidden">
										<img src="/assets/images/Rectangle 180.png" alt="Profile" className="profile rounded-circle" />
									</div>
									<div className="mt-3 mx-3">
										<h5 className="font-light">Experiences</h5>
										<h4>{project[0].projectName}</h4>
									</div>
								</div>
								<div className="justify-content-start">
									<div className="d-flex justify-content-between mx-2 mt-4">
										<p>Join</p>
										<p className="text-end ">{formattedDate}</p>
									</div>
									<div className="d-flex justify-content-between mx-2 my-2">
										<p>Total Project</p>
										<p className="text-end ">2016</p>
									</div>
									<div className="d-flex justify-content-between mx-2 my-2">
										<p>Review</p>
										<p className="text-end ">5.6</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-8">
							<div className="row">
								<div className="col-12 col-md-12">
									{/* Search */}
									<SearchComponent onSubmit={(query) => {}} roles={'tradesperson'} />
									{/* searchend */}
								</div>
								<div className="col-12 ">
									<div className="py-4 px-3 mb-5 bg-white rounded-4 shadow-sm  ">
										<div className="d-flex justify-content-between align-items-center mb-3">
											<h5 className="fw-med ">Latest Project</h5>
											<Link href="" className="text-end mx-2">
												View All
											</Link>
										</div>
										<div className="row-cols-4 d-lg-flex">
											{JobsLoading ? (
												<>
													{[1, 2, 3, 4].map((skeletonIndex) => (
														<Card
															key={skeletonIndex}
															className=" max-h-2lg min-w-2lg rounded-4 max-w-2lg mx-2 shadow "
															style={{
																borderColor: cardBackgroundColor,
																borderWidth: '2px',
															}}
														>
															<div className="d-flex flex-column justify-content-between h-100">
																<div className="mx-3">
																	<div className="d-flex">
																		<div className="profile-sm rounded-2 bg-secondary placeholder mt-4" />
																		<div className="text-end my-3 ms-5 bg-secondary placeholder-wave placeholder placeholder-sm"></div>
																	</div>
																	<Card.Title className="text-center mb-0 card-title placeholder w-100 py-4 bg-light " />
																	<Card.Text
																		className="text-primary font-light text-center w-100 py-2  mt-4  card-title  placeholder "
																		style={{
																			background: cardBackgroundColor,
																		}}
																	/>
																</div>
															</div>
															<div className="mt-3 rounded-bottom-3 px-3">
																<Button
																	style={{
																		background: cardBackgroundColor,
																		border: 'none',
																	}}
																	className="mb-3 text-white placeholder"
																></Button>
															</div>
														</Card>
													))}
												</>
											) : (
												JobsData?.data?.slice(0, 4).map((project: JobsMaster) => (
													//  <UserCard key={project.id} project={project} />
													<Card
														key={project.id}
														className=" max-h-2lg min-w-2lg rounded-4 max-w-2lg me-2 shadow-xs "
														style={{
															borderColor: cardBackgroundColor,
															borderWidth: '2px',
														}}
													>
														<div className="d-flex flex-column justify-content-between h-100 ">
															<div className="mx-2">
																<div className="d-flex justify-content-between">
																	<div className=" profile-sm rounded-2 overflow-hidden mt-3">
																		<img src="/assets/images/Rectangle 180.png" alt="Profile" className="profile-sm object-fit-cover" />
																	</div>
																	<div className="text-end my-3 text-end fw-xs">{project.date_finish}</div>
																</div>
																<div>
																	<Card.Title className="mt-3 fw-1xs">{project.name}</Card.Title>
																	<div className="mt-2 fw-xs">
																		Progress
																		{/* <ProgressBar
                                 className="mt-1 pb-0"
                                 now={progress}
                                 label={`${progress}%`}
                                 variant={progressVariant}
                               /> */}
																	</div>
																</div>
															</div>

															<div
																className="mt-3 rounded-bottom-3 px-2"
																style={{
																	backgroundColor: backgroundColorWithOpacity,
																}}
															>
																<Row>
																	<Col xs={6} md={4} className="py-3 ">
																		<div className=" profile-sm rounded-circle mx-2 overflow-hidden border border-2 border-white ">
																			<img src="/assets/images/Profile.jpeg" alt="Profile" className="profile-sm rounded-circle" />
																		</div>
																	</Col>
																</Row>
																<div className="d-flex justify-content-between align-items-center rounded-bottom">
																	<Button
																		style={{
																			background: cardBackgroundColor,
																			border: 'none',
																		}}
																		className="mb-3 text-white"
																	>
																		{weeksLeft > 0 ? `${weeksLeft} Weeks left` : 'Overdue'}
																	</Button>
																	<TbFileSearch size={25} className="text-end mb-3" />
																</div>
															</div>
														</div>
													</Card>
												))
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className=" col-lg-6 col-md-12">
							<div className="py-4 px-4 mb-5 bg-body-secondary rounded-4 shadow mx-1 ">
								<div className="d-flex justify-content-between align-items-center mb-3">
									<h4>Upcoming Task</h4>
									<Link href="" className="text-end mx-2">
										View All
									</Link>
								</div>
								<Row>
									<Col>
										<ProjectTable colorClassName="border-primary" />
									</Col>
								</Row>
							</div>
						</div>

						<div className="col-lg-6 col-md-12">
							<div className="py-4 px-4  mb-5 bg-body-secondary rounded-4 shadow">
								<div className="d-flex justify-content-between align-items-center mb-3">
									<h4>Payment</h4>
									<Link href="" className="text-end mx-2">
										View All
									</Link>
								</div>

								<Row>
									<Col>
										<ProjectTable colorClassName="border-danger" />
									</Col>
								</Row>
							</div>
						</div>
					</div>
					<div className="row">
						<div className=" d-flex mb-3 justify-content-between me-lg-5">
							<h4>Featured Projects</h4>
							<div className="d-flex me-2">
								<Button variant={'primary'} className="justify-content-end text-white mx-3">
									Discover Other Project
								</Button>
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
										// value={searchTerm}
										// onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</Form.Group>
							</div>
						</div>

						<ProjectCard />
					</div>
				</div>
			</section>
			{/* Mid Section */}

			{/* Bottom Sect */}
		</>
	);
};

export default ContainerDashboardTrades;
