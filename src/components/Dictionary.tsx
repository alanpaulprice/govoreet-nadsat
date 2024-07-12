import { MouseEvent, useRef } from "react";
import { DictionaryItem } from "@/types";

type Props = {
	open: boolean;
	onClose: () => void;
	dictionary: DictionaryItem[];
	favoriteWords: Array<DictionaryItem["id"]>;
	setFavoriteWords: (value: Array<DictionaryItem["id"]>) => void;
};

export function Dictionary({ open, onClose, dictionary, favoriteWords, setFavoriteWords }: Props) {
	const overlayRef = useRef(null);

	function onOverlayClick(event: MouseEvent<HTMLDivElement>) {
		if (event.target === overlayRef.current) onClose();
	}

	function onFavoriteButtonClick(id: DictionaryItem["id"]) {
		const newFavoriteWords = [...favoriteWords];

		if (favoriteWords.includes(id)) {
			newFavoriteWords.filter((favoriteWord: DictionaryItem["id"]) => favoriteWord === id);
		} else {
			newFavoriteWords.push(id);
		}

		setFavoriteWords(newFavoriteWords);
	}

	if (open)
		return (
			<div
				className="fixed inset-0 flex items-center justify-center bg-neutral-950 bg-opacity-50 backdrop-blur-sm"
				ref={overlayRef}
				onClick={onOverlayClick}
			>
				<div className="relative flex max-h-screen flex-col gap-4 border-2 border-orange-100 bg-neutral-950">
					<header className="flex items-start justify-between">
						<h1 className="mx-4 mt-4 text-center text-3xl font-bold">dictionary</h1>
						<button
							className="mr-1 mt-1 flex items-center justify-center p-2 font-bold leading-3 text-orange-100 hover:text-orange-500"
							type="button"
							onClick={onClose}
						>
							close
						</button>
					</header>
					<table className="mx-4 mb-4 min-w-96">
						<thead className="hidden">
							<tr>
								<th>Favorite</th>
								<th>Word</th>
								<th>Translation</th>
							</tr>
						</thead>
						<tbody>
							{dictionary.map(({ id, nadsat, english }: DictionaryItem) => (
								<tr
									key={id}
									className={
										"hover:underline" +
										(favoriteWords.includes(id) ? " text-orange-500" : " text-orange-100")
									}
								>
									<td className="align-middle">
										<input
											className="hidden"
											type="checkbox"
											name={`favorite-${id}`}
											id={`favorite-${id}`}
											checked={favoriteWords.includes(id)}
											onChange={() => onFavoriteButtonClick(id)}
										/>
										<label
											className={
												"block h-4 w-4 cursor-pointer overflow-hidden border bg-transparent" +
												(favoriteWords.includes(id)
													? " border-orange-500"
													: " border-orange-100")
											}
											htmlFor={`favorite-${id}`}
										>
											{favoriteWords.includes(id) && (
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
											)}
										</label>
									</td>
									<td className="px-4 align-middle">{nadsat}</td>
									<td className="align-middle">{english}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
}
