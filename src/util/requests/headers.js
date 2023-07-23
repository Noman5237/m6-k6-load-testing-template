/* =========================== AUTH =========================== */
export const HEADER_AUTHORIZATION = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
});

/* =========================== CONTENT-TYPE =========================== */
export const HEADER_CONTENT_TYPE_JSON = () => ({
  'Content-Type': 'application/json',
});

/* =========================== COUNTRIES =========================== */
export const HEADER_COUNTRY_CODE = (countryCode) => ({
  'Country-Code': countryCode,
});
