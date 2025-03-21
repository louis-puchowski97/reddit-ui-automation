import fs from 'fs';

export default async function globalTeardown() {
  const authFilePath = 'tests/auth/auth.json';

  if (fs.existsSync(authFilePath)) {
    fs.writeFileSync(authFilePath, '{}'); // Overwrites the file with an empty JSON object
    console.log('Cleared auth.json after tests.');
  }
}