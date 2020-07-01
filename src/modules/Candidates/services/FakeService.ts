//TODO: ICandidate needs to be deleted from the whole app before production.
import { ICandidate } from '../typings';

const mockData: Array<ICandidate> = [
  {
    id: 1,
    recruiters: [
      { name: 'RodPech', role: 'recruiter' },
      { name: 'Darcy', role: 'recruiter' },
    ],
    firstName: 'Aldo',
    lastName: 'Lopez',
    positions: ['SR React', 'Angular developer'],
    status: 'waiting for manager approval',
    stage: 'prospective',
    email: 'aldo@test.com',
    phone: '9998273615',
    website: 'http://www.github.com/aldoLopez',
    jobTitle: 'software engineer',
    created: new Date('Sun, 20 Jan 2019 17:39:24 GMT'),
    employer: 'KSquare',
  },
  {
    id: 2,
    recruiters: [
      { name: 'RodPech', role: 'recruiter' },
      { name: 'Fernanda', role: 'recruiter' },
      { name: 'Darcy', role: 'recruiter' },
    ],
    firstName: 'Alfredo',
    lastName: 'Adame',
    positions: ['Java develop', 'Sr PHP'],
    status: 'active',
    stage: 'active',
    email: 'alfredo@test.com',
    phone: '9999572849',
    website: 'http://www.github.com/alfredoAdame',
    jobTitle: 'software engineer',
    created: new Date('Sun, 20 Jan 2019 17:39:24 GMT'),
    employer: 'KSquare',
  },
  {
    id: 3,
    recruiters: [
      { name: 'Mikel', role: 'recruiter' },
      { name: 'Fernanda', role: 'recruiter' },
      { name: 'Darcy', role: 'recruiter' },
    ],
    firstName: 'Jesus',
    lastName: 'Christ',
    positions: ['Javascript trainee'],
    status: 'rejected',
    stage: 'rejected',
    email: 'jesus@test.com',
    phone: '9993927495',
    website: 'http://www.github.com/jesusChrist',
    jobTitle: 'software engineer',
    created: new Date('Sun, 20 Jan 2019 17:39:24 GMT'),
    employer: 'KSquare',
  },
  {
    id: 4,
    recruiters: [
      { name: 'Mikel', role: 'recruiter' },
      { name: 'Fernanda', role: 'recruiter' },
      { name: 'Darcy', role: 'recruiter' },
      { name: 'RodPech', role: 'recruiter' },
    ],
    firstName: 'Javier',
    lastName: 'Lopez',
    positions: ['Javascript architect', 'SR Angular', 'SR React'],
    status: 'active',
    stage: 'active',
    email: 'javier@test.com',
    phone: '9991836273',
    website: 'http://www.github.com/javierLopez',
    jobTitle: 'software engineer',
    created: new Date('Sun, 20 Jan 2019 17:39:24 GMT'),
    employer: 'KSquare',
  },
  {
    id: 5,
    recruiters: [
      { name: 'Mikel', role: 'recruiter' },
      { name: 'Fernanda', role: 'recruiter' },
      { name: 'Darcy', role: 'recruiter' },
      { name: 'RodPech', role: 'recruiter' },
    ],
    firstName: 'Julio',
    lastName: 'Cesar',
    positions: ['Full stack developer', 'Security '],
    status: 'active',
    stage: 'prospective',
    email: 'julio@test.com',
    phone: '9992948571',
    website: 'http://www.github.com/julioCesar',
    jobTitle: 'software engineer',
    created: new Date('Sun, 20 Jan 2019 17:39:24 GMT'),
    employer: 'KSquare',
  },
];

const candidateService = (id: number) => {
  const candidateData = mockData.filter(candidate => {
    return candidate.id === id;
  });
  return candidateData[0];
};

export default candidateService;
