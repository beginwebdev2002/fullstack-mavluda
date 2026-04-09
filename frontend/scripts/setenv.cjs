const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const envConfigFile = `export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  apiUrl: "${process.env.FRONTEND_URL || 'http://localhost:3000'}",
  telegramBotName: "${process.env.TELEGRAM_BOT_NAME || 'test_bot'}",
};
`;

const targetPath = path.resolve(__dirname, '../src/environments/environment.ts');
const targetProdPath = path.resolve(__dirname, '../src/environments/environment.prod.ts');

fs.writeFileSync(targetPath, envConfigFile);
fs.writeFileSync(targetProdPath, envConfigFile);
console.log(`Environment files generated at ${targetPath}`);
