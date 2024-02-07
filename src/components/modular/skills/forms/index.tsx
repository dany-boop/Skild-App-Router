'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form } from 'react-bootstrap';
import { useSession } from '@/hooks/session';

const schema = z.object({
	id: z.string(),
	name: z.string().min(1, { message: 'Name must not be empty' }).nullable(),
});

type Schema = z.infer<typeof schema>;

export default function Main() {
	const [loading, setLoading] = useState<boolean>(false);
	const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

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
			name: '',
		},
	});

	useEffect(() => {
		const subscription = watch(() => trigger());
		return () => subscription.unsubscribe();
	}, [watch, trigger]);

	useEffect(() => {
		form.reset();
		setSubmitSuccess(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitSuccess]);
	const handleSubmit = (data: Schema) => {
		setLoading(true);
		if (session) {
			fetch('/api/v1/skills', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			}).then((res) => {
				if (res.ok) {
					alert('Job has been successfully created!');
					setSubmitSuccess(true);
				} else {
					alert('Job failed to be added');
				}
				setLoading(false);
			});
		} else {
			alert('Please login before posting a job');
		}
	};
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				handleSubmit(form.getValues());
				form.handleSubmit((values) => handleSubmit(values));
			}}
		>
			<Form.Group>
				<label></label>
			</Form.Group>
		</form>
	);
}
