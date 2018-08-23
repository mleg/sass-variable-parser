import test from 'ava';
import { readFileSync } from 'fs';
import pathBuilder from 'path';
import { parse } from '../../';
import rootDir from '../../root-dir';

const bulmaRoot = pathBuilder.join(rootDir, 'node_modules', 'bulma', 'sass');

function getDerivedVariablesSass(file: string) {
  const content = readFileSync(file, 'utf8');
  return [
    '@import "initial-variables.sass"',
    '@import "functions.sass"',
    '',
    content
  ].join('\n');
}

const cwd = pathBuilder.join(bulmaRoot, 'utilities');
const sass = getDerivedVariablesSass(
  pathBuilder.join(cwd, 'derived-variables.sass')
);
const options = { indented: true, cwd };

test('bulma: derived-variables should match a snapshot', t => {
  const variables = parse(sass, options);

  t.is(typeof variables, 'object');
  t.true(Object.keys(variables).length > 20);
  t.snapshot(variables);
});

test('bulma: derived-variables with preserved variables names', t => {
  const variables = parse(sass, { ...options, camelCase: false });

  t.is(typeof variables, 'object');
  t.true(Object.keys(variables).length > 20);
  t.snapshot(variables);
});
