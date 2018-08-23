// tslint:disable:no-expression-statement
import test from 'ava';
import getVariableNames from '../../lib/get-variable-names';
import { TestUnit, testUnits } from './test-units';

testUnits.forEach((unit: TestUnit) => {
  const title = `${unit.title} should give an array with ${
    unit.variablesCount
  } items`;
  test(title, t => {
    const variables = getVariableNames(unit.sass);
    t.true(Array.isArray(variables));
    t.is(variables.length, unit.variablesCount);
  });
});

test('should remove duplicate names', t => {
  const variables = getVariableNames('$a: 1; $a: 2;');
  t.is(Object.keys(variables).length, 1);
});
