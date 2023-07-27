import http from 'k6/http';

export const parseNameAndFunction = (request) => {
  let name;
  let func;
  if (Object.prototype.hasOwnProperty.call(request, 'name') && Object.prototype.hasOwnProperty.call(request, 'func')) {
    name = request.name;
    func = request.func;
  } else {
    name = request.name;
    func = request;
  }

  return { name, func };
};

export const request = ({
  server, method, path, body, headers, cookies,
  url, params
}) => {
  const URL = url ?? `${server.protocol}://${server.host}:${server.port}${server.apiPrefix}${path}`;
  const PARAMS = params ?? {
    headers,
    cookies,
  };

  return http.request(method, URL, JSON.stringify(body), PARAMS);
};

export const requestObject = ({
  server, method, path, body, headers, cookies,
}) => ({
  url: `${server.protocol}://${server.host}:${server.port}${server.apiPrefix}${path}`,
  method,
  params: {
    headers,
    cookies,
  },
  body: JSON.stringify(body),
});

export const requestFromObject = (requestObjFunc) => {
  const { name, func } = parseNameAndFunction(requestObjFunc);
  return {
    name,
    func: (_, vault) => request(func(vault))
  };
};
