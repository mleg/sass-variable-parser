import test from 'ava';
import { readFileSync } from 'fs';
import pathBuilder from 'path';
import { parse } from '../../';
import rootDir from '../../root-dir';

const themeSrcPath = pathBuilder.join(
  rootDir,
  'node_modules',
  'element-ui',
  'packages',
  'theme-chalk',
  'src'
);

const varScss = readFileSync(
  pathBuilder.join(themeSrcPath, 'common', 'var.scss'),
  'utf8'
);

test('element-ui: var.scss should match snapshot', t => {
  const variables = parse(varScss);
  t.is(typeof variables, 'object');
  t.true(Object.keys(variables).length > 100);
  t.snapshot(variables);
});

test('element-ui: var.scss with camelCase=false should match snapshot', t => {
  const variables = parse(varScss, { camelCase: false });
  t.is(typeof variables, 'object');
  t.true(Object.keys(variables).length > 100);
  t.snapshot(variables);
});

test("element-ui: mixins.scss shouldn't throw", t => {
  const cwd = pathBuilder.join(themeSrcPath, 'mixins');
  const sass = readFileSync(pathBuilder.join(cwd, 'mixins.scss'), 'utf8');
  const variables = parse(sass, { cwd });
  t.is(typeof variables, 'object');
});
