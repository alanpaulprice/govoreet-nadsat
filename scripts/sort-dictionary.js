import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define the path to the JSON file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../public/dictionary.json");

// Read and parse the JSON file
fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	try {
		// Parse the JSON data
		const jsonArray = JSON.parse(data);

		jsonArray.forEach((dictionaryEntry) => {
			if (Array.isArray(dictionaryEntry.nadsat)) dictionaryEntry.nadsat.sort((a, b) => a.localeCompare(b));
			if (Array.isArray(dictionaryEntry.english)) dictionaryEntry.english.sort((a, b) => a.localeCompare(b));
		});

		// Sort the array by the "nadsat" property
		jsonArray.sort((a, b) => {
			const nadsatA = Array.isArray(a.nadsat) ? a.nadsat[0] : a.nadsat;
			const nadsatB = Array.isArray(b.nadsat) ? b.nadsat[0] : b.nadsat;

			return nadsatA.localeCompare(nadsatB);
		});

		// Write the sorted array back to the original file
		fs.writeFile(filePath, JSON.stringify(jsonArray, null, 2), (err) => {
			if (err) {
				console.error("Error writing file:", err);
			}
		});
	} catch (parseErr) {
		console.error("Error parsing JSON:", parseErr);
	}
});
