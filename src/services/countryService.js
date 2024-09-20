import axios from "axios";

const CountriesNowAPI = process.env.BASE_URL_COUNTRIES_NOW;
const NagerAPI = process.env.BASE_URL_NAGER;

/**
 * @typedef {import('./types').NagerCountriesAPI} NagerCountriesAPI
 * @typedef {import('./types').NagerBordersAPI} NagerBordersAPI
 * @typedef {import('./types').CountriesNowPopulationAPI}  CountriesNowPopulationAPI
 * @typedef {import('./types').CountriesNowFlagAPI} CountriesNowFlagAPI
 */

/**
 * Retrieves a list of countries.
 *
 * @async
 * @returns {Promise<NagerCountriesAPI>} A promise that resolves to an array of countries.
 */
export async function getCountries() {
	/**
	 * @type {import('axios').AxiosResponse<NagerCountriesAPI>}
	 */
	const response = await axios(`${NagerAPI}/AvailableCountries`);

	return response.data;
}

/**
 * @typedef {Object} CountryInfo
 * @property {string} name - The name of the country.
 * @property {{name: string, iso2: string}[]} borders - An array of objects representing the borders of the country.
 * @property {number[]} population - An array of numbers representing the population of the country.
 * @property {string} flag - The URL of the flag of the country.
 */

/**
 * Retrieves information about a specific country.
 *
 * @async
 * @param {string} name - The name of the country to retrieve information for.
 * @param {string} iso2 - The country code in format iso2.
 * @returns {Promise<CountryInfo>} A promise that resolves to an object containing country information.
 */
export async function getCountry(name, iso2) {
	const response = await Promise.all([
		axios.get(`${NagerAPI}/CountryInfo/${iso2}`),
		axios.post(`${CountriesNowAPI}/countries/population`, {
			country: name,
		}),
		axios.post(`${CountriesNowAPI}/countries/flag/images`, {
			iso2: iso2,
		}),
	]);

	/**
	 * @type {import('axios').AxiosResponse<NagerBordersAPI>}
	 */
	const borders = response[0];
	/**
	 * @type {import('axios').AxiosResponse<CountriesNowPopulationAPI>}
	 */
	const population = response[1];
	/**
	 * @type {import('axios').AxiosResponse<CountriesNowFlagAPI>}
	 */
	const flag = response[2];

	const listBorders = borders.data.borders.map((country) => ({
		name: country.commonName,
		iso2: country.countryCode,
	}));

	const popInfo = population.data.data.populationCounts;

	const flagUrl = flag.data.data.flag;

	return {
		name: borders.data.commonName,
		borders: listBorders,
		population: popInfo,
		flag: flagUrl,
	};
}
