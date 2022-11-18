import base64 from 'base-64';
import path from 'path';
import fs from 'fs';

const SECRET_TOKEN = 'IRONMAN-POWERFUL';

const generateToken = () => {
    const encoded = base64.encode(SECRET_TOKEN);

    // Store it to the token DB
    const resolvedPath = path.resolve('./dist/tools/token.txt');
    fs.writeFileSync(resolvedPath, SECRET_TOKEN);

    console.log(`YOUR AUTHORIZATION TOKEN: ${encoded}`);
    console.log(`YOUR TOKEN CAN BE ACCESS HERE: ${resolvedPath}`);
}

generateToken();