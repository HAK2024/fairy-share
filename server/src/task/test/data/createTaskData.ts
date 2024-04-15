const invalidCreateTaskFields = [
  // Title tests
  {
    title: '',
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 101,
    houseId: 106,
  },
  {
    title: undefined,
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 101,
    houseId: 106,
  },
  {
    title: 'a'.repeat(51),
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 101,
    houseId: 106,
  },

  // Date tests
  {
    title: 'Valid Title',
    date: '',
    note: 'Valid Note',
    assigneeId: 101,
    houseId: 106,
  },

  {
    title: 'Valid Title',
    date: undefined,
    note: 'Valid Note',
    assigneeId: 101,
    houseId: 106,
  },
  {
    title: 'Valid Title',
    date: 'invalid-date',
    note: 'Valid Note',
    assigneeId: 101,
    houseId: 106,
  },

  // Note tests
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 1,
    assigneeId: 101,
    houseId: 106,
  },
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 'a'.repeat(201),
    assigneeId: 101,
    houseId: 106,
  },

  // AssigneeId tests
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: '',
    houseId: 106,
  },
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: undefined,
    houseId: 106,
  },
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 'not-a-number',
    houseId: 106,
  },

  // houseId tests
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 106,
    houseId: '',
  },
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 106,
    houseId: undefined,
  },
  {
    title: 'Valid Title',
    date: '2024-03-18T12:00:00.000Z',
    note: 'Valid Note',
    assigneeId: 106,
    houseId: 'not-a-number',
  },
];

const validCreateTaskField = {
  title: 'Valid Title',
  date: '2024-03-18T12:00:00.000Z',
  note: 'Valid Note',
  assigneeId: 101,
  houseId: 106,
};

export { invalidCreateTaskFields, validCreateTaskField };
