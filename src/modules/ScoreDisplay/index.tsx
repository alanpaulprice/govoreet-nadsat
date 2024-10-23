import { Score } from "@types";

type ScoreProps = { score: Score };

export function ScoreDisplay({ score: { attempts, correct } }: ScoreProps) {
	return (
		<dl className="flex items-center gap-2 self-end">
			<dt>score:</dt>
			<dd className="flex items-center gap-2 text-3xl font-bold">
				<span>{correct}</span>
				<span className="text-center text-xs w-[3ch]">out of</span>
				<span>{attempts}</span>
			</dd>
		</dl>
	);
}
