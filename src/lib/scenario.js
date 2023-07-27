export const parseScenarios = (env, scenarios) => {
  if (!env.SCENARIOS) {
    return {};
  } if (env.SCENARIOS === 'all') {
    return scenarios;
  }

  const keys = env.SCENARIOS.split(',');
  const selectedScenarios = {};
  keys.forEach((key) => {
    selectedScenarios[key] = scenarios[key];
  });
  return selectedScenarios;
};
