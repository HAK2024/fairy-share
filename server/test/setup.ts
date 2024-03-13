import { execSync } from 'child_process';

module.exports = async () => {
  execSync('npm run prisma:generate-test', { stdio: 'inherit' });
};
