const invalidUpdateTaskFields = [
  // Title tests
  {
    title: '',
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 101,
  },
  {
    title: undefined,
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 101,
  },
  {
    title: 'a'.repeat(51),
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 101,
  },

  // Date tests
  { title: 'Valid Title', date: '', note: 'Valid Note', assigneeId: 101 },
  {
    title: 'Valid Title',
    date: undefined,
    note: 'Valid Note',
    assigneeId: 101,
  },
  {
    title: 'Valid Title',
    date: 'invalid-date',
    note: 'Valid Note',
    assigneeId: 101,
  },

  // Note tests
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 1,
    assigneeId: 101,
  },
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 'a'.repeat(201),
    assigneeId: 101,
  },

  // AssigneeId tests
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: '',
  },
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: undefined,
  },
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 'not-a-number',
  },
];

const validUpdateTaskField = {
  title: 'Valid Title',
  date: '2024-03-18T12:00:00.000Z',
  note: 'Valid Note',
  assigneeId: 101,
};

export { invalidUpdateTaskFields, validUpdateTaskField };
