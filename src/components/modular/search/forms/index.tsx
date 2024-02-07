'use client';

// import { Button } from '@/components/core/Button';
import { useEffect, useState, useMemo, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, InputGroup, Button, Spinner } from 'react-bootstrap';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import Link from '@/hooks/navigation/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { useRouter } from '@/hooks/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { TbSearch } from 'react-icons/tb';
import { useSession } from '@/hooks/session';
import useSWR from 'swr';

const schema = z.object({
	query: z.string(),
});

type Schema = z.infer<typeof schema>;

export default function Main({ onSubmit, roles }: { onSubmit: (query: string) => void; roles: 'contractor' | 'tradesperson' | 'admin' }) {
	const [visible, setVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	const paramQuery = searchParams.get('q') ?? undefined;

	const searchPlaceholders = roles === 'contractor' ? 'Search Tradesperson' : roles === 'tradesperson' ? 'Search Jobs' : 'Search';

	const {
		watch,
		trigger,
		formState: { errors, isValid },
		...form
	} = useForm<Schema>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			query: paramQuery,
			// roles: pathname.includes('admin')
			//   ? 'admin'
			//   : pathname.includes('business')
			//   ? 'contractor'
			//   : 'tradesperson',
		},
	});

	const { data, isLoading } = useSWR('/api/v1/jobs');

	const submitDisabled = useMemo(() => loading || !!errors.query?.message, [errors, loading]);

	useEffect(() => {
		const subscription = watch(() => trigger());
		return () => subscription.unsubscribe();
	}, [watch, trigger]);

	const handleSubmit: SubmitHandler<Schema> = async (data) => {
		if (!pathname.includes('/search')) {
			router.push(`/search?q=${data.query}`);
		} else {
			onSubmit(data.query);
		}
	};

	const role = useSession();

// useEffect(()=>{
// 	if[pathname.includes(/dashboard/contractor)]
// })

	useEffect(() => {
		if (pathname.includes('/search') && !!form.getValues('query')) onSubmit(form.getValues('query'));
	}, [form, onSubmit, pathname]);
	//   const mounted = useRef(false);

	//   useEffect(() => {
	//     mounted.current = true;
	//   }, []);

	return (
		<>
			<Form
				onSubmit={(event) => {
					event.preventDefault();
					handleSubmit(form.getValues());
					form.handleSubmit((values) => handleSubmit(values));
				}}
			>
				<div className="row mb-4 ">
					<div className="col-lg-9 position-relative  ">
						<Form.Group>
							<TbSearch
								style={{
									top: '50%',
									right: '1.3rem',
									transform: 'translateY(-50%)',
									cursor: 'pointer',
									position: 'absolute',
								}}
								color="#1E1E1E"
								size="2rem"
							/>
							<Form.Control isInvalid={!!errors.query?.message} className={`py-3 px-3 border-2 border-primary text-black`} placeholder={searchPlaceholders} {...form.register('query')} />
							{errors.query?.message && (
								<Form.Text as="small" className="text-danger">
									{errors.query.message}
								</Form.Text>
							)}
						</Form.Group>
					</div>
					<div className="col-3">
						<Button type="submit" disabled={submitDisabled} className="w-100 bg-primary text-white px-lg-5 py-lg-3 shadow">
							{!loading ? 'Search' : <Spinner as="span" animation="border" role="status" aria-hidden="true" />}
						</Button>
					</div>
				</div>
			</Form>
		</>
	);
}
