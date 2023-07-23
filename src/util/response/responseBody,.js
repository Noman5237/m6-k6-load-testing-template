export const parseBody = (response) => response.json();

export const parseAccessToken = (response) => parseBody(response).data.token;
