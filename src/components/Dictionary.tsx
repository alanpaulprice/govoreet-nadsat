import { MouseEvent, useRef } from "react";
import { DictionaryItem } from "@/types";
import { Checkbox } from "./Checkbox";

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
		let newFavoriteWords = [...favoriteWords];

		if (favoriteWords.includes(id)) {
			newFavoriteWords = newFavoriteWords.filter((favoriteWord: DictionaryItem["id"]) => favoriteWord !== id);
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
					<table className="mx-4 mb-4 text-orange-100">
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
										"align-middle hover:underline" +
										(favoriteWords.includes(id) ? " text-orange-500" : " ")
									}
								>
									<td>
										<Checkbox
											{...{ id }}
											name={id}
											checked={favoriteWords.includes(id)}
											onChange={() => onFavoriteButtonClick(id)}
										/>
									</td>
									<td className="px-4">{nadsat}</td>
									<td>{english}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
}
