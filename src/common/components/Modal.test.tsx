import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { Modal } from "./Modal";

describe("Modal", () => {
	it("should not be rendered when the `open` property is `false`.", () => {
		render(
			<Modal open={false} onClose={() => {}} title="Modal Title">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sunt incidunt iure atque. Aspernatur,
					iste cumque assumenda rerum quibusdam excepturi. Hic asperiores repudiandae dolorum laudantium
					repellat sequi voluptates non tempore!
				</p>
			</Modal>
		);

		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("should be rendered when the `open` property is `true`.", () => {
		render(
			<Modal open={true} onClose={() => {}} title="Modal Title">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sunt incidunt iure atque. Aspernatur,
					iste cumque assumenda rerum quibusdam excepturi. Hic asperiores repudiandae dolorum laudantium
					repellat sequi voluptates non tempore!
				</p>
			</Modal>
		);

		expect(screen.queryByRole("dialog")).toBeInTheDocument();
	});

	it("should call the function provided to the `onClose` property when the 'close' button is clicked.", () => {
		const handleClose = jest.fn();

		render(
			<Modal open={true} onClose={handleClose} title="Modal Title">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sunt incidunt iure atque. Aspernatur,
					iste cumque assumenda rerum quibusdam excepturi. Hic asperiores repudiandae dolorum laudantium
					repellat sequi voluptates non tempore!
				</p>
			</Modal>
		);

		fireEvent.click(screen.getByRole("button"));

		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it("should render a title containing the string passed to the `title` property.", () => {
		const titleText = "Modal Title";

		render(
			<Modal open={true} onClose={() => {}} title={titleText}>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sunt incidunt iure atque. Aspernatur,
					iste cumque assumenda rerum quibusdam excepturi. Hic asperiores repudiandae dolorum laudantium
					repellat sequi voluptates non tempore!
				</p>
			</Modal>
		);

		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(titleText);
	});
});
