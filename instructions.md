We're going to implement a blackjack game using React.js and Redux.

# Setting up the project

To start, create a directory. I called mine `react_blackjack`.

Use `cd` to navigate to the directory

```bash
cd react_blackjack
```

We are going to use `npm` for this project. [NPM](https://www.npmjs.com/) is a package manager for JavaScript (js) packages.

To initialize a new project using `npm`, we run the command `npm init`. This program will ask us a series of questions, and then create a `package.json` file based on our answers. You can use the default answers to the questions by pressing enter. If you don't like the default answer, feel free to type your own before pressing enter.

01_npm_init.png

You should now see a file called `package.json` in your `react_blackjack` directory. This file will keep track of the packages our project depends on (similar to a `Gemfile` in Ruby) as well as provide basic information about our project, such as the name, description, and git repository.

# Setting up our Environment

## Installing NPM and React

To install packages using `npm`, we use commands that look like this:

```bash
npm install --save package_name
```

By default, this will lookup a package named `package_name`, download `package_name` to the `node_modules` directory, and add the dependency and its version number to our `package.json` file.

We can specify in our `package.json` file that we only need a certain package (such as a testing library) in development environments by using `--save-dev` instead of `--save` when we install that package.

Let's see what happens when we install `react`. We will need the react library in both the development and production environment, so we use `--save`.

```bash
npm install --save react
```

This downloaded the `react` library (and the libraries it depends on) into the `node_modules` directory and added the following lines to the `package.json` file:

```js
"dependencies": {
    "react": "^15.0.2"
  }
```

If you were to move your code to another computer (or directory) and ran `npm install`, `npm` would install all the dependencies in your `package.json` file (in our case, just `react`). The caret (`^`) before the version number tells `npm` to install the latest version of `react` that is less than `16.0.0`.

## Webpack

We are going to use `webpack` to compile all of our dependencies into a single `.js` file.

[comment]: <> (Needs more details about what webpack is)

Let's install `webpack`. `webpack` is only used to prepare our application for production, so we won't need it once we're actually in production. Let's install it as a development dependency:

```bash
npm install --save-dev webpack
```


