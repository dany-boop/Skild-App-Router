'use client'
import ProfileForm from '@/components/modular/profiles/forms';
import JobsForm from '@/components/modular/jobs/forms/add';
import QueryForm from '@/components/modular/search/forms';
export default function Main() {
	return (
		<>
			{/* <ProfileForm /> */}
			{/* <JobsForm /> */}
			<QueryForm onSubmit={() => {}} roles='contractor'/>
		</>
	);
}
