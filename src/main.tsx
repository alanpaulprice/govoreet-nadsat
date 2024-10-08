import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";
import { DictionaryEntry } from "./common/types/DictionaryEntry.ts";
import { getDictionary } from "./common/utilities/index.ts";
import "./index.css";

async function run() {
	try {
		const dictionary: DictionaryEntry[] | undefined = await getDictionary();

		if (dictionary !== undefined) {
			createRoot(document.getElementById("root")!).render(
				<StrictMode>
					<App {...{ dictionary }} />
				</StrictMode>
			);
		} else {
			throw Error("Attempted to load the dictionary and `undefined` was returned.");
		}
	} catch (error) {
		alert("An error was encountered when attempting to load the dictionary.");
		console.error(`run: ${error}`);
	}
}

run();
