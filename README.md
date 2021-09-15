# MASTERMIND

# How to use like a develoment
1) Run 'npm install' command to install all necessary packages
2) To run the game choose one of the options:

* `npm run build:dev` - *to build your website in the development mode*
* `npm run build:prod` - *to build your website in the production mode (with minified CSS and JS)*
* `npm run start:dev` - *to run your website on the localhost using webpack dev server in the development mode*
* `npm run start:prod` - *to run your website on the localhost using webpack dev server in the production mode (with minified CSS and JS)*

4) This project is pre-configured to deploy to the firebase hosting (which is free). To be able to do this, create new project using [firebase console](https://console.firebase.google.com/) and then:
* install firebase cli using `npm install -g firebase-tools` command
* inicialize your new project using `firebase init` command (when asked pick hosting and set '**dist**' as a public directory)

5) To build and deploy your website to the newly created firebase hosting simply run command `npm run deploy`
