import { Trend } from 'k6/metrics';

const startTime = new Trend('start_time');

export const markStart = () => startTime.add(Math.floor(Date.now() / 1000) * 1000 - 2000);
