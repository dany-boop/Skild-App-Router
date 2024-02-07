'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/core/Button';
import { Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import useSWR from 'swr';
import { useSession } from '@/hooks/session';

const schema = z.object({
	id: z.string(),
	tradesperson_id: z.string().nullable(),
	skill_id: z.string().array().nullable(),
});

type Schema = z.infer<typeof schema>;

export default function Main() {
	const [visible, setVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const emailRef = useRef('');

	const session = useSession();
	const {
		watch,
		trigger,
		formState: { errors },
		...form
	} = useForm<Schema>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			id: '',
			tradesperson_id: '',
			skill_id: [],
		},
	});

	const { data, error, isLoading } = useSWR(session ? `/api/v1/profiles?id=${session.user.id}` : null, (url) =>
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				if (res.data) {
					form.setValue('id', res.data[0].id);
					// form.setValue('name', res.data[0].name);
					// form.setValue('email', res.data[0].email);
					// form.setValue('phone', res.data[0].phone);
					// form.setValue('description', res.data[0].description);
					// form.setValue('address', res.data[0].address);
					emailRef.current = res.data[0].email;
				}
				return res.data;
			})
	);

	const submitDisabled = useMemo(() => loading || isLoading || !data, [isLoading, data, loading]);

	useEffect(() => {
		const subscription = watch(() => trigger());
		return () => subscription.unsubscribe();
	}, [watch, trigger]);

	const handleSubmit = (data: Schema) => {
		setLoading(true);
	};

	return (
		<Form
			onSubmit={(event) => {
				event.preventDefault();
				handleSubmit(form.getValues());
				form.handleSubmit((values) => handleSubmit(values));
			}}
		>
			{isLoading && <div className='d-flex justify-content-center'>{isLoading && <Spinner variant='primary' animation='border' />}</div>}
			<Form.Group className='mb-3 mt-3'>
				<Container fluid>
					<Row className='g-3'>
						{/* <Col xs={12} md={6}>
							<Form.Label>Full name</Form.Label>
							<Form.Control
								isInvalid={!!errors.name?.message}
								disabled={submitDisabled}
								className={`py-3 border-primary border-primary`}
								placeholder="Full name"
								{...form.register('name')}
							/>
							{errors.name?.message && (
								<Form.Text as="small" className="text-danger">
									{errors.name.message}
								</Form.Text>
							)}
						</Col>
						<Col xs={12} md={6}>
							<Form.Label>Phone number</Form.Label>
							<Form.Control isInvalid={!!errors.phone?.message} disabled={submitDisabled} className={`py-3 border-primary`} placeholder="Phone number" {...form.register('phone')} />
							{errors.phone?.message && (
								<Form.Text as="small" className="text-danger">
									{errors.phone.message}
								</Form.Text>
							)}
						</Col>
						<Col xs={12} md={6}>
							<Form.Label>Address</Form.Label>
							<Form.Control isInvalid={!!errors.address?.message} disabled={submitDisabled} className={`py-3 border-primary`} placeholder="Address" {...form.register('address')} />
							{errors.address?.message && (
								<Form.Text as="small" className="text-danger">
									{errors.address.message}
								</Form.Text>
							)}
						</Col>
						<Col xs={12} md={6}>
							<Form.Label>E-mail</Form.Label>
							<Form.Control isInvalid={!!errors.email?.message} disabled={submitDisabled} className={`py-3 border-primary`} placeholder="E-mail" {...form.register('email')} />
							{errors.email?.message && (
								<Form.Text as="small" className="text-danger">
									{errors.email.message}
								</Form.Text>
							)}
						</Col>
						<Col xs={12}>
							<Form.Label>Bio</Form.Label>
							<Form.Control
								as="textarea"
								isInvalid={!!errors.description?.message}
								disabled={submitDisabled}
								className={`py-3 border-primary`}
								placeholder="Bio"
								{...form.register('description')}
							/>
							{errors.description?.message && (
								<Form.Text as="small" className="text-danger">
									{errors.description.message}
								</Form.Text>
							)}
						</Col> */}
						<Col xs={12}>
							<Button type='submit' disabled={submitDisabled} className='btn btn-primary btn-lg py-3'>
								{!loading ? 'Save' : <Spinner as='span' animation='border' role='status' aria-hidden='true' />}
							</Button>
						</Col>
					</Row>
				</Container>
			</Form.Group>
		</Form>
	);
}
