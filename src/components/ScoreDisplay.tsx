import { Score } from "@/types";

type Props = { score: Score };

export function ScoreDisplay({ score: { attempts, correct } }: Props) {
	return (
		<dl className="flex items-center gap-2 self-end">
			<dt className="text-transparentt">Correct:</dt>
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
