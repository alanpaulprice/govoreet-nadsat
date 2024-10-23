import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { Checkbox } from ".";

describe("Checkbox", () => {
	it("should call the function provided to the `onChange` property when clicked.", () => {
		const handleChange = jest.fn();

		render(<Checkbox id="test" name="test" checked={false} onChange={handleChange} />);

		fireEvent.click(screen.getByRole("checkbox"));

		expect(handleChange).toHaveBeenCalledTimes(1);
	});

	it("should render a label containing the string passed to the `label` property.", () => {
		const labelText = "Test Label";

		render(<Checkbox id="test" name="test" label={labelText} checked={false} onChange={() => {}} />);

		expect(screen.getByText(labelText)).toBeInTheDocument();
	});
});
