'use client';
import React, { FC, useState } from 'react';
import CardComponents from '@/components/integrated/Card';
import { project } from '@/data/projects';
import { tradepersons } from '@/data/tradepersons';
import SearchComponent from '@/components/modular/search/forms';
// import

import { TbEdit, TbFileSearch, TbSearch, TbStarFilled } from 'react-icons/tb';
import { RiFacebookFill, RiInstagramFill, RiPhoneFill, RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri';
import { Link } from '@/hooks/navigation/router-overrides/link';
import { Button } from '@/components/core/Button';
import { Card, Col, Form, ProgressBar, Row, Table } from 'react-bootstrap';
import useSWR from 'swr';
import { useFetcher } from '@/hooks/fetching/useFetcher';
import { JobsMaster, ProfilesMaster } from '@/lib/global.types';
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

interface Tradepersons {
	id: number;
	user: string;
	specification: {
		architecture: boolean;
		interior: boolean;
		contractor: boolean;
	};
	projectName: string;
	Review: number;
}

const ProjectTable: FC<{ className: string }> = ({ className }) => (
	<div className="table-rounded">
		<Table>
			<thead className="py-5">
				<tr>
					{['Project Name', 'Due Date', 'Spesiication'].map((heading) => (
						<th key={heading} className="text-start align-middle border-none py-3 fs-thead" style={{ backgroundColor: '#E2E8F0' }}>
							{heading}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{project.slice(0, 4).map((project, index) => (
					<tr key={project.id} className="border-secondary">
						<td className="text-start align-middle py-md-3 fs-thead">{project.projectName}</td>
						<td className="text-start align-middle fs-thead">{project.date}</td>
						<td className="text-start align-middle fs-thead">{project.user}</td>
					</tr>
				))}
			</tbody>
		</Table>
	</div>
);

const TradeTable: FC<Project> = ({ weeksLeft }) => {
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
	return (
		<div className="table-rounded">
			<Table>
				<thead className="py-5">
					<tr>
						{['Project Name', 'Spesification', 'Review', 'Status'].map((heading) => (
							<th key={heading} className="text-start align-middle border-none py-3 fs-thead" style={{ backgroundColor: '#E2E8F0' }}>
								{heading}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tradepersons.slice(0, 4).map((project, index) => (
						<tr key={project.id} className="border-secondary">
							<td className="text-start align-middle py-md-3 fs-thead">{project.projectName}</td>
							<td className="text-start align-middle fs-thead">{project.specification}</td>
							<td className="text-start align-middle fs-thead">{project.review}</td>
							<td className="text-start align-middle fs-thead">
								<div
									style={{
										background: cardBackgroundColor,
										border: 'none',
									}}
									className=" text-white fs-thead px-2 rounded-2 text-center"
								>
									{weeksLeft > 0 ? `${weeksLeft} Weeks left` : 'Overdue'}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

const ContainerDashboardContractor: FC<Project> = ({ weeksLeft }) => {
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
			<section className="py-5 vh-100 bg-body-light justiy-content-center my-5">
				<div className="container my-5">
					<div className="row">
						{/* Proile card */}
						<div className="col-12 col-md-4 col-lg-4 ">
							{/* <div className=""> */}
							<div className=" bg-white rounded-4 shadow-sm p-3 pt-4 min-h-lg">
								<div className="d-flex justify-content-between">
									<div>
										<h6>Hello,</h6>
										<h3 className="text-primary mt-2">{session ? session?.user.user_metadata.fullname : 'Loading.....'}</h3>
									</div>
									<Button>
										<TbEdit size={25} className="text-end" />
									</Button>
								</div>

								<div className="d-flex">
									<div className=" overflow-hidden profile rounded-circle">
										<img src="/assets/images/Rectangle 180.png" alt="Profile" className="profile rounded-circle" />
									</div>
									<div className="mt-3 mx-3">
										<h5 className="font-light">From</h5>
										<h4>{session?.user.user_metadata.username}</h4>
									</div>
								</div>

								<div className="justify-content-start">
									<div className="d-flex justify-content-between mx-2 mt-4">
										<p>Join</p>
										<p className="text-end ">{formattedDate}</p>
									</div>
									<div className="d-flex justify-content-between mx-2 my-2">
										<p>Total Project</p>
										<p className="text-end ">2016 Project</p>
									</div>
								</div>
							</div>
						</div>
						{/* </div> */}
						{/* ENd */}

						{/* Rigt */}
						<div className="col-12 col-md-8">
							<div className="row">
								<div className="col-12 col-md-12">
									{/* Search */}
									<SearchComponent onSubmit={(query) => {}} roles={'contractor'} />
									{/* searchend */}
								</div>
								<div className="col-12 mb-4">
									<div className="row">
										<div className="col-12 col-md-6 ">
											<div className="pt-4 px-2 bg-white rounded-4 shadow-sm py-3">
												<div className="d-flex  justify-content-between align-items-center mb-3">
													<h5 className="mb-0 fw-bold">My Posts</h5>
													<Link href="" className="text-end mx-4 ">
														View All
													</Link>
												</div>
												<div className=" mt-1 ">
													{/* <div className="col"> */}
													<ProjectTable className="rounded-4" />
													{/* </div> */}
												</div>
											</div>
										</div>
										<div className="col-12 col-md-6 ps-0">
											<div className="pt-4 px-2 bg-white rounded-4 shadow-sm py-3">
												<div className="d-flex  justify-content-between align-items-center mb-3">
													<h5 className="mb-0 fw-bold">Billings</h5>
													<Link href="" className="text-end mx-4 ">
														View All
													</Link>
												</div>
												<div className="mt-1 ">
													{/* <div className="col"> */}
													<TradeTable />
													{/* </div> */}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-12 ">
									<div className="py-4 px-3 mb-5 bg-white rounded-4 shadow-sm  ">
										<div className="d-flex justify-content-between align-items-center mb-3">
											<h5 className="fw-med ">My Project</h5>
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
						{/* End */}
					</div>
				</div>
			</section>

			<section className="container my-5 py-5">
				<div className="row my-5 py-5 ">
					<div className="">
						<div className=" d-flex mb-3 justify-content-between ">
							<h4>My Hire Tradespersons </h4>

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

					<Col className=" d-lg-flex mt-3 mx-auto">
						{ProfileLoading ? (
							<>
								{[1, 2, 3, 4].map((skeletonIndex) => (
									<Card key={skeletonIndex} style={{ width: '31.25rem' }} className="relative overflow-hidden mx-2 p-5">
										<Card.Img variant="top" className="placeolder min-h-100" />
										<div className="absolute profile rounded-circle profile-container mx-2 mt-2 overflow-hidden border border-2 border-white">
											<div className="profile rounded-circle bg-light placeholder-wave " />
										</div>
										<Card.Body className="rounded-bottom pt-5">
											<div className="bg-secondary placeholder-wave  placeholder-lg mt-5 mb-3" />
											<div className="bg-primary placeholder-wave placeholder-sm" />
										</Card.Body>
									</Card>
								))}
							</>
						) : (
							ProfileData?.data.slice(0, 4).map((profile: ProfilesMaster) => (
								<Card key={profile.id} style={{ width: '31.25rem' }} className="relative overflow-hidden mx-2">
									<Card.Img variant="top" src="assets/images/Rectangle 191.png" className="overflow-hidden max-h-2md" />
									{/* <TbStarFilled /> */}
									<div className="absolute profile rounded-circle profile-container mx-2 overflow-hidden border border-2 border-white">
										<img src="/assets/images/Profile.jpeg" alt="Profile" className="profile rounded-circle" />
									</div>
									<Card.Body className=" rounded-bottom pt-4 ">
										<div className="">
											<h6 className="fw-med my-0">{profile.name}</h6>
											<p className="text-primary fw-1xs ">{profile.roles.name}</p>
										</div>
										<div className="d-flex justify-content-between">
											<div className="d-flex gap-2">
												<div className="text-primary profile-xs rounded-circle border border-2 border-primary">
													<RiFacebookFill size={25} className="m-1 " />
												</div>
												<div className="text-primary profile-xs rounded-circle border border-2 border-primary">
													<RiInstagramFill size={25} className="m-1 " />
												</div>
												<div className="text-primary profile-xs rounded-circle border border-2 border-primary">
													<RiPhoneFill size={25} className="m-1 " />
												</div>
											</div>
											<div className="text-end end-0">
												<RiBookmarkLine size={25} />
											</div>
										</div>
									</Card.Body>
								</Card>
							))
						)}
					</Col>
				</div>
			</section>
		</>
	);
};

export default ContainerDashboardContractor;
