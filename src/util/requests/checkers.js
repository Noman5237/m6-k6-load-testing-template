import { check } from 'k6';

export const RESPONSE_STATUS_OK = () => ({
  'status is 200': (response) => response.status === 200,
});

export const isResponseOk = (response) => {
  if (!response || response.status === undefined) {
    return true;
  }

  return check(response, {
    ...RESPONSE_STATUS_OK(),
  });
};
