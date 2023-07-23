export const storeAccessToken = (response, vault) => {
  vault.accessToken = response.json('data').token;
};
