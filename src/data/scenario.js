export const STANDARD_SCENARIOS = {
  shared: {
    executor: 'shared-iterations',
    vus: 500,
    iterations: 10000,
  },
  time: {
    executor: 'constant-vus',
    vus: 500,
    duration: '30s',
  },
  constant: {
    executor: 'per-vu-iterations',
    vus: 500,
    iterations: 5,
  },
  ramp: {
    executor: 'ramping-vus',
    startVUs: 100,
    stages: [
      { duration: '30s', target: 100 },
      { duration: '30s', target: 200 },
      { duration: '30s', target: 300 },
      { duration: '30s', target: 400 },
      { duration: '30s', target: 500 },
      { duration: '30s', target: 400 },
      { duration: '30s', target: 300 },
      { duration: '30s', target: 200 },
      { duration: '30s', target: 100 },
    ],
  },
};
