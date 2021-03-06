# UNMAINTAINED

I personally don't use it anymore and recommend **CSS modules** as a tool for importing SASS / LESS variables to Javascript: [__Example__](https://github.com/mleg/sass-vars-to-js-example)

# Sass variable parser and loader for webpack

> Works as a **Webpack loader** or can be used as **parser** in Node.js

Parses **variables** from **sass**, evaluates their values with [node-sass](https://github.com/sass/node-sass) and returns the result as a Javascript **object**.

It was initially a fork of [sass-variable-loader](https://github.com/nordnet/sass-variable-loader), but is completely rewritten: major bugs fixed, added maps support, elabortate tests with real world Sass included. Thanks for the directions anyway!

## Features

* Returns only **top-level** variables (obviously).
* Emits both "plain" variables and **maps**. Maps are represented as nested objects.
* By default "**camelizes**" variable names. Can be changed through [options](#options).
* Returns only variables from the _imported file itself_, but follows `@import`s to evaluate dependent values.
* Supports both **scss** and **indented** syntax.
* Written in strict **Typescript**.
* **Reliable**. Thoroughly tested.

## Table Of Contents

- [Sass variable parser and loader for webpack](#sass-variable-parser-and-loader-for-webpack)
  - [Features](#features)
  - [Table Of Contents](#table-of-contents)
  - [Result example](#result-example)
  - [Installation](#installation)
  - [Usage as a Webpack loader](#usage-as-a-webpack-loader)
  - [Usage as a parser](#usage-as-a-parser)
  - [Options](#options)
  - [Contributing](#contributing)
  - [License](#license)

## Result example

```javascript
{
  tagColor: "#409EFF",
  tagBorder: "rgba(64, 158, 255, 0.2)",
  tagBorderRadius: "4px",
  someMap: {
    key1: "value1",
    key2: "value2"
  }
}
```

## Installation

`npm i sass-variable-parser -D`

## Usage as a Webpack loader

No need to touch webpack config. Loaders can be used inline. Just install devDependency and go ahead. Two exclamation marks disable for this import all loaders and preloaders specified in the webpack configuration.

```javascript
import variables from '!!sass-variable-parser!./_variables.scss';
// => returns all the variables in _variables.scss as an object with each variable name camelCased
```

Without camel-casing:

```javascript
import variables from '!!sass-variable-parser?-camelCase!./_variables.scss';
```

## Usage as a parser

```javascript
const path = require('path');
const { parse } = require('sass-variable-parser');

const options = {
  // defaults to true
  camelCase: false,
  // optional, only if there are @imports with relative paths
  cwd: path.resolve(__dirname, 'node_modules/bulma/sass/utilities'),
  // true means indented sass syntax, defaults to false ('scss' syntax)
  indented: true,
};

const variables = parse(
  `
@import "initial-variables.sass"

$primary: $turquoise !default
$info: $cyan !default

$family-primary: $family-monospace`,
  options
);
```

`variables` would be:

```javascript
{
  "primary": "#00d1b2",
  "info": "#209cee",
  "family-primary": "monospace"
}
```

Check out `src/spec` folder for more exmaples

## Options

When using as a loader pass through query string ([see how](https://github.com/webpack/loader-utils#parsequery)).

When using as a parser pass options object as the second parameter to `parse` method.

| Option    | Default                               | Description                                                                                                      |
| --------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| camelCase | true                                  | Whether to camelize variable names                                                                               |
| cwd       | Webpack's context when used as loader | Current working directory from which @import paths are calculated. Typically not needed when used as loader      |
| indented  | false                                 | Whether the loaded sass is in indented syntax or not. When used as loader is auto-calculated from file extension |

## Contributing

The project is created with [typescript-starter](https://github.com/bitjson/typescript-starter).
Check out it's README for more info.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
