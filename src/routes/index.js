import express from "express";
import {
	getAllCountries,
	getCountryInfo,
} from "../controllers/countryController.js";

const router = express.Router();

router.get("/", getAllCountries); // Availlable countries
router.post("/country", getCountryInfo); // Country info

export default router;
