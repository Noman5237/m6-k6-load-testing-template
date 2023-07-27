import { isResponseOk } from '../util/requests/checkers';
import { parseNameAndFunction } from './request';
import { setupTraceAndSpan } from './log';
import { FlowCounter } from './counter';

export const executeFlow = (flow, vault = {}) => {
  const { log, fail } = setupTraceAndSpan(vault);
  let output;
  for (let i = 0; i < flow.length; i += 1) {
    const input = output;

    const element = flow[i];
    const { name, func } = parseNameAndFunction(element);

    log(`method=${name} executing...`);
    output = func(input, vault);
    log(`method=${name} output: ${JSON.stringify(output)}`);
    if (!isResponseOk(output)) {
      fail(`method=${name} CHECK FAILED`);
    }
    vault[name] = output;
  }
  log(`flow executed successfully`);
  FlowCounter.add(1);
  return vault;
};
