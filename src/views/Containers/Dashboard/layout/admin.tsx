'use client';
import React, { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { headerNavLinks } from '@/data/headerNavLinks';
import CardComponents from '@/components/integrated/Card';
import { TbHomeSearch, TbUsers, TbFileDescription, TbReceipt2 } from 'react-icons/tb';

interface Project {
	date: string;
	projectName: string;
	progress: number;
	weeksLeft: number;
	uv: number;
	pv: number;
	amt: number;
}

const projects: Project[] = [
	{
		date: '2023-08-23',
		projectName: 'Project A',
		progress: 50,
		weeksLeft: 3,
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		date: '2023-02-15',
		projectName: 'Project B',
		progress: 80,
		weeksLeft: 6,
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		date: '2023-02-23',
		projectName: 'Project A',
		progress: 50,
		weeksLeft: 6,
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		date: '2023-08-15',
		projectName: 'Project B',
		progress: 80,
		weeksLeft: 0,
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		date: '2023-02-23',
		projectName: 'Project A',
		progress: 50,
		weeksLeft: 3,
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		date: '2023-04-15',
		projectName: 'Project B',
		progress: 80,
		weeksLeft: 5,
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		date: '2023-08-23',
		projectName: 'Project A',
		progress: 50,
		weeksLeft: 3,
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		date: '2023-08-15',
		projectName: 'Project B',
		progress: 80,
		weeksLeft: 5,
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
];

const ContainerDashboardAdmin: FC = () => {
	const [filteredData, setFilteredData] = useState<Project[]>(projects);

	const getIconForNavLink = (title: any) => {
		switch (title) {
			case 'Job Owners':
				return <TbHomeSearch size={25} />;
			case 'Users':
				return <TbUsers size={25} />;
			case 'Tradepersons':
				return <TbFileDescription size={25} />;
			case 'Billings':
				return <TbReceipt2 size={25} />;
			default:
				return null;
		}
	};

	const handleFilter = (filterType: string) => {
		const currentDate = new Date();
		const oneDayInMillis = 24 * 60 * 60 * 1000;
		let startDate = new Date();

		if (filterType === 'week') {
			startDate.setTime(currentDate.getTime() - 7 * oneDayInMillis);
		} else if (filterType === 'month') {
			startDate.setMonth(currentDate.getMonth() - 1);
		} else if (filterType === 'year') {
			startDate.setFullYear(currentDate.getFullYear() - 1);
		}

		const filtered = projects.filter((entry) => new Date(entry.date) >= startDate);
		const sortedFiltered = filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
		setFilteredData(sortedFiltered);
	};

	const navLinksToShow = ['Job Owners', 'Tradepersons', 'Billings', 'Users'];

	return (
		<main className="vh-100 py-5 bg-body-light">
			<section className="container py-5 my-5 max-w-xl mx-auto">
				<div className="row">
					<div className="col-lg-6 col-md-12 mb-3">
						<div className="row">
							{headerNavLinks
								.filter((link) => navLinksToShow.includes(link.title))
								.map((link, index) => (
									<div key={index} className="col-md-6 ">
										<div className=" bg-white card-stats">
											<div className="row">
												<div className="col-12 col-md-7">
													<h2 className="card-title ">5</h2>
													<h5>{link.title}</h5>
												</div>
												<div className="col-12 col-md-5">
													<img src="assets/images/comp-1.png" alt="" />
												</div>
											</div>
											<p className="text-primary mt-1 text-sm">{filteredData[0]?.date}</p>
										</div>
									</div>
								))}
						</div>
					</div>

					<div className="col-lg-6 col-md-12 mb-5 bg-body-secondary rounded-4 shadow ">
						<div className="m-3">
							<div className="d-flex justify-content-between align-items-center mx-3">
								<h3>Overview Project</h3>
								<Dropdown className="mb-3 justify-content-end">
									<Dropdown.Toggle variant="secondary" id="filterDropdown">
										Filter
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item onClick={() => handleFilter('week')}>Last Week</Dropdown.Item>
										<Dropdown.Item onClick={() => handleFilter('month')}>Last Month</Dropdown.Item>
										<Dropdown.Item onClick={() => handleFilter('year')}>Last Year</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<ResponsiveContainer width="100%" height={200}>
								<LineChart width={700} height={100} data={filteredData} margin={{ top: 5, right: 3, left: 5, bottom: 1 }}>
									<CartesianGrid strokeDasharray="3 3 " />
									<XAxis dataKey="date" />
									<YAxis />
									<Tooltip />
									{/* <Legend /> */}
									<Line dataKey="pv" stroke="#862A1A" />
									<Line dataKey="uv" stroke="#5590D1" />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>

				<div className="row mt-4 ml-4">
					<h2>Latest Project</h2>
					{projects.slice(0, 4).map((project, index) => (
						<div key={index} className="col-lg-3 col-md-6 col-sm-6 mb-3">
							<CardComponents {...project} />
						</div>
					))}
				</div>
			</section>
		</main>
	);
};

export default ContainerDashboardAdmin;
