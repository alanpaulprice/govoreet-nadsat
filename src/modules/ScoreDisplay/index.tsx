import { Score } from "@types";

type ScoreProps = { score: Score };

export function ScoreDisplay({ score: { attempts, correct } }: ScoreProps) {
	return (
		<dl className="flex items-center gap-2 self-end">
			<dt className="text-orange-700">score:</dt>
			<dd className="flex items-center gap-2 text-3xl font-bold">
				<span>{correct}</span>
				<span className="text-center text-xs w-[3ch] text-orange-700">out of</span>
				<span>{attempts}</span>
			</dd>
		</dl>
	);
}
