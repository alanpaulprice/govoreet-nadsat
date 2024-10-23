import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

import { Score } from "@types";

import { ScoreDisplay } from ".";

describe("Score Display", () => {
	it("should display the text '{correct} out of {attempts}' based on the properties provided.", () => {
		const score = {
			attempts: 5,
			correct: 10,
		};

		render(<ScoreDisplay {...{ score }} />);

		expect(screen.getByText(score.correct)).toBeInTheDocument();
		expect(screen.getByText("out of")).toBeInTheDocument();
		expect(screen.getByText(score.attempts)).toBeInTheDocument();
	});

	it("should display the correct score statistics before and after the score is updated.", () => {
		const preScore: Score = {
			attempts: 5,
			correct: 10,
		};
		const postScore: Score = {
			attempts: 6,
			correct: 11,
		};

		const ScoreDisplayWrapper = () => {
			const [score, setScore] = useState<Score>({
				attempts: preScore.attempts,
				correct: preScore.correct,
			});

			return (
				<>
					<ScoreDisplay score={score} />
					<button onClick={() => setScore({ attempts: postScore.attempts, correct: postScore.correct })}>
						Update Score
					</button>
				</>
			);
		};

		render(<ScoreDisplayWrapper />);

		expect(screen.getByText(preScore.correct)).toBeInTheDocument();
		expect(screen.getByText("out of")).toBeInTheDocument();
		expect(screen.getByText(preScore.attempts)).toBeInTheDocument();

		const updateScoreButton = screen.getByRole("button", { name: "Update Score" });
		fireEvent.click(updateScoreButton);

		expect(screen.getByText(postScore.correct)).toBeInTheDocument();
		expect(screen.getByText("out of")).toBeInTheDocument();
		expect(screen.getByText(postScore.attempts)).toBeInTheDocument();
	});
});
