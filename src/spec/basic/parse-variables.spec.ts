import test from 'ava';
import { parse } from '../../';
import { unitByName } from './test-units';

const getTitle = (unitTitle: string, providedTitle: string) =>
  `parseVariables(): ${unitTitle} ${providedTitle}`;

(() => {
  const { title, sass } = unitByName('withoutComments')!;
  test(getTitle(title, 'should contain "grayBase"'), t => {
    const result = parse(sass);
    t.is(typeof result, 'object');
    t.true('grayBase' in result);
    t.snapshot(result);
  });
})();

(() => {
  const options = { camelCase: false };
  const optionsStr = JSON.stringify(options);
  const { title, sass } = unitByName('withoutComments')!;
  test(
    getTitle(title, `should contain "gray-base" when options=${optionsStr}`),
    t => {
      const result = parse(sass, options);
      t.is(typeof result, 'object');
      t.true('gray-base' in result);
      t.snapshot(result);
    }
  );
})();

(() => {
  const { title, sass } = unitByName('withComments')!;
  const result = parse(sass);
  test(getTitle(title, 'should return an object with a key "one"'), t => {
    t.is(typeof result, 'object');
    t.true('one' in result);
    t.snapshot(result);
  });
  test(getTitle(title, 'should return an object without a key "y"'), t => {
    t.false('y' in result);
  });
})();

(() => {
  const { title, sass } = unitByName('indentedSass')!;
  const result = parse(sass, { indented: true });
  test(getTitle(title, 'should return an object with a key "one"'), t => {
    t.is(typeof result, 'object');
    t.true('one' in result);
    t.snapshot(result);
  });
})();

(() => {
  const { title, sass } = unitByName('emptySassFile')!;
  const result = parse(sass);
  test(getTitle(title, 'should be an empty object'), t => {
    t.deepEqual(result, {});
  });
})();
