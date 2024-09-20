/**
 * @typedef {NagerCountriesItem[]} NagerCountriesAPI
 */
/**
 * @typedef {Object} NagerCountriesItem
 * @property {string} countryCode - The ISO 2 code of the country.
 * @property {string} name - The name of the country.
 */

/**
 * @typedef {Object} NagerBordersAPI
 * @property {string} commonName - The name of the country.
 * @property {string} officialName - The official name of the country.
 * @property {string} countryCode - The ISO 2 code of the country.
 * @property {string} region - The region of the country.
 * @property {bordersItem[]} borders - The borders of the country.
 */
/**
 * @typedef {Object} bordersItem
 * @property {string} commonName - The name of the country.
 * @property {string} officialName - The official name of the country.
 * @property {string} countryCode - The ISO 2 code of the country.
 * @property {string} region - The region of the country.
 * @property {null} borders - The borders of the country.
 */

/**
 * @typedef {Object} CountriesNowPopulationAPI
 * @property {boolean} error - Indicates if there was an error in the request.
 * @property {string} msg - The error message if there was an error.
 * @property {CountriesNowPopulationDataItem} data - The data returned by the API.
 */
/**
 * @typedef {Object} CountriesNowPopulationDataItem
 * @property {string} country - The name of the country.
 * @property {string} code - The ISO 2 code of the country.
 * @property {string} iso3 - The ISO 3 code of the country.
 * @property {populationCountItem[]} populationCounts - The population data for the country.
 */
/**
 * @typedef {Object} populationCountItem
 * @property {number} year - The year for the population data.
 * @property {number} value - The population count for that year.
 */

/**
 * @typedef {Object} CountriesNowFlagAPI
 * @property {boolean} error - Indicates if there was an error in the request.
 * @property {string} msg - The error message if there was an error.
 * @property {CountriesNowFlagDataItem} data - The data returned by the API.
 */
/**
 * @typedef {Object} CountriesNowFlagDataItem
 * @property {string} name - The name of the country.
 * @property {string} flag - The flag URL for the country.
 * @property {string} iso2 - The ISO 2 code of the country.
 * @property {string} iso3 - The ISO 3 code of the country.
 */

export {};
