import { MouseEvent, useRef } from "react";
import { DictionaryItem } from "@/types";

type Props = {
	open: boolean;
	onClose: () => void;
	dictionary: DictionaryItem[];
};

export function Dictionary({ open, onClose, dictionary }: Props) {
	const overlayRef = useRef(null);

	function onOverlayClick(event: MouseEvent<HTMLDivElement>) {
		if (event.target === overlayRef.current) onClose();
	}

	if (open)
		return (
			<div
				className="fixed inset-0 flex items-center justify-center bg-neutral-950 bg-opacity-50 backdrop-blur-sm"
				ref={overlayRef}
				onClick={onOverlayClick}
			>
				<div className="relative flex max-h-screen flex-col gap-4 border-2 border-orange-100 bg-neutral-950 py-4">
					<header className="flex items-center justify-between">
						<h1 className="px-4 text-center text-3xl font-bold">dictionary</h1>
						<button
							className="mx-3 flex items-center justify-center p-1 font-bold text-orange-100 hover:text-orange-100"
							type="button"
							onClick={onClose}
						>
							close
						</button>
					</header>
					<div className="flex gap-4 px-4">
						<div className="flex flex-col">
							{dictionary.map(({ id, nadsat, english }: DictionaryItem) => (
								<div className="flex h-8 items-center">
									<button
										className="flex h-4 w-4 items-center justify-center border border-orange-100"
										type="button"
										onClick={() => console.log(`${id} : ${nadsat} : ${english}`)}
									>
										<svg
											className="h-4 w-4 stroke-current"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 16 16"
											strokeLinecap="round"
										>
											<line x1="8" y1="0" x2="0" y2="8" />
											<line x1="16" y1="0" x2="0" y2="16" />
											<line x1="16" y1="8" x2="8" y2="16" />
											<line x1="8" y1="0" x2="16" y2="8" />
											<line x1="0" y1="0" x2="16" y2="16" />
											<line x1="0" y1="8" x2="8" y2="16" />
										</svg>
									</button>
								</div>
							))}
						</div>
						<div>
							{dictionary.map(({ nadsat }: DictionaryItem) => (
								<div className="flex h-8 items-center">{nadsat}</div>
							))}
						</div>
						<div>
							{dictionary.map(({ english }: DictionaryItem) => (
								<div className="flex h-8 items-center">{english}</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
}
