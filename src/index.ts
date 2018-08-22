import loaderUtils from 'loader-utils';
import { loader } from 'webpack';
import parseVariables, { ParseOptions } from './lib/parse-variables';

export { default as parse } from './lib/parse-variables';

const sassVariableLoader: loader.Loader = function(content): string {
  if (typeof content !== 'string') {
    throw new Error('Sorry, this loader only accepts strings as content');
  }

  this.cacheable(); // Flag loader as cacheable

  const options: ParseOptions = {
    camelCase: true,
    cwd: this.context,
    indented: this.resourcePath.endsWith('.sass')
  };
  Object.assign(options, loaderUtils.getOptions(this));

  const variables = parseVariables(content, options);

  return `module.exports = ${JSON.stringify(variables, null, 2)};`;
};

export default sassVariableLoader;
