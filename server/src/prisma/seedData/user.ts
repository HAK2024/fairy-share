import { IconColor } from '@prisma/client';

import { hash } from 'bcrypt';

export const userData = async () => [
  {
    id: 101,
    name: 'Alice',
    email: 'alice@example.com',
    hashedPassword: await hash('password', 10),
    icon: IconColor.RED,
  },
  {
    id: 102,
    name: 'Bob',
    email: 'bob@example.com',
    hashedPassword: await hash('password', 10),
    icon: IconColor.BLUE,
  },
  {
    id: 103,
    name: 'Charlie',
    email: 'charlie@example.com',
    hashedPassword: await hash('password', 10),
    icon: IconColor.GREEN,
  },
  {
    id: 104,
    name: 'Diana',
    email: 'diana@example.com',
    hashedPassword: await hash('password', 10),
    icon: IconColor.INDIGO,
  },
  {
    id: 105,
    name: 'Evan',
    email: 'evan@example.com',
    hashedPassword: await hash('password', 10),
    icon: IconColor.VIOLET,
  },
];
