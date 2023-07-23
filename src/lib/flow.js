import { fail } from 'k6';
import { isResponseOk } from '../util/requests/checkers';
import { parseNameAndFunction } from './request';
import { setupTraceAndSpan } from './log';

export const executeFlow = (flow, vault = {}) => {
  const log = setupTraceAndSpan(vault);
  let output;
  for (let i = 0; i < flow.length; i += 1) {
    const input = output;

    const element = flow[i];
    const { name, func } = parseNameAndFunction(element);

    log(`executing ${name}`);
    output = func(input, vault);
    log(`output ${name}: ${JSON.stringify(output)}`);
    if (!isResponseOk(output)) {
      fail(`CHECK FAILED: ${name}`);
    }
    vault[name] = output;
  }
  return vault;
};
