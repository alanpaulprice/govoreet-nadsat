import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { APP_NAME } from "@constants";

import { Header } from ".";

describe("Header", () => {
	it("should display the application's logo as an SVG element.", () => {
		render(<Header onDictionaryButtonClick={() => {}} />);

		const logoSvg = screen.getByRole("img", { name: /Logo/i });
		expect(logoSvg).toBeInTheDocument();
	});

	it("should display the name of the application in a level 1 heading element.", () => {
		render(<Header onDictionaryButtonClick={() => {}} />);

		const heading = screen.getByRole("heading", { level: 1, name: APP_NAME });
		expect(heading).toBeInTheDocument();
	});

	it("should call the function provided to the `onDictionaryButtonClick` property when the 'dictionary' button is clicked.", () => {
		const handleDictionaryButtonClick = jest.fn();

		render(<Header onDictionaryButtonClick={handleDictionaryButtonClick} />);

		const dictionaryButton = screen.getByRole("button", { name: "dictionary" });
		fireEvent.click(dictionaryButton);

		expect(handleDictionaryButtonClick).toHaveBeenCalledTimes(1);
	});
});
