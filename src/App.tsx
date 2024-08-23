import { useState } from "react";
import { DictionaryItem, WordAttemptHistoryItem } from "@/types";
import { Dictionary, ScoreDisplay, Question } from "@/modules";
import { useLocalStorage } from "@/hooks";
import { ensure } from "@/utilities";

type Props = {
	dictionary: DictionaryItem[];
};

export function App({ dictionary }: Props) {
	const [wordAttemptHistory, setWordAttemptHistory] = useLocalStorage<Array<WordAttemptHistoryItem>>(
		"wordAttemptHistory",
		[]
	);
	const [dictionaryOpen, setDictionaryOpen] = useState<boolean>(false);
	const [favoriteWords, setFavoriteWords] = useLocalStorage<Array<DictionaryItem["id"]>>("favoriteWords", []);

	function updateWordAttemptHistory({ wordId, correct }: { wordId: DictionaryItem["id"]; correct: boolean }) {
		const noWordWithIdExists = dictionary.find((element) => element.id === wordId) === undefined;

		if (noWordWithIdExists) {
			//! MAYBE THROW ERROR HERE INSTEAD?
			console.error(`updateWordAttemptHistory: No word with an ID of "${wordId} was found in the dictionary.`);
			return;
		}

		setWordAttemptHistory((previousState) => {
			const newState = [...previousState];
			const historyItemIndex = newState.findIndex((element) => element.wordId === wordId);

			if (historyItemIndex === -1) {
				newState.push({
					wordId: wordId,
					attempts: 1,
					correct: correct ? 1 : 0,
				});
			} else {
				const previousHistoryItem = ensure<WordAttemptHistoryItem>(previousState.at(historyItemIndex));

				newState[historyItemIndex] = {
					wordId: previousHistoryItem.wordId,
					attempts: previousHistoryItem.attempts + 1,
					correct: previousHistoryItem.correct + (correct ? 1 : 0),
				};
			}

			return newState;
		});
	}

	const score = wordAttemptHistory.reduce(
		(previous, current) => {
			return {
				attempts: previous.attempts + current.attempts,
				correct: previous.correct + current.correct,
			};
		},
		{ attempts: 0, correct: 0 }
	);

	return (
		<div className="flex min-h-screen flex-col bg-neutral-950 font-mono text-orange-100">
			<header className="flex items-center justify-between border-b-2 border-orange-100 p-4">
				<span className="flex items-center gap-4">
					<svg className="fill-current" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
						<rect width="100%" height="100%" />
					</svg>
					<h1 className="text-3xl">govoreet nadsat</h1>
				</span>
				<button className="hover:underline" type="button" onClick={() => setDictionaryOpen(true)}>
					dictionary
				</button>
			</header>
			<main className="mt-16 flex w-full max-w-3xl flex-col items-stretch gap-2 self-center">
				<ScoreDisplay {...{ score }} />
				<Question {...{ dictionary, updateWordAttemptHistory }} />
			</main>
			<Dictionary
				open={dictionaryOpen}
				onClose={() => setDictionaryOpen(false)}
				{...{ dictionary, favoriteWords, setFavoriteWords }}
			/>
		</div>
	);
}
