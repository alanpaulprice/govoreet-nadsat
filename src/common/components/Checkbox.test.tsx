import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';


describe("App component", () => {
	it("renders an h1 with text", () => {
		render(<h1>Hello, World!</h1>);

		// Find the h1 element by its text content
		const heading = screen.getByText("Hello, World!");

		// Assert that the h1 is in the document
		expect(heading).toBeInTheDocument();
	});
});
