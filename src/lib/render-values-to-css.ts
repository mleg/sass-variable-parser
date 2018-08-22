import { last } from 'lodash';
import nodeSass from 'node-sass';
import { ParseOptions } from './parse-variables';
import { generateId } from './utils';
import * as variableTemplates from './variable-templates'

function constructEvaluationSass(
  variableNames: string[],
  indented?: boolean
): string {
  const asClasses = variableNames
    .map(name => {
      const fn = indented ? variableTemplates.sass : variableTemplates.scss;
      return fn(name);
    })
    .join('\n');

  return asClasses;
}

export default function renderValuesToCSS(
  sass: string,
  variableNames: string[],
  { cwd, indented }: ParseOptions
) {
  const separator = `/* separator-${generateId()} */`;

  const evaluationSass = constructEvaluationSass(variableNames, indented);

  // Set current working directory for @imports
  if (cwd) {
    process.chdir(cwd);
  }

  const constructedSass = [sass, separator, evaluationSass].join('\n');

  const css = nodeSass
    .renderSync({
      data: constructedSass,
      indentedSyntax: Boolean(indented),
      outputStyle: 'compact'
    })
    .css.toString();

  return last(css.split(separator));
}
