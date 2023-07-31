import { executeFlow } from '../lib/flow';
import { request } from '../lib/request';
import { summaryWithDashboard } from '../lib/log';
import { parseScenarios } from '../lib/scenario';
import { markStart } from '../lib/trend';

import { STANDARD_SCENARIOS } from '../data/scenario';

import { GATEWAY } from '../constants/servers';

/* ================================ REQUESTS ================================ */
export const test = () => request({
  server: GATEWAY,
  method: 'GET',
  path: '/',
});

/* ================================ SETUP ================================ */
export const options = {
  scenarios: parseScenarios(__ENV, STANDARD_SCENARIOS),
};

export function setup() {
  markStart();
}

/* ================================ FLOW ================================ */
export default function SetupLoadTest() {
  executeFlow([
    test
  ]);
}

/* ================================ END ================================ */
export function handleSummary(data) {
  return {
    stdout: summaryWithDashboard(data),
  };
}
