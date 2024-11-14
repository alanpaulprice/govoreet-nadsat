import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../public/dictionary.json");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	try {
		const dictionary = JSON.parse(data);
		const duplicateIds = new Set();

		dictionary.forEach((currentDictionaryEntry) => {
			const entriesWithCurrentId = dictionary.filter(
				(dictionaryEntry) => dictionaryEntry.id === currentDictionaryEntry.id
			);
			if (entriesWithCurrentId.length > 1) duplicateIds.add(currentDictionaryEntry.id);
		});

		const duplicateIdsAsArray = [...duplicateIds];

		if (duplicateIdsAsArray.length === 0) console.log("No duplicate ids encountered.");
		if (duplicateIdsAsArray.length === 1) console.error(`Duplicate id '${duplicateIdsAsArray[0]}' encountered.`);
		if (duplicateIdsAsArray.length > 1)
			console.error(`Duplicate ids encountered: '${duplicateIdsAsArray.join(", ")}'.`);
	} catch (parseErr) {
		console.error("Error parsing JSON:", parseErr);
	}
});
