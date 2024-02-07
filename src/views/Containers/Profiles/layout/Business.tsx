'use client';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { headerNavLinks } from '@/data/headerNavLinks';
import useSWR from 'swr';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import { TbCamera, TbUserCircle, TbId } from 'react-icons/tb';
import { ProfilesMaster } from '@/lib/global.types';
import { useFetcher } from '@/hooks/fetching/useFetcher';

const ContainerTradesProfile: FC = () => {
	const { pathname } = useParams<{ pathname: string }>();

	const { data, error, isLoading } = useSWR('/api/v1/trades/profiles', useFetcher);

	const innerWidth = typeof window !== 'undefined' ? window.innerWidth : null;

	return (
		<>
			<section className=' mt-5 py-5 ps-5 pe-4 bg-light'>
				<div className='container-fluid py-5'>
					<div className='bg-white p-5 rounded-3 '>
						<div className='d-flex'>
							<TbUserCircle size={35} />
							<h5 className='mx-2 mt-2'>Profile Info</h5>
						</div>
						<p className='max-w-50 my-3'>Tell us a bit about yourself. This information will appear on your public profile, please check your Profile is correct</p>
						<Form>
							<Row>
								<div className='mb-3 '>
									<p>
										Profile Picture <span className='text-danger'>*</span>
									</p>
									<Button className='rounded-circle profile-lg bg-secondary' onClick={() => {}}>
										<TbCamera size={50} />
									</Button>
								</div>
								<div className='d-flex gap-3'>
									<Form.Group className='col-6' controlId='firstName'>
										<Form.Label>
											First Name<span className='text-danger'>*</span>
										</Form.Label>
										<Form.Control
											className='border py-3 border-primary'
											type='text'
											placeholder='Enter first name'
											//   value={firstName}
											//   onChange={(e) => setFirstName(e.target.value)}
										/>
									</Form.Group>
									<Form.Group className='col-6' controlId='lastName'>
										<Form.Label>
											Last Name <span className='text-danger'>*</span>
										</Form.Label>
										<Form.Control
											className='border py-3 border-primary'
											type='text'
											placeholder='Enter last name'
											//   value={lastName}
											//   onChange={(e) => setLastName(e.target.value)}
										/>
									</Form.Group>
								</div>
								<div className='d-flex mt-4 gap-3'>
									<Form.Group className='col-6' controlId='email'>
										<Form.Label>
											Email <span className='text-danger'>*</span>
										</Form.Label>
										<Form.Control
											className='border py-3 border-primary'
											type='email'
											placeholder='Enter email'
											//   value={email}
											//   onChange={(e) => setEmail(e.target.value)}
										/>
									</Form.Group>
									<Form.Group className='col-6' controlId='phoneNumber'>
										<Form.Label>
											Phone Number<span className='text-danger'>*</span>
										</Form.Label>
										<Form.Control
											className='border py-3 border-primary'
											type='text'
											placeholder='Enter phone number'
											//   value={phoneNumber}
											//   onChange={(e) => setPhoneNumber(e.target.value)}
										/>
									</Form.Group>
								</div>
								<div className='d-flex mt-4 gap-3'>
									<Form.Group className='col-6' controlId='password'>
										<Form.Label>
											Password<span className='text-danger'>*</span>
										</Form.Label>
										<Form.Control
											className='border py-3 border-primary'
											type='password'
											placeholder='Enter password'
											//   value={password}
											//   onChange={(e) => setPassword(e.target.value)}
										/>
									</Form.Group>
									<Form.Group className='col-6' controlId='confirmPassword'>
										<Form.Label>
											Confirm Password<span className='text-danger'>*</span>
										</Form.Label>
										<Form.Control
											className='border py-3 border-primary'
											type='password'
											placeholder='Confirm password'
											//   value={confirmPassword}
											//   onChange={(e) => setConfirmPassword(e.target.value)}
										/>
									</Form.Group>
								</div>
								<div className='d-flex mt-4 gap-3'>
									<Form.Group className='col-6' controlId='location'>
										<Form.Label>
											Location<span className='text-danger'>*</span>
										</Form.Label>
										<Form.Control
											className='border py-3 border-primary'
											as='textarea'
											rows={4}
											placeholder='Enter location'
											//   value={location}
											//   onChange={(e) => setLocation(e.target.value)}
										/>
									</Form.Group>
									<Form.Group className='col-6' controlId='description'>
										<Form.Label>
											Description<span className='text-danger'>*</span>
										</Form.Label>
										<Form.Control
											className='border py-3 border-primary'
											as='textarea'
											rows={4}
											placeholder='Enter description'
											//   value={description}
											//   onChange={(e) => setDescription(e.target.value)}
										/>
									</Form.Group>
								</div>
							</Row>
						</Form>
					</div>

					{/* sect 2 */}
					<div className='bg-white p-5 rounded-3 mt-3'>
						<div className='d-flex'>
							<TbId size={35} />
							<h5 className='mx-2 mt-2'>Profile Info</h5>
						</div>
						<p className='max-w-50 my-3'>Tell us a bit about yourself. This information will appear on your public profile, please check your Profile is correct</p>
						<Form>
							<Row className='container'>
								<Form.Group className='col-5 pe-5' controlId='firstName'>
									<Form.Label>
										Your Occupation<span className='text-danger'>*</span>
									</Form.Label>
									<Form.Control
										className='border py-3 border-primary'
										type='text'
										placeholder='Enter first name'
										//   value={firstName}
										//   onChange={(e) => setFirstName(e.target.value)}
									/>
								</Form.Group>

								{/* Form2 */}
								<div className='d-flex mt-4 gap-5'>
									<div className='d-flex col-11 gap-3'>
										<Form.Group className='col-5' controlId='email'>
											<Form.Label>
												Skills<span className='text-danger'>*</span>
											</Form.Label>
											<Form.Control
												className='border py-3 border-primary'
												type='email'
												placeholder='Enter email'
												//   value={email}
												//   onChange={(e) => setEmail(e.target.value)}
											/>
										</Form.Group>
										<Form.Group className='col-7' controlId='phoneNumber'>
											<Form.Label>
												Experiences Level<span className='text-danger'>*</span>
											</Form.Label>
											<Form.Control
												className='border py-3 border-primary'
												type='text'
												placeholder='Enter phone number'
												//   value={phoneNumber}
												//   onChange={(e) => setPhoneNumber(e.target.value)}
											/>
										</Form.Group>
									</div>

									<div className='pt-4 mt-2'>
										<Button variant='secondary' className='py-3 px-4'>
											Add
										</Button>
									</div>
								</div>

								{/* AWARD */}
								<div className='d-flex mt-4 gap-5'>
									<div className='d-flex col-11 gap-3'>
										<Form.Group className='col-5' controlId='password'>
											<Form.Label>
												Award<span className='text-danger'>*</span>
											</Form.Label>
											<Form.Control
												className='border py-3 border-primary'
												type='text'
												placeholder='Enter text'
												//   value={text}
												//   onChange={(e) => settext(e.target.value)}
											/>
										</Form.Group>
										<Form.Group className='col-4' controlId='confirmtext'>
											<Form.Label>
												Award From<span className='text-danger'>*</span>
											</Form.Label>
											<Form.Control
												className='border py-3 border-primary'
												type='text'
												placeholder='Confirm text'
												//   value={confirmtext}
												//   onChange={(e) => setConfirmtext(e.target.value)}
											/>
										</Form.Group>
										<Form.Group className='col-3' controlId='confirmtext'>
											<Form.Label>
												Year<span className='text-danger'>*</span>
											</Form.Label>
											<Form.Control
												className='border py-3 border-primary'
												type='text'
												placeholder='Confirm text'
												//   value={confirmPassword}
												//   onChange={(e) => setConfirmPassword(e.target.value)}
											/>
										</Form.Group>
										<div className='pt-4 mt-2'>
											<Button variant='secondary' className='py-3 px-4'>
												Add
											</Button>
										</div>
									</div>
								</div>
								<div className='d-flex mt-4 gap-5'>
									<div className='d-flex col-11 gap-3'>
										<Form.Group className='col-5' controlId='password'>
											<Form.Label>
												Award<span className='text-danger'>*</span>
											</Form.Label>
											<Form.Control
												className='border py-3 border-primary'
												type='text'
												placeholder='Enter text'
												//   value={text}
												//   onChange={(e) => settext(e.target.value)}
											/>
										</Form.Group>
										<Form.Group className='col-4' controlId='confirmtext'>
											<Form.Label>
												Award From<span className='text-danger'>*</span>
											</Form.Label>
											<Form.Control
												className='border py-3 border-primary'
												type='text'
												placeholder='Confirm text'
												//   value={confirmtext}
												//   onChange={(e) => setConfirmtext(e.target.value)}
											/>
										</Form.Group>
										<Form.Group className='col-3' controlId='confirmtext'>
											<Form.Label>
												Year<span className='text-danger'>*</span>
											</Form.Label>
											<Form.Control
												className='border py-3 border-primary'
												type='text'
												placeholder='Confirm text'
												//   value={confirmPassword}
												//   onChange={(e) => setConfirmPassword(e.target.value)}
											/>
										</Form.Group>
									</div>

									<div className='pt-4 mt-2'>
										<Button variant='secondary' className='py-3 px-4'>
											Add
										</Button>
									</div>
								</div>
							</Row>
						</Form>
					</div>
					<div className='d-flex justify-content-center'>
						<Button variant='primary' className={`text-white my-4 py-3 col-4 ${innerWidth && innerWidth < 768 ? 'd-md-none' : ''}`} type='submit'>
							Save Changes And Continue To Dashboard
						</Button>
					</div>D
					<div className='d-flex justify-content-center'>
						<Button variant='warning' className='py-3 col-4 mt-2' type='submit'>
							Save And Find A Job
						</Button>
					</div>
				</div>
			</section>
		</>
	);
};

export default ContainerTradesProfile;
