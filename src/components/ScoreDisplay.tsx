import { Score } from "@/types";

type Props = { score: Score };

export function ScoreDisplay({ score: { attempts, correct } }: Props) {
	const version: number = 1;

	switch (version) {
		case 0:
			return (
				<dl className="flex justify-between">
					<div className="flex items-center gap-2">
						<dt className="text-sm">Attempts:</dt>
						<dd className="text-2xl font-bold">{attempts}</dd>
					</div>
					<div className="flex items-center gap-2">
						<dt className="text-sm">Correct:</dt>
						<dd className="text-2xl font-bold">{correct}</dd>
					</div>
				</dl>
			);

		case 1:
			return (
				<dl className="flex justify-between">
					<div className="flex flex-col items-center">
						<dt className="text-sm">Attempts</dt>
						<dd className="text-2xl font-bold">{attempts}</dd>
					</div>
					<div className="flex flex-col items-center">
						<dt className="text-sm">Correct</dt>
						<dd className="text-2xl font-bold">{correct}</dd>
					</div>
				</dl>
			);

		case 2:
			return (
				<dl className="flex flex-col">
					<div className="flex items-center gap-2">
						<dt className="w-[9ch] text-sm">Attempts:</dt>
						<dd className="text-2xl font-bold">{attempts}</dd>
					</div>
					<div className="flex items-center gap-2">
						<dt className="w-[9ch] text-sm">Correct:</dt>
						<dd className="text-2xl font-bold">{correct}</dd>
					</div>
				</dl>
			);

		case 3:
			return (
				<dl className="flex flex-col items-center self-end">
					<dt className="text-transparentt font-bold">Score</dt>
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
}
