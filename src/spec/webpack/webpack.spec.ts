import test from 'ava';
import path from 'path';
import rm from 'rimraf';
import webpack from 'webpack';

const config: webpack.Configuration = {
  entry: './main.js',
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'variables.ts',
    libraryTarget: 'commonjs2'
  }
};
const compiler = webpack(config);

test.before(async () => {
  await cleanDistDirectory();
  await compile();
})

test('element variables should be a none-empty object', async t => {
  const vars = require('./dist/variables.ts');
  t.is(typeof vars.element, 'object');
  t.true(Object.keys(vars.element).length > 20);
});

test('bulma variables should match snapshot', t => {
  const vars = require('./dist/variables.ts');
  t.is(typeof vars.bulma, 'object');
  t.true(Object.keys(vars.bulma).length > 20);
  t.snapshot(vars.bulma);
});

function cleanDistDirectory() {
  return new Promise((resolve, reject) => {
    rm(config.output!.path!, err => {
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
    compiler.run(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
