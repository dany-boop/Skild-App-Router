'use client';
import { FC, useState } from 'react';
import { Button } from '@/components/core/Button';
import ThemeToggler from '@/components/integrated/ThemeToggler';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import RegisterForm from '@/components/modular/register/forms';
import { usePathname, useRouter } from 'next/navigation';

const ContainerRegister: FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const pathname = usePathname();

	const backgroundStyle: React.CSSProperties = {};

	if (pathname.includes('trades')) {
		backgroundStyle.backgroundImage = 'url("/assets/images/Sign in Tradespersons.png")';
		backgroundStyle.backgroundSize = 'cover';
	} else if (pathname.includes('business')) {
		backgroundStyle.backgroundImage = 'url("/assets/images/Rectangle 209.png")';
		backgroundStyle.backgroundSize = 'cover';
	} else {
		backgroundStyle.backgroundColor = 'lightgray';
	}

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<section className="vh-100" style={backgroundStyle}>
				<div className="position-absolute" style={{ top: '1rem', left: '1rem' }}>
					<ThemeToggler />
				</div>
				<div className="container-fluid max-w-7xl vh-100 align-items-center d-flex">
					<div className="row d-flex justify-content-center align-self-center align-items-center h-full">
						<div className="col-md-9 col-lg-5 col-xl-4 ps-4">
							<img src="/assets/images/logo.png" className="w-200 mt-3 ms-5" alt="Sample image" />
						</div>

						<div className="col-md-8 col-lg-7 col-xl-5 offset-xl-0 px-4 mt-5 pb-4 bg-body-secondary rounded-5 ">
							<RegisterForm />{' '}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ContainerRegister;
