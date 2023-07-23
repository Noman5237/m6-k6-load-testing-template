import http from 'k6/http';
import { parseNameAndFunction } from './request';
import { isResponseOk } from '../util/requests/checkers';
import { setupTraceAndSpan } from './log';

export const executeBatch = (batch, vault = {}) => {
  const requests = {};
  const log = setupTraceAndSpan(vault);
  for (let i = 0; i < batch.length; i += 1) {
    const element = batch[i];
    const { name, func } = parseNameAndFunction(element);
    // requests[name] = func(vault);
    // batch functions can have custom names
    const request = func(vault);
    if (request.url !== undefined) {
      requests[name] = request;
    } else {
      const { name, func } = parseNameAndFunction(request);
      requests[name] = func(vault);
    }
  }

  log(`Executing batch of ${Object.keys(requests)}`);
  const responses = http.batch(requests);

  Object.entries(responses).forEach(([name, response]) => {
    log(`output ${name}: ${JSON.stringify(response)}`);
    vault[name] = response;
    if (!isResponseOk(response)) {
      console.error(`CHECK FAILED ${name}`);
    }
  });
};
