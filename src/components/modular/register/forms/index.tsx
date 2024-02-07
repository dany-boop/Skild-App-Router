'use client';

// import { Button } from '@/components/core/Button';
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, InputGroup, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import Link from '@/hooks/navigation/link';
import { usePathname } from 'next/navigation';
import { useRouter } from '@/hooks/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { toast } from 'react-toastify';

const schema = z
	.object({
		email: z.string().min(1, { message: 'Email must not be empty' }).email({ message: 'Invalid email address' }),
		fullname: z.string().min(1, { message: 'Fullname must not be empty' }),
		username: z.string().min(1, { message: 'Username must not be empty' }),
		phone: z.string().min(1, { message: 'Phone must not be empty' }),
		password: z.string().min(1, { message: 'Password must not be empty' }),
		confirmPassword: z.string(),
		roles: z.enum(['contractor', 'tradesperson', 'admin', 'dev', 'owner']),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'Password did not match',
		path: ['confirmPassword'],
	});

type Schema = z.infer<typeof schema>;

export default function Main() {
	const [visible, setVisible] = useState<boolean>(false);
	const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const pathname = usePathname();
	const router = useRouter();

	const supabase = createClientComponentClient();

	const asPathname = pathname.includes('admin') ? 'Add Admin' : pathname.includes('business') ? 'as Contractor' : 'as Tradesman';

	const {
		watch,
		trigger,
		formState: { errors, isValidating, isValid },
		handleSubmit,
		...form
	} = useForm<Schema>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
			fullname: '',
			username: '',
			confirmPassword: '',
			phone: '',
			roles: pathname.includes('admin') ? 'admin' : pathname.includes('business') ? 'contractor' : 'tradesperson',
		},
	});

	const submitDisabled = useMemo(
		() =>
			loading ||
			!!errors.fullname?.message ||
			!!errors.password?.message ||
			!!errors.confirmPassword?.message ||
			!!errors.email?.message ||
			!!errors.phone?.message ||
			!!errors.username?.message ||
			!(!!form.getValues().email && !!form.getValues().password && !!form.getValues().confirmPassword && !!form.getValues().email && !!form.getValues().phone && !!form.getValues().username),
		[errors, form, loading]
	);

	useEffect(() => {
		const subscription = watch(() => trigger());
		return () => subscription.unsubscribe();
	}, [watch, trigger]);

	const onSubmit: SubmitHandler<Schema> = async (data) => {
		try {
			setLoading(true);
			// console.log(data);
			const { data: registerData, error: registerError } = await supabaseAdmin.createUser({
				email: data.email,
				password: data.password,
				user_metadata: {
					username: data.username,
					fullname: data.fullname,
					phone: data.phone,
					roles: data.roles,
				},
				email_confirm: true,
			});
			// console.log(registerData, registerError?.message, registerError?.status);
			if (registerError) {
				if (registerError.status === 422) {
					toast.error('Account with provided email has been registered. Please use a different email address', {
						toastId: 'duplicate-error',
					});
				} else {
					toast.error('Account cannot be created', {
						toastId: 'register-error',
					});
				}
				console.log(registerError);
			} else {
				toast.success('Account has been registered successfully!', {
					toastId: 'register-success',
				});
				if (pathname.includes('admin')) {
					setTimeout(() => router.push('/dashboard'), 3000);
				} else {
					setTimeout(() => router.push('/login'), 3000);
				}
			}
			// await fetch('/api/v1/auth/sign-up-admin', {
			// 	method: 'POST',
			// 	body: JSON.stringify(data),
			// 	headers: { 'Content-Type': 'application/json' },
			// })
			// 	.then((res) => {
			// 		if (res.ok || res.redirected) {
			// 			alert('Registered successfully!');
			// 			if (pathname.includes('admin')) {
			// 				router.push('/dashboard');
			// 			} else {
			// 				router.push('/login');
			// 			}
			// 		} else {
			// 			alert('Registration failed');
			// 		}
			// 	})
			// 	.catch((error) => console.log(error));
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Form
				onSubmit={(event) => {
					console.log(isValid, isValidating);
					event.preventDefault();
					if (isValid) {
						onSubmit(form.getValues());
					} else {
						toast.error('Form is not valid');
					}
					handleSubmit(onSubmit);
				}}
			>
				<div className="d-flex flex-row mt-5 justify-content-center">
					<h2 className="text-primary font-weight-bold text-center  text-uppercase">{pathname.includes('admin') ? asPathname : `Sign Up ${asPathname}`}</h2>
				</div>
				<Form.Group className="mb-3 mt-3">
					<Container fluid>
						<Row className="g-3">
							<Col xs={12} md={6}>
								<Form.Control isInvalid={!!errors.fullname?.message} className={`py-3`} placeholder="Fullname" {...form.register('fullname')} />
								{errors.fullname?.message && (
									<Form.Text as="small" className="text-danger">
										{errors.fullname.message}
									</Form.Text>
								)}
							</Col>
							<Col xs={12} md={6}>
								<Form.Control isInvalid={!!errors.username?.message} className={`py-3`} placeholder="Username" {...form.register('username')} />
								{errors.username?.message && (
									<Form.Text as="small" className="text-danger">
										{errors.username.message}
									</Form.Text>
								)}
							</Col>
							<Col xs={12}>
								<Form.Control isInvalid={!!errors.email?.message} className={`py-3`} placeholder="Email" {...form.register('email')} />
								{errors.email?.message && (
									<Form.Text as="small" className="text-danger">
										{errors.email.message}
									</Form.Text>
								)}
							</Col>
							<Col xs={12}>
								<Form.Control isInvalid={!!errors.phone?.message} className={`py-3`} placeholder="Phone number" {...form.register('phone')} />
								{errors.phone?.message && (
									<Form.Text as="small" className="text-danger">
										{errors.phone.message}
									</Form.Text>
								)}
							</Col>
							<Col xs={12} md={6}>
								<InputGroup>
									<Form.Control
										isInvalid={!!errors.password?.message}
										className={`py-3 border-end-0`}
										type={visible ? 'text' : 'password'}
										placeholder="Enter password"
										{...form.register('password')}
									/>
									<Button className={`px-3 bg-white border border-start-0 ${errors.password?.message && 'border-danger'}`} type="button" onClick={() => setVisible((o) => !o)}>
										{visible ? <BsEyeFill size={20} /> : <BsEyeSlashFill size={20} />}
									</Button>
								</InputGroup>
								{errors.password?.message && (
									<Form.Text as="small" className="text-danger">
										{errors.password.message}
									</Form.Text>
								)}
							</Col>
							<Col xs={12} md={6}>
								<InputGroup>
									<Form.Control
										isInvalid={!!errors.confirmPassword?.message}
										className={`py-3 border-end-0`}
										type={confirmVisible ? 'text' : 'password'}
										placeholder="Enter confirm password"
										{...form.register('confirmPassword')}
									/>
									<Button
										className={`px-3 bg-white border border-start-0 ${errors.confirmPassword?.message && 'border-danger'}`}
										type="button"
										onClick={() => setConfirmVisible((o) => !o)}
									>
										{confirmVisible ? <BsEyeFill size={20} /> : <BsEyeSlashFill size={20} />}
									</Button>
								</InputGroup>
								{errors.confirmPassword?.message && (
									<Form.Text as="small" className="text-danger">
										{errors.confirmPassword.message}
									</Form.Text>
								)}
							</Col>
							<Col xs={12}>
								<p className="small text-body-dark">*Make sure carefly that the data you entered was correct and verify or the data validation. </p>
								<div className="text-center">
									<Button type="submit" disabled={submitDisabled} className="btn btn-warning text-uppercase btn-lg py-3 w-100 ">
										{!loading ? 'Sign Up' : <Spinner as="span" animation="border" role="status" aria-hidden="true" />}
									</Button>

									{pathname.includes('admin') ? (
										<div className="mt-5">
											<p className="fw-normal align-bottom ">
												<Link href="/dashboard" className="link-primary">
													Return to Dashboard
												</Link>
											</p>
										</div>
									) : (
										<div className="mt-3">
											{pathname.includes('/trades') && (
												<p className="fw-normal align-bottom ">
													Need a business account?{' '}
													<Link href="/register/business" className="link-primary">
														Click here
													</Link>
												</p>
											)}
											{pathname.includes('/business') && (
												<p className="fw-normal align-bottom ">
													Need a trades account?{' '}
													<Link href="/register/trades" className="link-primary">
														Click here
													</Link>
												</p>
											)}
											{pathname.includes('/trades') && (
												<p className="fw-normal align-bottom ">
													Have an account?{' '}
													<Link href="/login/trades" className="link-primary">
														Login
													</Link>
												</p>
											)}
											{pathname.includes('/business') && (
												<p className="fw-normal align-bottom ">
													Have an account?{' '}
													<Link href="/login/business" className="link-primary">
														Login
													</Link>
												</p>
											)}
										</div>
									)}
								</div>
							</Col>
						</Row>
					</Container>
				</Form.Group>
			</Form>
		</>
	);
}
