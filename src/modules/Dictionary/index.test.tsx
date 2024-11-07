import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { randomUUID } from "crypto";
import { useState } from "react";

import { DictionaryEntry } from "@types";

import { Dictionary } from ".";

describe("Dictionary", () => {
	it("should be shown when the `open` property is `true`.", () => {
		render(
			<Dictionary
				open={true}
				onClose={() => {}}
				dictionary={[]}
				favoriteDictionaryEntries={[]}
				setFavoriteDictionaryEntries={() => {}}
			/>
		);

		const dictionaryHeading = screen.getByRole("heading", { level: 1, name: "dictionary" });
		expect(dictionaryHeading).toBeInTheDocument();
	});

	it("should not be shown when the `open` property is `false`.", () => {
		render(
			<Dictionary
				open={false}
				onClose={() => {}}
				dictionary={[]}
				favoriteDictionaryEntries={[]}
				setFavoriteDictionaryEntries={() => {}}
			/>
		);

		const dictionaryHeading = screen.queryByRole("heading", { level: 1, name: "dictionary" });
		expect(dictionaryHeading).not.toBeInTheDocument();
	});

	it("should close when the 'close' button is clicked.", () => {
		const DictionaryWrapper = () => {
			const [dictionaryOpen, setDictionaryOpen] = useState(true);

			return (
				<Dictionary
					open={dictionaryOpen}
					onClose={() => setDictionaryOpen(false)}
					dictionary={[]}
					favoriteDictionaryEntries={[]}
					setFavoriteDictionaryEntries={() => {}}
				/>
			);
		};

		render(<DictionaryWrapper />);

		const preDictionaryHeading = screen.getByRole("heading", { level: 1, name: "dictionary" });
		expect(preDictionaryHeading).toBeInTheDocument();

		const closeButton = screen.getByRole("button", { name: "Close modal" });
		fireEvent.click(closeButton);

		const postDictionaryHeading = screen.queryByRole("heading", { level: 1, name: "dictionary" });
		expect(postDictionaryHeading).not.toBeInTheDocument();
	});

	it("should render a table displaying the dictionary entries provided via the `dictionary` property.", () => {
		const mockDictionary = [
			{
				id: "ab2f7ee7-5fbf-44c2-b929-34889d49cf93",
				nadsat: "lorem",
				english: "ipsum",
				origin: "",
				chapters: [],
				example: "",
			},
			{
				id: "9f73f5fb-2f15-43c7-9fc5-421495f0baba",
				nadsat: "dolor",
				english: "sit",
				origin: "",
				chapters: [],
				example: "",
			},
			{
				id: "c7262c3b-76ec-4eb3-93e4-8fe1886c7e20",
				nadsat: "amet",
				english: "consectetur",
				origin: "",
				chapters: [],
				example: "",
			},
		];

		render(
			<Dictionary
				open={true}
				onClose={() => {}}
				dictionary={mockDictionary}
				favoriteDictionaryEntries={[]}
				setFavoriteDictionaryEntries={() => {}}
			/>
		);

		mockDictionary.forEach((dictionaryEntry) => {
			expect(screen.getByRole("cell", { name: dictionaryEntry.nadsat })).toBeInTheDocument();
			expect(screen.getByRole("cell", { name: dictionaryEntry.english })).toBeInTheDocument();
		});

		const rows = screen.getAllByRole("row");
		expect(rows).toHaveLength(mockDictionary.length + 1);
	});
});
