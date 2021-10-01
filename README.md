# Kickstart

Use Kickstart so you don't have to remember the names of your scripts!

# Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Description

When you're working on an application with others you might have noticed that often different script names are used for the most common tasks. Where one might use `npm start` for starting the development mode of an application, someone else is using that command for starting the production build. Especially when you're working on more than one application you might have a hard time remembering all the right commands.

Luckily, there's Kickstart to the rescue! 🚀

Kickstart will read all the scripts that are configured in the `package.json`. Then it will present them in a list, all preceded with a number. Press the number of the script you'd like to start and Kickstart will take care of that.

## Installation

Kickstart can be installed in two simple steps:

1. Install Kickstart as `devDependency`,
   - with NPM: `npm install --save-dev @humanoids/kickstart`,
   - or With Yarn: `yarn add --dev @humanoids/kickstart`.
2. Open your `package.json` and configure the start script:
   ```json
   ...
   "scripts": {
     "start": "kickstart",
     ...
   },
   ...
   ```

## Usage

Execute `npm start`, that's all!

## Contributing

Do you want to contribute to Kickstart? It might seem a bit hard to get a development environment up and running for an executable, so let's get you started!

1. Check out the Kickstart repository: `git@github.com:humanoidsbv/kickstart.git`.
2. Install Kickstart's development dependencies,
   - with NPM: `npm install`,
   - or With Yarn: `yarn install`.
3. Run an initial build,
   - with NPM: `npm run build`,
   - or With Yarn: `yarn build`.
4. Make the package available for linking,
   - with NPM: `npm link`,
   - or With Yarn: `yarn link`.
5. Use your terminal to navigate to the project you're using or you'd like to use Kickstart in.
6. If you're already using Kickstart:
   - remove `node_modules/.bin/kickstart`;
   - remove `node_modules/@humanoids/kickstart/`.
7. Link the development version of Kickstart:
   - with NPM: `npm link @humanoids/kickstart`,
   - or With Yarn: `yarn link @humanoids/kickstart`.
8. Start the compiler that watches for changes automatically:
   - with NPM: `npm start`,
   - or With Yarn: `yarn start`.
9. Finally, run `kickstart` from your own project after each change.

Done adding a new feature, improvement or bug fix? We'd be happy to get a Pull Request!

## Credits

Created with ♥ by [Humanoids](https://humanoids.nl)
