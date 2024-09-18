import axios from "axios";

/**
 * Retrieves a list of countries with their positions.
 *
 * @async
 * @returns {Promise<Object>} A promise that resolves to an object containing country data.
 * @throws {Error} If there's an error fetching the countries data.
 */
export async function getCountries() {
	const response = await fetch(
		`${process.env.BASE_URL_COUNTRIES_NOW}/countries/positions`,
	);
	const data = await response.json();
	return data;
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
