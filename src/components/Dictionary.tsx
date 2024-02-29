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
				<div className="relative max-h-screen border-2 border-neutral-200 bg-neutral-950">
					<header className="flex items-start justify-between">
						<h1 className="px-2 text-center text-2xl font-bold">Dictionary</h1>
						<button
							className="flex items-center justify-center p-3 text-neutral-200 hover:text-orange-500"
							type="button"
							onClick={onClose}
						>
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
					</header>
					<dl className="flex flex-col gap-2 p-4">
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
