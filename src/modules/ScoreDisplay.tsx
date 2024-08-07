import { Score } from "@/types";

type ScoreProps = { score: Score };

export function ScoreDisplay({ score: { attempts, correct } }: ScoreProps) {
	return (
		<dl className="flex items-center gap-2 self-end">
			<dt>score:</dt>
			<dd className="flex items-center gap-2 text-3xl font-bold">
				{correct}
				<span className="text-center text-xs">
					out
					<br />
					of
				</span>
				{attempts}
			</dd>
		</dl>
	);
}
