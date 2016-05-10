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

<aside style="background-color:lightblue; margin-bottom: 16px;">Other tutorials and guides may install `webpack` globally using the `-g` flag. This allows `webpack` to be run with `webpack` rather than `node_modules/.bin/webpack` on the command line. We prefer not to use global packages where possible to avoid dependency issues.</aside>

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

```jsx
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

```jsx
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

## Talking Through the First Build

The `index.html` file is a pretty typical HTML file. It does not contain any `script` tags in the header, but it does have a `script` tag in the `body`. The `body` also has a single `div`. The `div` is empty to start with, but it is where `bundle.js` will load its components. The `bundle.js` script is the result of the `webpack` compilation of our programs and all of their dependencies. This means we don't need to include separate `script` tags for each of our dependencies (react, react-dom, etc.).

The `index.js` file finds the `div` with an `id` of `app` and renders `<App />` into in using the `ReactDOM.render` method. This is the first time we're seeing JSX in action. JSX is an extenion to JavaScript that allows us to use things that look like HTML or XML elements in code without turning them into strings or functions. Under the hood, there is a JSX preprocessor that converts tags like `<App />` into normal JavaScript functions that eventually return strings of HTML that get output into the browser.

The `app.js` file defines what JavaScript should render when we say `<App />`. We call this the App component. For now, our component is very simple -- it just renders a header, but components can get very complicated. Components can be composed of other components, and they can change their display based on the state of the application passed to the component as "props".

We could have included both the `app.js` file and the `index.js` file in a single file. However, it is generally good practice to keep your components in individual files to organize your code and emphasize that components are meant to be interchangeable and independent.

## Planning our Game Application


### Components

One way to design a React front-end is to start with a basic sketch of the entire view, and try to break it down into components. This process can be more of an art than a science, and there is not always a correct way to do this. Generally if you see the same type of element repeated multiple times, that element should be a component.

For our application, we will have an `App` component that contains everything else. The `App` component will contain an `Info` component at the top that displays the player's record, the player's current score, and buttons that allow the player to "hit" (draw another card) or "stand" (stop drawing cards). The `App` component will also contain two `Hand` components that show several `Card` components. One of these will represent the player's hand and the other will represent the dealer's hand.

### State

We will be using `redux` to manage our application's data. `redux` requires us to use a single variable as state. For this application, we'll be using a `Map` from the `Immutable.js` package. A `Map` is analgous to a `Hash` in Ruby or a JavaScript object except it is immutable. That means that every time you want to change a `Map` you will need to make a copy of it and change the copy while leaving the original `Map` alone.

<aside style="background-color:lightblue; margin-bottom: 16px;">It's perfectly fine to use a JavaScript object or any other data structure as a way to keep track of the application's state as long as you are careful not to mutate the state object. We eliminate this concern by using an immutable `Map`.</aside>

We want our state `Map` to keep track of the following variables:

- Player's win count
- Player's loss count
- Player's hand
- Dealer's hand
- Cards remaining in deck
- Current status of game (we'll use a boolean variable called hasStood -- if this is true, it is the dealer's turn to draw)
 
It can be useful to set up the state of the application so that you have some data to work with while you're working on the components. Let's do that now.

```jsx
// app/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable'
import App from './components/app.js';



ReactDOM.render(
    <App />,
    document.getElementById('app')
);
```


## Setting Up the State


### Cards and deck

We need to write some helper functions to set up our state. To keep our code organized, let's do so in a new file in a new directory. Create a new folder inside `app/` called `lib/`. Inside `lib/` create a file called `cards.js`. 

Let's create a `shuffle` method and a method that will create a new deck. I shamelessly stole the `shuffle` method from Stack Overflow [here](http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript). We'll also need a `new_deck` method that will add a new card to the deck for each rank and suit.

```js
// app/lib/cards.js

export const shuffle = (array) => {
    let j, x, i;
    for (i = array.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
};

export const new_deck = () => {
    const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    const suits = ['S', 'C', 'H', 'D'];
    
    const deck = [];
    
    ranks.forEach( (r) => {
        suits.forEach( (s) => {
            deck.push({ "rank": r, "suit": s});
        });
    });
    
    shuffle(deck);
    
    return deck;
};
```

In the new deck method, we refer to `deck` as a `const` because it is a constant reference to an array. This means that the array itself may change, but the pointer to the array that we are storing in `deck` is not allowed to change.

```js
const arr = [];
arr.push(1); // This is fine because it mutates an existing array
arr = [1, 2, 3]; // This will break because it replaces the existing array
```

Now we'll import the `new_deck` method into our `index.js` file, and create a new deck.

```js
// app/index.js

import { new_deck } from './lib/cards.js';

const deck = new_deck();
console.log(deck);
```

If you open the page in your browser and open the javascript console (`ctrl` + `shift` + `j` on Windows), you should see an array of Objects. You can click on them to ensure that they have a suit and rank.

We are currently storing `deck` in a mutable array. Let's install Immutable.js and store it in an immutable `List` instead.

```js
npm install --save immutable
```

Immutable.js provides us with a `fromJS` method that allows us to convert JavaScript objects and arrays into immutable `Map`s and `List`s. We can use that method now on our `deck`:

```js
// app/index.js

const deck = fromJS(new_deck());
console.log(deck);
```

Since we're dealing with Immutable.js objects rather than native JavaScript objects, it's hard to view them in the console. To fix that, I installed a [chrome extension](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog) that gives a custom formatter for Immutable.js objects. After you install it, you may need to close the developer tools console and refresh the page. You will also need to enable custom formatters in the developer tools options (access this by pressing `F1` after clicking on the developer tools console).

