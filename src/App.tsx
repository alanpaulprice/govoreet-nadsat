import { useState } from "react";

import { useLocalStorage } from "@hooks";

import { Dictionary, Header, Question, ScoreDisplay } from "@modules";

import { DictionaryEntry, DictionaryEntryAttemptHistoryItem } from "@types";

import { ensure } from "@utilities";

type Props = {
	dictionary: DictionaryEntry[];
};

export function App({ dictionary }: Props) {
	const [attemptHistory, setAttemptHistory] = useLocalStorage<Array<DictionaryEntryAttemptHistoryItem>>(
		"attemptHistory",
		[]
	);
	const [dictionaryOpen, setDictionaryOpen] = useState<boolean>(false);
	const [favoriteDictionaryEntries, setFavoriteDictionaryEntries] = useLocalStorage<Array<DictionaryEntry["id"]>>(
		"favoriteDictionaryEntries",
		[]
	);

	function updateAttemptHistoryItem({
		dictionaryEntryId,
		correct,
	}: {
		dictionaryEntryId: DictionaryEntry["id"];
		correct: boolean;
	}) {
		const noDictionaryEntryWithIdExists =
			dictionary.find((element) => element.id === dictionaryEntryId) === undefined;

		if (noDictionaryEntryWithIdExists) {
			//! MAYBE THROW ERROR HERE INSTEAD?
			console.error(`updateAttemptHistoryItem: No dictionary entry with an ID of "${dictionaryEntryId} exists.`);
			return;
		}

		setAttemptHistory((previousState) => {
			const newState = [...previousState];
			const historyItemIndex = newState.findIndex((element) => element.dictionaryEntryId === dictionaryEntryId);

			if (historyItemIndex === -1) {
				newState.push({
					dictionaryEntryId: dictionaryEntryId,
					attempts: 1,
					correct: correct ? 1 : 0,
				});
			} else {
				const previousHistoryItem = ensure<DictionaryEntryAttemptHistoryItem>(
					previousState.at(historyItemIndex)
				);

				newState[historyItemIndex] = {
					dictionaryEntryId: previousHistoryItem.dictionaryEntryId,
					attempts: previousHistoryItem.attempts + 1,
					correct: previousHistoryItem.correct + (correct ? 1 : 0),
				};
			}

			return newState;
		});
	}

	const score = attemptHistory.reduce(
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
			<Header onDictionaryButtonClick={() => setDictionaryOpen(true)} />
			<main className="mt-16 flex w-full max-w-3xl flex-col items-stretch gap-2 self-center">
				<ScoreDisplay {...{ score }} />
				<Question
					{...{
						dictionary,
						updateAttemptHistoryItem,
						favoriteDictionaryEntries,
						setFavoriteDictionaryEntries,
					}}
				/>
			</main>
			<Dictionary
				open={dictionaryOpen}
				onClose={() => setDictionaryOpen(false)}
				{...{
					dictionary,
					favoriteDictionaryEntries,
					setFavoriteDictionaryEntries,
				}}
			/>
		</div>
	);
}
