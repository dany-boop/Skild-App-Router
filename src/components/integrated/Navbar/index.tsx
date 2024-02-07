'use client';
import React, { FC, MouseEventHandler, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePathname } from 'next/navigation';

import { Badge, CloseButton, Dropdown, Offcanvas } from 'react-bootstrap';
import { FaThLarge } from 'react-icons/fa';
import { TbBell, TbFileSpreadsheet, TbLock, TbLogout2, TbSearch, TbSettings, TbUserCircle } from 'react-icons/tb';
import { Sling as Hamburger } from 'hamburger-react';

import { Link, useRouter } from '@/hooks/navigation';
import ThemeToggler from '../ThemeToggler';
import { Button } from '@/components/core/Button';
import { headerNavLinks } from '@/data/headerNavLinks';
import { data } from '@/data/owners-list';
import { notifications } from '@/data/notification';
import { useSession } from '@/hooks/session';

const Navbar: FC = () => {
	const [showOffcanvas, setShowOffcanvas] = useState(false);
	const [offcanvasPosition, setOffcanvasPosition] = useState<'start' | 'end'>('start');
	const [showNotifications, setShowNotifications] = useState(false);

	const closeNotifications = () => {
		setShowNotifications(false);
	};

	const activeLink = usePathname();
	const isDataLoaded = data.length > 0;
	const [isOpen, setOpen] = useState(false);

	const pathname = usePathname();
	const router = useRouter();
	const session = useSession();

	// setting offcanvas logic
	const handleClose = () => {
		setShowOffcanvas(false);
		if (offcanvasPosition === 'start') {
			setOpen(false);
		}
	};
	const handleShow = (position: 'start' | 'end') => {
		setOffcanvasPosition(position);
		setShowOffcanvas(true);
	};

	const handleLogout = async () => {
		try {
			const supabase = createClientComponentClient();
			await supabase.auth.signOut();
		} finally {
			handleClose();
		}
	};

	const sideLink = [
		{ title: 'Edit Profile', path: '/profiles/trades' },
		{ title: 'Account', path: '/settings' },
		{ title: 'Setting', path: '/settings' },
		{ title: 'Add Admin', path: '/admin' },
	];

	const routesWithNavbar = [
		'/dashboard',
		'/job-owners/contractor-types',
		'/job-owners/job-owners-list',
		'/tradepersons/tradepersons-list',
		'/profiles/trades',
		'/settings',
		'/jobs/create',
		'/search',
	];

	if (!routesWithNavbar.includes(pathname)) return null;

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-primary fixed-top py-0">
				<div className="container py-0 d-flex justify-content-between ">
					<Button className="d-lg-none">
						<Hamburger
							easing="ease-out"
							color="#ECECEC"
							toggled={isOpen && offcanvasPosition !== 'start'}
							toggle={() => setOpen(!isOpen)}
							onToggle={(toggled) => {
								handleShow(toggled ? 'start' : 'end');
							}}
						/>
					</Button>

					<Offcanvas show={showOffcanvas} onHide={handleClose} placement={offcanvasPosition}>
						<Offcanvas.Header closeButton></Offcanvas.Header>
						<Offcanvas.Body className="w-300 d-flex flex-column align-items-center ">
							{offcanvasPosition === 'start' ? (
								<div className="d-flex flex-column align-items-start">
									{headerNavLinks.map((link, index) => (
										<div key={index} className="my-2">
											{link.dropdown ? (
												<Dropdown>
													<Dropdown.Toggle className="text-white" variant="primary" id={`navbarDropdown-${index}`}>
														{link.title}
													</Dropdown.Toggle>
													<Dropdown.Menu className="center-dropdown">
														{link.dropdown.map((dropdownLink, dropdownIndex) => (
															<Button
																key={dropdownIndex}
																className="border-bottom border-dark"
																// href={dropdownLink.path}
																// legacyBehavior
															>
																{dropdownLink.title}
															</Button>
														))}
													</Dropdown.Menu>
												</Dropdown>
											) : (
												<Button
													variant="primary"
													className="text-white w-100"
													// href={link.path}
												>
													{link.title}
												</Button>
											)}
										</div>
									))}
								</div>
							) : (
								<div className="d-flex flex-column align-items-center justiffy-content-start">
									{isDataLoaded ? (
										<div className="d-flex flex-column align-items-center">
											<div className="bg-primary rounded-circle profile-sm d-flex justify-content-center align-items-center ">
												<TbUserCircle size={40} className="text-white" />
											</div>
											<h4 className="mt-2 mb-0">{session ? session?.user.user_metadata.fullname : 'Loading....'}</h4>
											<p className=" text-primary">{session ? session?.user.email : 'Loading....'}</p>
										</div>
									) : (
										<h4 className="mt-2">
											<span>Loading.....</span>
										</h4>
									)}
									<div className="flex-column mt-4 align-self-start justify-content-start ">
										{sideLink.map((link, index) => (
											<div key={index} className="mb-4 text-start align-self-start justify-content-start">
												<h6>
													<a
														onClick={(e) => {
															e.preventDefault();
															router.push(link.path);
															handleClose();
														}}
													>
														{link.title === 'Edit Profile' && <TbUserCircle size={40} className="mx-4 text-start" />}
														{link.title === 'Account' && <TbLock size={40} className="mx-4 text-start" />}
														{link.title === 'Setting' && <TbSettings size={40} className="mx-4 text-start" />}
														{link.title === 'Add Admin' && <TbFileSpreadsheet size={40} className="mx-4 text-start" />}
														{link.title}
													</a>
												</h6>
											</div>
										))}
									</div>
									<div className="my-5 d-flex align-self-start justify-content-start">
										<h6 className="mx-3 mt-2">Dark Mode</h6>
										<ThemeToggler />
									</div>

									<Button className="d-flex bg-transparent" onClick={handleLogout}>
										<TbLogout2 size={40} />
										<h5 className="mx-3 mt-2">Logout</h5>
									</Button>
								</div>
							)}
						</Offcanvas.Body>
					</Offcanvas>

					{/* Navbar top */}
					<div className="navbar-brand ">
						<img src="/assets/images/Logo-B&W.png" className="w-logo mx-3" alt="Logo" />
					</div>
					<div>
						<Button className="container-lg mt-2 me-3 text-white d-flex d-lg-none" onClick={() => handleShow('end')}>
							<TbUserCircle size={45} className="mx-1" />
						</Button>
					</div>

					<div className="collapse navbar-collapse navbar-header">
						<div className="navbar-nav me-auto mb-lg-0">
							{/* Navbar Link Dropdown */}
							{headerNavLinks.map((link, index) => (
								<div key={index} className="navbar-nav">
									{link.dropdown ? (
										<Dropdown className="container-lg nav-item">
											<Dropdown.Toggle
												className={`text-white nav-link ${link.title === activeLink ? 'text-primary bg-light' : ''}`}
												variant="black"
												id={`navbarDropdown-${index}`}
											>
												{link.title}
											</Dropdown.Toggle>
											<Dropdown.Menu className="center-dropdown py-0 rounded-top">
												{link.dropdown.map((dropdownLink, dropdownIndex, dropdownArray) => (
													<Dropdown.Item
														className={dropdownIndex !== dropdownArray.length - 1 ? 'border-bottom border-dark' : undefined}
														key={dropdownIndex}
														onClick={() => router.push(dropdownLink.path)}
													>
														{dropdownLink.title}
													</Dropdown.Item>
												))}
											</Dropdown.Menu>
										</Dropdown>
									) : (
										<div className="nav-item container-lg h-100">
											<a className={`nav-link ${link.path === activeLink ? 'active-link bg-light text-primary' : ' text-white'}`} aria-current="page" href={link.path}>
												<FaThLarge className="me-2" />
												{link.title}
											</a>
										</div>
									)}
								</div>
							))}
						</div>

						{/* rightsection */}

						<div className="d-flex ">
							<Dropdown className="mt-3" show={showNotifications} onToggle={(isOpen) => setShowNotifications(isOpen)}>
								<Dropdown.Toggle className="text-white">
									<TbBell size={30} />
									{notifications.length > 0 && (
										<Badge
											pill
											bg="danger"
											style={{
												position: 'absolute',
												top: '3px',
												right: '12px',
											}}
										>
											{notifications.length}
										</Badge>
									)}
								</Dropdown.Toggle>
								<Dropdown.Menu align="end" className="py-0 rounded-top">
									<div className="notification-header d-flex justify-content-between align-items-center rounded-top bg-light ">
										<h5 className="ms-2 me-1 my-2">Notifications</h5>
										{notifications.length > 0 && (
											<Badge pill bg="secondary" className="me-5">
												{notifications.length}
											</Badge>
										)}
										<CloseButton className="ms-5" onClick={closeNotifications} />
									</div>
									<div
										className="notification-card-list"
										style={{
											width: '290px',
											maxHeight: '300px',
											overflowY: 'auto',
											scrollbarWidth: 'thin',
										}}
									>
										{notifications.map((notification) => (
											<div key={notification.id} className="notification-card p-3 ">
												<h6 className="fs-6 mb-1">{notification.title}</h6>
												<p className="fs-7">{notification.description.length > 30 ? notification.description.substring(0, 30) + '...' : notification.description}</p>
											</div>
										))}
									</div>
								</Dropdown.Menu>
							</Dropdown>

							<Button className="container-lg mt-2 me-3 text-white d-flex " onClick={() => handleShow('end')}>
								<TbUserCircle size={45} className="mx-1" />
								<p className="mt-2">
									Hello,
									<span>{session ? session.user.user_metadata.fullname : 'Loading.....'}</span>
								</p>
							</Button>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
