import "./App.css";

import { useState } from "react";
import { DictionaryItem, Score } from "@/types";
import { generateUniqueNumbers } from "@/utilities";
import { QuestionType } from "@/enums";
import { Question } from "./components/Question";
import { ScoreDisplay } from "./components/ScoreDisplay";
import { Glossary } from "./components/Glossary";

type Props = {
	dictionary: DictionaryItem[];
};

export function App({ dictionary }: Props) {
	const numberOfOptions = 3;
	const [score, setScore] = useState<Score>({ attempts: 0, correct: 0 });
	const [question, setQuestion] = useState<{
		type: QuestionType;
		correctAnswer: DictionaryItem;
		options: DictionaryItem[];
	}>(createQuestion());
	const [glossaryOpen, setGlossaryOpen] = useState<boolean>(false);

	function createQuestion() {
		const randomDictionaryIndexes = generateUniqueNumbers(0, dictionary.length - 1, numberOfOptions);
		const correctAnswerIndex = Math.round(Math.random() * (randomDictionaryIndexes.length - 1));
		const correctAnswer = dictionary[randomDictionaryIndexes[correctAnswerIndex]];
		const options = randomDictionaryIndexes.map((dictionaryIndex: number) => dictionary[dictionaryIndex]);
		const type =
			Math.round(Math.random()) === 0 ? QuestionType.MultiChoiceFromNadsat : QuestionType.MultiChoiceToNadsat;

		const question = {
			type,
			correctAnswer,
			options,
		};

		return question;
	}

	function updateScore(correct: boolean) {
		setScore((prevScore) => ({
			attempts: prevScore.attempts + 1,
			correct: correct ? prevScore.correct + 1 : prevScore.correct,
		}));
	}

	function onQuestionComplete() {
		setQuestion(createQuestion());
	}

	const { type, correctAnswer, options } = question;
	return (
		<div className="flex min-h-screen flex-col bg-neutral-950 font-mono text-neutral-200">
			<header className="flex items-center gap-4 border-b-2 p-4">
				<svg className="fill-current" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
					<rect width="100%" height="100%" />
				</svg>
				<h1 className="text-3xl">Govoreet Nadsat</h1>
			</header>
			<main className="mt-16 flex w-full max-w-3xl flex-col items-stretch gap-2 self-center">
				<ScoreDisplay {...{ score }} />
				<Question {...{ type, correctAnswer, options, updateScore, onQuestionComplete }} />
			</main>
			<Glossary open={glossaryOpen} {...{ dictionary }} />
		</div>
	);
}
