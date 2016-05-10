We're going to create a blackjack game using React.js and Redux.

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

We'll also need the `react-dom` package.

[comment]: <> (Needs description of react-dom)

```bash
npm install --save react-dom
```

## Webpack and Babel

We are going to use `webpack` to compile all of our dependencies into a single `.js` file.

[comment]: <> (Needs more details about what webpack is)

Let's install `webpack`. `webpack` is only used to prepare our application for production, so we won't need it once we're actually in production. Let's install it as a development dependency:

```bash
npm install --save-dev webpack
```

Now we need to find the binary created by `npm`. On my system (a Cloud9 workspace), it is in the `node_modules/.bin/` directory. To run `webpack`, use `node_modules/.bin/webpack`.

<aside>Other tutorials and guides may install `webpack` globally using the `-g` flag. This allows `webpack` to be run with `webpack` rather than `node_modules/.bin/webpack` on the command line. We prefer not to use global packages where possible to avoid dependency issues.</aside>

We also will need `babel` in order to use ES6. Specifically, we want `webpack` to run `babel` which will "transpile" our ES6 to a version of JavaScript supported by browsers.

The first step is to install the necessary `babel` packages as development dependencies:

```bash
npm install --save-dev  babel-loader babel-core babel-preset-es2015 babel-preset-react
```

Now let's create a `webpack` config file to tell it which files to read and write. Our config file will also tell `webpack` to use Babel.

```js
// webpack.config.js

const path = require('path');

module.exports = {
    entry: "./app/index.js",
    output: {
        path: path.join(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
};
```

## A First Build

Let's do the first build of our application. We're going to need a few more directories and files.

First, let's make an HTML file that will serve our application:

```html
<!-- build/index.html -->

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>React Blackjack</title>
    </head>
    <body>
        <div id="app"></div>

        <script src="./bundle.js"></script>
    </body>
</html>
```

Now, let's make a JavaScript file that inserts our component into the document.

```js
// app/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
```

Finally, we need the code for our component:

```js
// app/components/app.js

import React from 'react';

export default class App extends React.Component {
    render() {
        return (
            <h1>Hello, world!</h1>
        );
    }
};
```

Now if we run `node_modules/.bin/webpack`, we should see a `bundle.js` file created in the `build/` directory. If we view the `build/index.html` page in a browser, we should see "Hello, world!".