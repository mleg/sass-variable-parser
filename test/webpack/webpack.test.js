/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const rm = require('rimraf');
const { delay } = require('../../src/utils');

const config = {
  entry: './main.js',
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'variables.js',
    libraryTarget: 'commonjs2',
  },
};

function cleanDistDirectory() {
  return new Promise((resolve, reject) => {
    rm(config.output.path, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function compile() {
  return new Promise((resolve, reject) => {
    webpack(config).run(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

describe('webpack', () => {
  beforeAll(() => {
    return cleanDistDirectory().then(() => {
      return compile();
    });
  });

  test('element variables should be a none-empty object', () => {
    // eslint-disable-next-line global-require, import/no-unresolved
    const vars = require('./dist/variables');
    expect(typeof vars.element).toBe('object');
    expect(Object.keys(vars.element).length).toBeGreaterThan(20);
  });

  test('bulma variables should match snapshot', () => {
    // eslint-disable-next-line global-require, import/no-unresolved
    const vars = require('./dist/variables');
    expect(typeof vars.bulma).toBe('object');
    expect(Object.keys(vars.bulma).length).toBeGreaterThan(20);
    expect(vars.bulma).toMatchSnapshot();
  });
});
