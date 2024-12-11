
export const GET_COUNTRY = `
query GetCountry {
  country(code: "{countryCode}") {
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}
`;

