import { Checkbox, Modal } from "@components";

import { DictionaryEntry } from "@types";

import { Question, QuestionStatus } from "../types";

type Props = {
	onClose: () => void;
	questionStatus: QuestionStatus;
	question: Question;
	favoriteDictionaryEntries: Array<DictionaryEntry["id"]>;
	setFavoriteDictionaryEntries: (value: Array<DictionaryEntry["id"]>) => void;
};

export function OutcomeModal({
	onClose,
	questionStatus,
	question,
	favoriteDictionaryEntries,
	setFavoriteDictionaryEntries,
}: Props) {
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

	function onFavoriteCheckboxClick() {
		let newFavoriteDictionaryEntries = [...favoriteDictionaryEntries];

		if (favoriteDictionaryEntries.includes(question.correctAnswer.id)) {
			newFavoriteDictionaryEntries = newFavoriteDictionaryEntries.filter(
				(dictionaryEntryId: DictionaryEntry["id"]) => dictionaryEntryId !== question.correctAnswer.id
			);
		} else {
			newFavoriteDictionaryEntries.push(question.correctAnswer.id);
		}

		setFavoriteDictionaryEntries(newFavoriteDictionaryEntries);
	}

	const isFavorite = favoriteDictionaryEntries.includes(question.correctAnswer.id);

	return (
		<Modal {...{ open, onClose, title }}>
			<p className="max-w-prose">
				The correct answer was <strong className="text-orange-500">{getCorrectAnswerText()}</strong>.
			</p>
			<Checkbox
				id="favorite"
				name="favorite"
				label="favorite"
				checked={isFavorite}
				onChange={onFavoriteCheckboxClick}
			/>
		</Modal>
	);
}
