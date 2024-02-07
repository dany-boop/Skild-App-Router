import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

export const getSession = async () => {
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session;
};
