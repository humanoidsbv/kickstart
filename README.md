# Kickstart

Use Kickstart so you don't have to remember the names of your scripts!

# Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)

## Description

When you're working on a project with multiple people you might've noticed that everyone is using different script names for the most common tasks. Where one might use `npm start` for starting the development mode of an application, someone else is using that command for starting the production build. Especially when you're working on more than one application you might have a hard time remembering all the right commands.

Luckily, there's Kickstart to the rescue! 🚀

Kickstart will read all the scripts that are configured in the `package.json`. Then it will present them in a list, all preceded with a number. Press the number of the script you'd like to start and Kickstart will take care of that.

## Installation

Kickstart can be installed in two simple steps:

1. Install Kickstart as `devDependency`,
   - with NPM: `npm install --save-dev @humanoids/kickstart`
   - or With Yarn: `yarn add --dev @humanoids/kickstart`
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

## Credits

Created with ♥ by [Humanoids](https://humanoids.nl)
