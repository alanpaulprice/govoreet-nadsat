import { DictionaryItem } from "@/types";

type Props = { open: boolean; dictionary: DictionaryItem[] };

export function Glossary({ open, dictionary }: Props) {
	if (open)
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-neutral-950 bg-opacity-50 backdrop-blur-sm">
				<div className="relative border-2 border-neutral-200 bg-neutral-950 p-8">
					<button className="absolute right-0 top-0 p-4 text-xl text-neutral-200 hover:text-orange-500">
						<svg
							className="stroke-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							width="16"
							height="16"
							overflow="visible"
							stroke-width="4"
							stroke-linecap="round"
						>
							<line x1="0" y1="0" x2="16" y2="16" />
							<line x1="16" y1="0" x2="0" y2="16" />
						</svg>
					</button>
					<h1 className="mb-4 text-center text-4xl">Glossary</h1>
					<dl className="flex flex-col gap-2">
						{dictionary.map(({ nadsat, english }: DictionaryItem) => (
							<div className="flex justify-between gap-8 hover:text-orange-500">
								<dt className="font-bold">{nadsat}</dt>
								<dd>{english}</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		);
}
