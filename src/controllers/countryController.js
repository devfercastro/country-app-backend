import { getCountries, getCountry } from "../services/countryService.js";

/**
 * Retrieves all countries and sends them as a JSON response.
 * @async
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export async function getAllCountries(req, res) {
	try {
		const countries = await getCountries();
		res.json(countries);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

/**
 * Retrieves information about a specific country and sends it as a JSON response.
 * @async
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export async function getCountryInfo(req, res) {
	try {
		const { country, iso2 } = req.body;

		if (!country || !iso2)
			return res
				.status(400)
				.json({ message: "Country name and iso2 iso2 are required" });

		const countryInfo = await getCountry(country, iso2);
		res.json(countryInfo);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
