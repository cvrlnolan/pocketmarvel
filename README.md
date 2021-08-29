# PocketMarvel

A NextJS Application using Marvel Comics' REST API to display data about characters, comics and series.
Live demo available at: https://pocketmarvel-cvrlnolan.vercel.app

## Description

This application uses a fully documented API endpoint from which it fetches data about popular Marvel Comic Heros, Vilains and their related comics and shows. It can be extended to get more data like the events and stories of the Marvel Comics Universe.

## Installation

1. To get this project files locally on your machine, you can clone this repository by running the following command on your terminal or command line:

```bash
git clone https://github.com/cvrlnolan/pocketmarvel
```

2. Next, you need to setup the `.env` file found in the root with the appropriate API Keys & credentials from the following service provider:

- [Marvel Comics API Gateway](https://developer.marvel.com)

3. Install all the dependency packages found in the `package.json` file by running `yarn install` or `npm install` from the project root directory.

4. To start the development server of the application, run `npm run dev` or `yarn dev`. This should log some start-up application information & display the development server url: `http://localhost:3000`. Visit http://localhost:3000 to view your application.

## Usage

### General

This application was built reflecting the MVC architecture and the main dependencies(all found in the `package.json`) of the application are organised as so:

- Front-end User Interface(UI): [Chakra UI](https://chakra-ui.com/)
- Backend Integration: [NextJS API](https://nextjs.org/docs/api-routes/introduction) (basically [NodeJS](https://nodejs.org/))
- REST API Data Endpoint: [Marvel Comic API](https://developer.marvel.com)

Other important services & dependency libraries of the application include:

- [axios](https://www.npmjs.com/package/axios): An http client to fetch urls and make api calls or requests within the application.
- [swr](https://swr.vercel.app/): To fetch and revalidate data on the client-side of the application while keeping the UI reactive.
- [md5](https://www.npmjs.com/package/md5): Message-digest-algorithm dependency to create a hash from a comibination of API credentials to perform requests to the [Marvel Comic API](https://developer.marvel.com/account)

### Directives

The application is organized from the root(`.`) as follows:

- `./page/` folder(integrated by NextJS) contains the UI Views for the application with the exception of the `./page/api/\*` sub-folder.
- `./page/api` sub-folder(integrated by NextJS) contains serverless and NodeJS backend code for the application. All of the request to the Marvel Comic API endpoint are found in this subfolder.
- `./components/` folder contains coded UI layouts to be used through out the application.
- `./styles/` folder(integrated by NextJS) contains the global style of the application accessible by all components.
- `./public/` folder(integrated by NextJS) contains global files to be shared through the application. You can store static images here.

Absolute imports to any of these folders through the application are configured in the `jsconfig.json` file in the root.

The application's code source contains inline comments which will provide further help and guidance on how an important piece of module or component works. The code quality was tested with [JSLint](https://www.jslint.com/)

### Deployment

You may eventually want to deploy a live customized version of your app in a future instance. [Vercel](https://vercel.com/) platform is suitably built fo the deployment of NextJS application and more as they have an integrated environment to deploy directly from your own [Github Repository](https://github.com/new).

## Support

If any worries, bugs or problem arises in the future, you can create an issue, contribute or contact me via:

- [carlnolan@lootyclub.com](mailto:carlnolan@lootyclub.com)

## Roadmap

No planned schedule for this project. But might do some random functionality updates with time.

## License

![GitHub](https://img.shields.io/github/license/cvrlnolan/pocketmarvel)

###

![GitHub last commit](https://img.shields.io/github/last-commit/cvrlnolan/pocketmarvel) ![GitHub contributors](https://img.shields.io/github/contributors/cvrlnolan/pocketmarvel) ![GitHub issues](https://img.shields.io/github/issues/cvrlnolan/pocketmarvel) ![GitHub repo size](https://img.shields.io/github/repo-size/cvrlnolan/pocketmarvel)

![GitHub followers](https://img.shields.io/github/followers/cvrlnolan?style=social) ![Twitter Follow](https://img.shields.io/twitter/follow/realcarlnolan?style=social)
