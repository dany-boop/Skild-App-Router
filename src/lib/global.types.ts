import { ReactNode } from 'react';
import { Database } from './database.types';

export type ContractorTypes = Database['public']['Tables']['contractortypes']['Row'];
export type JobApplications = Database['public']['Tables']['jobapplications']['Row'];
export type JobCategories = Database['public']['Tables']['jobcategories']['Row'];
export type JobContracts = Database['public']['Tables']['jobcontracts']['Row'];
export type JobInvoiceItems = Database['public']['Tables']['jobinvoiceitems']['Row'];
export type JobInvoices = Database['public']['Tables']['jobinvoices']['Row'];
export type JobReviews = Database['public']['Tables']['jobreviews']['Row'];
export type Jobs = Database['public']['Tables']['jobs']['Row'];
export type JobsLogs = Database['public']['Tables']['jobslogs']['Row'];
export type JobTypes = Database['public']['Tables']['jobtypes']['Row'];
export type Payments = Database['public']['Tables']['payments']['Row'];
export type Profiles = Database['public']['Tables']['profiles']['Row'];
export type Roles = Database['public']['Tables']['roles']['Row'];
export type Skills = Database['public']['Tables']['skills']['Row'];
export type TradesSkills = Database['public']['Tables']['tradesskills']['Row'];

export type ProfilesMaster = Profiles & {
	roles: Roles;
	contractortypes: ContractorTypes;
};
export type TradesSkillsMaster = TradesSkills & {
	skills: Skills;
	profiles: ProfilesMaster;
	roles: Roles;
};
export type JobsMaster = Jobs & {
	jobcategories: JobCategories;
	jobtypes: JobTypes;
	profiles: Profiles;
};

export type JobCategoriesMaster = JobCategories & { jobcategories: JobCategories };
export type JobApplicationsMaster = JobApplications & { jobs: JobsMaster };

export type Props = { children: ReactNode };
