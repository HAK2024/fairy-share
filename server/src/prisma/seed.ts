import { PrismaClient } from '@prisma/client';
import {
  expenseData,
  houseData,
  paymentData,
  ruleData,
  taskData,
  userData,
  userHouseData,
} from './seedData';

const prisma = new PrismaClient();

async function main() {
  const usersData = await userData();
  for (const user of usersData) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }
  console.log('Users have been added successfully.');

  const housesData = await houseData();
  for (const house of housesData) {
    await prisma.house.upsert({
      where: { id: house.id },
      update: {},
      create: house,
    });
  }
  console.log('Houses have been added successfully.');

  const userHousesData = await userHouseData();
  for (const userHouse of userHousesData) {
    const existingUserHouse = await prisma.userHouse.findFirst({
      where: {
        userId: userHouse.userId,
        houseId: userHouse.houseId,
      },
    });

    if (!existingUserHouse) {
      await prisma.userHouse.create({
        data: userHouse,
      });
    }
  }
  console.log('UserHouses have been added successfully.');

  const rulesData = await ruleData();
  for (const rule of rulesData) {
    await prisma.rule.upsert({
      where: { id: rule.id },
      update: {},
      create: rule,
    });
  }
  console.log('Rules have been added successfully.');

  const tasksData = await taskData();
  for (const task of tasksData) {
    await prisma.task.upsert({
      where: { id: task.id },
      update: {},
      create: task,
    });
  }
  console.log('Tasks have been added successfully.');

  const expensesData = await expenseData();
  for (const expense of expensesData) {
    await prisma.expense.upsert({
      where: { id: expense.id },
      update: {},
      create: expense,
    });
  }
  console.log('Expenses have been added successfully.');

  const paymentsData = await paymentData();
  for (const payment of paymentsData) {
    await prisma.payment.upsert({
      where: { id: payment.id },
      update: {},
      create: payment,
    });
  }
  console.log('Payments have been added successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
