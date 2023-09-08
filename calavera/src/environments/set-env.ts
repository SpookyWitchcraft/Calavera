const setEnv = () => {
    const fs = require('fs');
    const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
    const targetPath = './src/environments/environment.ts';
    require('dotenv').config({
      path: 'src/environments/.env'
    });
  // `environment.ts` file structure
    const envConfigFile = `export const environment = {
    slimerUrl: '${process.env["SLIMER_URL"]}',
    auth0Domain: '${process.env["AUTH0_DOMAIN"]}',
    auth0ClientId: '${process.env["AUTH0_CLIENT_ID"]}',
    auth0Audience: '${process.env["AUTH0_AUDIENCE"]}',
    auth0CallbackUrl: '${process.env["AUTH0_CALLBACK_URL"]}',
    auth0ServerUrl: '${process.env["API_SERVER_URL"]}',
    production: true,
  };
  `;
    console.log('The file `environment.ts` will be written with the following content: \n');
    console.log(envConfigFile);
    writeFile(targetPath, envConfigFile, (err: any) => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
      }
    });
  };
  
  setEnv();