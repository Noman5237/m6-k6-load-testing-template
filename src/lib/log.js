// eslint-disable-next-line import/no-unresolved, import/extensions
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { DASHBOARD } from '../constants/servers';

export const generateLogId = () => {
  const timestamp = Date.now();
  const threeDigitRandom = Math.floor(Math.random() * 1000);
  return `${timestamp}${threeDigitRandom}`;
};

export const setupTraceAndSpan = (vault) => {
  let { traceId } = vault;
  let spanId;
  if (!traceId) {
    traceId = traceId || generateLogId();
    spanId = traceId;
  } else {
    spanId = generateLogId();
  }

  vault.traceId = traceId;
  vault.spanId = spanId;

  return (message) => {
    console.log(`[${traceId}-${spanId}]: ${message}`);
  };
};

export const summaryWithDashboard = (data, dashboard = DASHBOARD) => {
  const startTime = data.metrics.start_time.values.avg;
  const endTime = Math.floor(Date.now() / 1000) * 1000 + 2000;

  const primaryDashboardUrl = `${dashboard.protocol}://${dashboard.host}:${dashboard.port}${dashboard.apiPrefix}/primary-dashboard/primary-dashboard?orgId=1&from=${startTime}&to=${endTime}`;
  const secondaryDashboardUrl = `${dashboard.protocol}://${dashboard.host}:${dashboard.port}${dashboard.apiPrefix}/secondary-dashboard/secondary-dashboard?orgId=1&from=${startTime}&to=${endTime}`;

  const standardSummary = `${textSummary(data, { indent: ' ', enableColors: false })}\n`
    + `Dashboard: \n`
    + `  Primary: ${primaryDashboardUrl} \n`
    + `  Secondary: ${secondaryDashboardUrl} \n`;

  return standardSummary;
};
