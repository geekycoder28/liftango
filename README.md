# Liftango Full Stack Project

This is an example project for you to fill in that loosely resembles our tech-stack.

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

### Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Express application.

## Quick Start

```bash
# Requires node 14
nvm install 14 && nvm use

# Install dependencies
yarn

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Documentation

### Folder Structure

All the source code will be inside **src** directory. Inside src, there is client and server directory. All the frontend code (react, css, js and any other assets) will be in client directory. Backend Node.js/Express code will be in the server directory.

## Requirements

### Maximum Time Allocation

3 hours

### Submission

- Submit a github/bitbucket repository
- Ensure that all the files have been run through prettier

### Server

Define the models and relationships for a list of rides using [Sequelize ORM](https://sequelize.org/master/). Ensure this data is seeded in [seed.mjs](./src/database/seeds/seed.mjs) using [faker.js](https://github.com/Marak/Faker.js). Examples have been provided to get you started.

Once your relationships are defined and seeded; make the `getTrips` endpoint return all seeded trips and add a new endpoint for returning a single trip by it's ID.

### Client

- Do not install any additional packages
- Display a list of buttons with each date that a trip is present.
- Have a title that displays the selected date and the number of trips on that day.
- Update the document title to display `{{SELECTED_DATE}} ({{NUM_RIDES}})`
- When you click on one of the date buttons; only render the trips that fall on the selected day, on the map.
- Ensure that the map is always bounded by the markers present on the map
- Recreate the below map marker using styled-components. Ensure it is a different colour depending on if the marker is for the `arrival` or `departure` stop. Render the first character of the `stop.type` in the marker head.

![marker](./src/images/pin.png)
