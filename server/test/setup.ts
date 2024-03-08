import { execSync } from 'child_process';

// Reset data and seed data before testing
module.exports = async () => {
  execSync('npm run prisma:reset-test', { stdio: 'inherit' });
  execSync('npm run prisma:seed-test', { stdio: 'inherit' });
};
