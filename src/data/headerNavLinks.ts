// 'use client';
export const headerNavLinks = [
  { title: 'Dashboard', path: '/dashboard' },
  {
    title: 'Job Owners',
    dropdown: [
      { title: 'Job Owners List', path: '/job-owners/job-owners-list' },
      { title: 'Contractor Types', path: '/job-owners/contractor-types' },
    ],
  },
  {
    title: 'Tradepersons',
    dropdown: [
      { title: 'Tradepersons List', path: '/tradepersons/tradepersons-list' },
      { title: 'Skills', path: '/tradepersons/skills' },
    ],
  },
  {
    title: 'Project',
    dropdown: [
      { title: 'Projects List', path: '/projects/projects-list' },
      { title: 'Calendars', path: '/projects/calendars' },
      { title: 'Project Types', path: '/projects/project-types' },
      { title: 'Project Categories', path: '/projects/categories' },
    ],
  },
  {
    title: 'Billings',
    dropdown: [
      { title: 'Invoice List', path: '/billings/invoice-list' },
      { title: 'Payment List', path: '/billings/payment-list' },
    ],
  },
  {
    title: 'Users',
    dropdown: [
      { title: 'Users List', path: '/users/users-list' },
      { title: 'User Role', path: '/users/user-role' },
    ],
  },
];
