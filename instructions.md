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
                exclude: /node_modules/
            }
        ]
    },
};
```

We also need to tell `babel` which presets to use while transforming our code. We do this in the `package.json` file:

```js
// package.json
{
    //...
    "babel": {
        "presets": ["es2015", "react"]
    }
}
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

Instead of typing out `node_modules/.bin/webpack` each time we want to run the build process, we can create a script for npm to run in `package.json`. To do so, let's add the following to `package.json`:

```js
// package.json
{
    //...
    "scripts": {
        "webpack": "node_modules/.bin/webpack",
        "webpack:watch": "npm run webpack -- --watch"
    }
}
```

Now we can create `bundle.js` by running `npm run webpack` and if we ant `webpack` to update `bundle.js` each time we save a file, we can run `npm run webpack:watch`

## Talking Through the First Build

The `index.html` file is a pretty typical HTML file. It does not contain any `script` tags in the header, but it does have a `script` tag in the `body`. The `body` also has a single `div`. The `div` is empty to start with, but it is where `bundle.js` will load its components. The `bundle.js` script is the result of the `webpack` compilation of our programs and all of their dependencies. This means we don't need to include separate `script` tags for each of our dependencies (react, react-dom, etc.).

The `index.js` file finds the `div` with an `id` of `app` and renders `<App />` into in using the `ReactDOM.render` method. This is the first time we're seeing JSX in action. JSX is an extenion to JavaScript that allows us to use things that look like HTML or XML elements in code without turning them into strings or functions. Under the hood, there is a JSX preprocessor that converts tags like `<App />` into normal JavaScript functions that eventually return strings of HTML that get output into the browser.

The `app.js` file defines what JavaScript should render when we say `<App />`. We call this the App component. For now, our component is very simple -- it just renders a header, but components can get very complicated. Components can be composed of other components, and they can change their display based on the state of the application passed to the component as "props".

We could have included both the `app.js` file and the `index.js` file in a single file. However, it is generally good practice to keep your components in individual files to organize your code and emphasize that components are meant to be interchangeable and independent.

## Mapping out State

We will be using `redux` to manage our application's state. `redux` requires us to use a single variable to contain all state data. For this application, we'll be using a `Map` from the `Immutable.js` package. A `Map` is analgous to a `Hash` in Ruby or a JavaScript object except it is immutable. That means that every time you want to change a `Map` you will need to make a copy of it and change the copy while leaving the original `Map` alone.

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

Let's create a `shuffle` method and a method that will create a new deck. I shamelessly stole the `shuffle` method from Stack Overflow [here](http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript). We'll also need a `newDeck` method that will add a new card to the deck for each rank and suit.

```js
// app/lib/cards.js

import { fromJS } from 'immutable';

export const shuffle = (array) => {
    let j, x, i;
    for (i = array.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
};

export const newDeck = () => {
    const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    const suits = ['S', 'C', 'H', 'D'];
    
    const deck = [];
    
    ranks.forEach( (r) => {
        suits.forEach( (s) => {
            deck.push({ "rank": r, "suit": s});
        });
    });
    
    shuffle(deck);
    
    return fromJS(deck);
};
```

In the new deck method, we refer to `deck` as a `const` because it is a constant reference to an array. This means that the array itself may change, but the pointer to the array that we are storing in `deck` is not allowed to change.

```js
const arr = [];
arr.push(1); // This is fine because it mutates an existing array
arr = [1, 2, 3]; // This will break because it replaces the existing array
```

Now we'll import the `newDeck` method into our `index.js` file, and create a new deck.

```js
// app/index.js

import { newDeck } from './lib/cards.js';

const deck = newDeck();
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

const deck = fromJS(newDeck());
console.log(deck);
```

Since we're dealing with Immutable.js objects rather than native JavaScript objects, it's hard to view them in the console. To fix that, I installed a [chrome extension](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog) that gives a custom formatter for Immutable.js objects. After you install it, you may need to close the developer tools console and refresh the page. You will also need to enable custom formatters in the developer tools options (access this by pressing `F1` after clicking on the developer tools console).

You should see a `List` containing `Map`s for each card.

## Player and Dealer Hands

The hands for the player and dealer will also be immutable `List`s. We are going to use the `takeLast` and `skipLast` methods from `List` to deal cards. We will also have to change `const deck` to `let deck` as the `deck` variable will be pointing to new immutable `List`s rather than pointing to a single array that mutates.


The code should look something like this:

```js
let deck = fromJS(newDeck());
console.log("start deck:");
console.log(deck);

let player_hand = deck.takeLast(2);
deck = deck.skipLast(2);
let dealer_hand = deck.takeLast(2);
deck = deck.skipLast(2);

console.log("end deck:");
console.log(deck);
console.log("player_hand:");
console.log(player_hand);
console.log("dealer_hand:");
console.log(dealer_hand);
```

Now if you refresh the page and look at the console, you should see that the player and the dealer each have two cards and the deck starts with 52 cards and ends up with 48 cards.

Since we'll be dealing cards from the deck often, let's write a function that deals cards for us. It's annoying and dangerous to rely on printing out all of our results to the console. Let's setup our testing environment and write the tests for our `deal` function before we implement the method.

We're going to use `mocha` as our test framework and `chai` as our assertion library. Let's install those packages now:

```bash
npm install --save-dev mocha chai
```

To run the tests, we'll use the command

```bash
mocha --compilers js:babel-core/register --recursive
```

This tells `mocha` to use `babel` to transfrom our code from `ES6` and to search through our project recursively to find any tests to run.

We don't want to type this out each time we want to run our tests, so we can add this to our `webpack.config.js` file.

```js
// webpack.config.js

module.exports = {
    // ...,
    
    "scripts": {
        "test": "mocha --compilers js:babel-core/register --recursive"
    }
}
```

Now we can run our tests with:

```bash
npm run test
```

We also want to set up our tests to run each time we save a file (similar to using `guard` in Ruby). To do that, `mocha` provides us with a `--watch` option. Let's add another script to our `webpack` configuration:

```js
// webpack.config.js

module.exports = {
    // ...,
    
    "scripts": {
        // ...
        "test": "mocha --compilers js:babel-core/register --recursive",
        "test:watch": "npm run test --watch"
    }
}
```

To keep our test code DRY, we are going to want a test helper file that requires all the libraries we will need for testing. Create a folder for tests `test/` and create a `test_helper.js` file inside.

We are going to import `chai` and a library called `chai-immutable` that makes it easy for us to test Immutable.js objects. First, we'll get the package from npm:

```bash
npm install --save-dev chai-immutable
```

Now we'll add it to our `test_helper.js`:

```js
// test/test_helper.js

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);
```

To tell `mocha` to load this helper file, we'll add the `--require ./test/test_helper.js` option to our `test` script call in the webpack configuration:

```js
// webpack.config.js

module.exports = {
    // ...,
    
    "scripts": {
        // ...
        "test": "mocha --compilers js:babel-core/register --require ./test/test_helper.js --recursive",
        "test:watch": "npm run test --watch"
    }
}
```

Now let's write some tests for the `cards.js` file that we had previously been testing with `console.log`. We'll try to mirror our `app/` directory with our `test/` directory, so we'll put this test in `test/lib/cards_spec.js`.

```js
// test/lib/cards_spec.js
import { expect } from 'chai';
import { List } from 'immutable';

import { newDeck } from '../../app/lib/cards';

describe('cards.js', () => {
    describe('newDeck', () => {
        it('returns an immutable list', () => {
            expect(newDeck()).to.be.instanceOf(List);
        });
        it('has 52 elements', () => {
            expect(newDeck().size).to.eq(52);
        });
    });
});
```

This is how you write tests using `mocha` and `chai`. The code looks a lot like the Rails testing library `rspec`. First, we import the necessary modules from external libraries. For these tests, we need to import the `expect` function from `chai`. We also need to import the `List` object from Immutable.JS. Then we import the modules from our code we are testing. In this case, we import `newDeck` and `deal` from the `cards.js` file.

Then we set up a couple of `describe` blocks. These help us organize our tests, and each nested `describe` will show up indented one level in the tests. The first argument passed to `describe` is the name of the thing we are testing. Nothing magical happens with the name string, so feel free to type whatever you want. The second argument is a function that contains more `describe` blocks or tests.

Each `it` block corresponds to one test. Each test should check for one thing and should be mostly independent on other tests. Like the describe blocks, the `it` blocks take a string as the first argument. You should choose a string that reads like a grammatical sentence. The second argument to an `it` block is a function that contains the actual code for our test. This should also sound natural if you say it aloud.

You can read our tests like this:

- Look at `cards.js`.
    - Look at the `newDeck` function.
    - It returns an immutable list
        - Specifically, we expect the result of `newDeck()` to be an instance of `List`
    - It has 52 elements
        - Specifically, we expect the size of `newDeck()` to equal 52

If you save the file and run the tests, they should pass because we've already added the `newDeck` mehod to `cards.js`.

Before we write the `deal` method, we want to writ some tests for it `deal` method: 

```js
// test/lib/cards_spec.js

// ...

import { newDeck, deal } from '../../app/lib/cards';

// ...

describe('cards.js', () => {
   // ...
   describe('deal', () => {
        const deck = newDeck();
        const n = 5;
        const [new_deck, new_hand] = deal(deck, n);

        it('returns smaller deck', () => {
            expect(new_deck.size).to.eq(52 - n);
        });
        
        it('does not change cards in deck', () => {
            for(let i = 0; i < new_deck.get(i); i++) {
                expect(new_deck.get(i)).to.eq(deck.get(i));
            } 
        });

        it('returns hand of n cards', () => {
            expect(new_hand.size).to.eq(n);
        });
        
        it('puts correct cards in hand', () => {
            for(let i = n-1; i >= 0; i--) {
                expect(new_hand.get(i)).to.eq(deck.get(51-(n-1)+i));
            }
        });
    });
});
```

One thing to note about these tests is that we only run the `newDeck` function once inside the `deal` `describe` block. This makes our code more DRY and prevents unnecessary runs of code. We can access variables and constants declared outside of an `it` block as long as they are declared inside the same `describe` as the `it`.

These tests won't run yet because we haven't written the `deal` method. Let's write it now:

```js
// app/lib/cards.js

// ...

// deal n cards from the end of List deck
export const deal = (deck, n) => {
    let dealt_cards = deck.takeLast(2);
    let newDeck = deck.skipLast(2);
    return [newDeck, dealt_cards];
};
```

Now try running the tests. One of them should pass, but there is a small error in the function. Try fixing it. You will know if you fixed it if all the tests pass.

We can now simplify `app/index.js`:

```jsx
// app/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';

import { newDeck, deal } from './lib/cards.js';

let deck = fromJS(newDeck());
let player_hand, dealer_hand;

[deck, player_hand] = deal(deck, 2);
[deck, dealer_hand] = deal(deck, 2);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
```

The only parts of our application state that we still need to add are the win and loss counts and `hasStood`. Since these are primitive types (integers and booleans), we can just add them to the state `Map` when its created.

Let's now create our state `Map`:

```js
// app/index.js

// ...

import App from './components/app.js';
import { fromJS } from 'immutable';

import { newDeck, deal } from './lib/cards.js';

// ...

const state = fromJS({
    deck,
    player_hand,
    dealer_hand,
    "winCount": 0,
    "lossCount": 0,
    hasStood: false
});

console.log(state);

// ...
```

Now when we build the bundle using `webpack` and refresh the browser page, we will see the state `Map` logged to the console.

The next step is to let our components know about `state`. We do this by passing `state` into our `<App />` component as a "prop". `<App />` looks like an HTML tag, and we can pass it variables the same way we give HTML tags properties:

```jsx
// app/index.js

// ...

ReactDOM.render(
    <App state={state} />,
    document.getElementById('app')
);
```

We use the curly braces around `{state}` to indicate to React that it should substitute a variable called `state` for `{state}`.

## A First Pass at Components

Now that we are passing our components some data, we can start thinking about what our components should look like.

### Component Design

One way to design a React front-end is to start with a basic sketch of the entire view, and try to break it down into components. This process can be more of an art than a science, and there is not always a correct way to do this. Generally if you see the same type of element repeated multiple times, that element should be a component.

For our application, we will have an `App` component that contains everything else. The `App` component will contain an `Info` component at the top that displays the player's record, the player's current score, and buttons that allow the player to "hit" (draw another card) or "stand" (stop drawing cards). The `App` component will also contain two `Hand` components that show several `Card` components. One of these will represent the player's hand and the other will represent the dealer's hand.

## The App Component

The App component is very simple. It will just render the `Info` and `Hand` components as described above.

We're going to use the Enzyme testing utility to test our React components. Enzyme provides us with some helper functions that make rendering and manipulating React objects easier than trying to use the default tools provided by React. 

First, let's install React's test utilities and Enzyme:

```bash
npm install --save-dev react-addons-test-utils enzyme chai-enzyme
```

Next, let's add Enzyme's `chai` assertions to our `test_helper.js`:

```js
// test/test_helper.js

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiImmutable);
chai.use(chaiEnzyme());
```

We can use Enzyme's `shallow` function to do a shallow render of our component. Shallow rendering will not render any child components. This allows us to keep our test one component at a time. If we are testing the `App` component, we want it to render an `Info` component. If something is wrong with the `Info` component, but it's still being rendered properly, the `App` component test should pass. Keeping our tests independent allows us to identify the source of a bug more quickly.

Shallow rendering can also boost performance as rendering all children and ancestor components can take a relatively long time in a big application.

The `shallow` function returns an object that has some other useful functions. In this test, we will use the `find` function to search for other elements inside the shallow rendering using CSS selectors (`element`, `#id`, `.class`).

Our first task for the `App` component is to make it render one `Info` component:

```jsx
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../../app/components/app';

describe('<App />', () => {
    const rendered = shallow(<App />);
    
    it('renders <Info /> component', () => {
        expect(rendered.find('Info')).to.have.length(1);
    });
});
```

We did the `shallow` render outside of the `it` block because we will be using `rendered` for multiple tests.

To make the test pass, we need to add the `Info` component to the `render` function in our `App` component:

```jsx
// app/components/app.js

import React from 'react';
import Info from './info';

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <h1>React Blackjack</h1>
                <Info />
            </div>
        );
    }
};
```

Note that we kept the `h1`. We had to wrap the entire thing in a `div` because a React component can only have one root HTML element. Without the `div`, we would have `h1` and `Info` on the same level, so we would have two root elements.

Another thing to note is that when we give an element a CSS class in `JSX`, we use `className=` rather than `class=` (the normal way to do it in HTML). This is because `JSX` is still JavaScript, and `class` is a reserved word in JavaScript used when declaring a new class.

We'll also need an `Info` component, so we have something to import and render from the `App` component:

```jsx
// app/components/info.js

import React from 'react';

export default class Info extends React.Component {
    render() {
        return (
            <p>This is the info component</p>
        );
    }
};
```

Now our test for the `App` component should pass.

Next, we want our `App` component to pass some state variables to the `Info` component as props. Specifically, the `Info` component is going to need to know `winCount`, `lossCount`, and `hasStood`. Our test for this looks like: 

```jsx
// test/components/app_spec.js

// ...
import { Map } from 'immutable';

// ...

const state = new Map( { winCount: 0, lossCount: 0, hasStood: false } );

describe('<App />', () => {
    const rendered = shallow(<App state={state} />);
    
    // ...
    
    it('passes props to <Info />', () => {
        expect(rendered.find('Info').first()).to.have.prop('winCount');
        expect(rendered.find('Info').first()).to.have.prop('lossCount');
        expect(rendered.find('Info').first()).to.have.prop('hasStood');
    });
});
```

To write this test, we needed to create a state `Map`, just like we did in `index.js`. This is a bit repetitive, but it is okay for now. Once we start using Redux to handle state, we'll DRY this up.