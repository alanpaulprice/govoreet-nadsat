import { useState } from "react";
import { DictionaryItem, Score } from "@/types";
import { Dictionary, ScoreDisplay, Question } from "@/modules";
import { useLocalStorage, useQuestion } from "@/hooks";

type Props = {
	dictionary: DictionaryItem[];
};

export function App({ dictionary }: Props) {
	const [score, setScore] = useLocalStorage<Score>("score", { attempts: 0, correct: 0 });
	const [dictionaryOpen, setDictionaryOpen] = useState<boolean>(false);
	const [favoriteWords, setFavoriteWords] = useLocalStorage<Array<DictionaryItem["id"]>>("favoriteWords", []);
	const [question, nextQuestion] = useQuestion(dictionary);

	function updateScore(correct: boolean) {
		setScore((previousScore: Score) => ({
			attempts: previousScore.attempts + 1,
			correct: correct ? previousScore.correct + 1 : previousScore.correct,
		}));
	}

	function onQuestionComplete() {
		nextQuestion();
	}

	const { type, correctAnswer, options } = question;
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
				<Question {...{ type, correctAnswer, options, updateScore, onQuestionComplete }} />
			</main>
			<Dictionary
				open={dictionaryOpen}
				onClose={() => setDictionaryOpen(false)}
				{...{ dictionary, favoriteWords, setFavoriteWords }}
			/>
		</div>
	);
}
