# GoogleClassroomApiTest

# Localhost

## Setting up environment

Create a project on https://console.developers.google.com and enable google classroom api. 
Then setup consent screen. 
Then create credentials>OAuth client ID. Provide Javascript Origin as `http://localhost:3000` and redirect_uris as `http://localhost:3000/home`.

After creating credentials, download credentials file and rename the file to "credentials.json" and place it into "project folder/server/config".

## Run Application
Run `ng build`
Run `npm start` and navigate to `http://localhost:3000`




# Deployment on other hosting domain

## Setting up environment
Create a project on https://console.developers.google.com and enable google classroom api. 
Then setup consent screen. 
Then create credentials>OAuth client ID. Provide Javascript Origin as `your-hosting-domain-url` and redirect_uris as `your-hosting-domain-url/home`.

After creating credentials, download credentials file and rename the file to "credentials.json" and place it into "project folder/server/config"

## Changes to some files

## app.component.ts
Change SERVER_HOST and SERVER_HOST_WS from `http://localhost:3000` to `your-hosting-domain-url`

## package.json
## scripts
start: `node ./server/bin/www.js`
postinstall: `ng build --aot --prod`

## dependencies
Copy following from devDependencies to dependencies
@angular/cli
@angular/compiler-cli
typescript

## engines
Put following
node: `installed version`
npm: `installed version`
