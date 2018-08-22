import { uniq } from 'lodash';
import stripComments from 'strip-json-comments';
import { findAll } from './utils';

export default function getVariableNames(content: string): string[] {
  const variableRegex = /\$([^:$})\s]+):/g;

  const matches = findAll(stripComments(content), variableRegex);
  const variables = matches.map(found => found[1].trim());
  return uniq(variables);
}
