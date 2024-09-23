import { Modal } from "@components";

import { Question, QuestionStatus } from "../types";

type Props = {
	onClose: () => void;
	questionStatus: QuestionStatus;
	question: Question;
};

export function OutcomeModal({ onClose, questionStatus, question }: Props) {
	const open = questionStatus === "success" || questionStatus === "failure";
	const title = questionStatus === "success" ? "correct" : "incorrect";

	function getCorrectAnswerText(): string {
		switch (question.type) {
			case "INPUT_FROM_NADSAT":
			case "MULTI_CHOICE_FROM_NADSAT":
				return question.correctAnswer.english;

			case "INPUT_TO_NADSAT":
			case "MULTI_CHOICE_TO_NADSAT":
				return question.correctAnswer.nadsat;
		}
	}

	return (
		<Modal {...{ open, onClose, title }}>
			<p className="max-w-prose">
				The correct answer was <strong className="text-orange-500">{getCorrectAnswerText()}</strong>.
			</p>
		</Modal>
	);
}
