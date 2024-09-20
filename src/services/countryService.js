import axios from "axios";

/**
 * @typedef {Object} Country
 * @property {string} name - The name of the country.
 * @property {string} iso2 - The country code in ISO 2 format.
 * @property {number} long - The longitude of the country.
 * @property {number} lat - The latitude of the country.
 */

/**
 * @typedef {Object} CountriesNowAPI
 * @property {boolean} error - Indicates if there was an error in the request.
 * @property {string} msg - The error message if there was an error.
 * @property {Country[]} data - The data returned by the API.
 */

/**
 * Retrieves a list of countries with their positions.
 *
 * @async
 * @returns {Promise<Country[]>} A promise that resolves to an array of country data.
 * @throws {Error} If there's an error fetching the countries data.
 */
export async function getCountries() {
	/**
	 * @type {import('axios').AxiosResponse<CountriesNowAPI>}
	 */
	const response = await axios(
		`${process.env.BASE_URL_COUNTRIES_NOW}/countries/positions`,
	);

	if (response.data.error) {
		throw new Error(response.data.msg);
	}

	return response.data.data;
}

/**
 * Retrieves information about a specific country.
 *
 * @async
 * @param {string} name - The name of the country to retrieve information for.
 * @param {string} iso2 - The country code in format iso2.
 * @returns {Promise<Object>} A promise that resolves to an object containing country information.
 * @throws {Error} If there's an error fetching the country information.
 */
export async function getCountry(name, iso2) {
	const [borders, population, flag] = await Promise.all([
		axios.get(`${process.env.BASE_URL_NAGER}/CountryInfo/${iso2}`),
		axios.post(`${process.env.BASE_URL_COUNTRIES_NOW}/countries/population`, {
			country: name,
		}),
		axios.post(`${process.env.BASE_URL_COUNTRIES_NOW}/countries/flag/images`, {
			iso2: iso2,
		}),
	]);

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
