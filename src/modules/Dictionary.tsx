import { DictionaryItem } from "@/types";
import { Checkbox, Modal } from "@/components";
import { useLocalStorage } from "@/hooks";

type DictionaryProps = {
	open: boolean;
	onClose: () => void;
	dictionary: DictionaryItem[];
	favoriteWords: Array<DictionaryItem["id"]>;
	setFavoriteWords: (value: Array<DictionaryItem["id"]>) => void;
};

export function Dictionary({ open, onClose, dictionary, favoriteWords, setFavoriteWords }: DictionaryProps) {
	const [favoriteWordsFilterActive, setFavoriteWordsFilterActive] = useLocalStorage<boolean>(
		"favoriteWordsFilterActive",
		false
	);

	function onFilterCheckboxClick() {
		setFavoriteWordsFilterActive(!favoriteWordsFilterActive);
	}

	function onFavoriteCheckboxClick(id: DictionaryItem["id"]) {
		let newFavoriteWords = [...favoriteWords];

		if (favoriteWords.includes(id)) {
			newFavoriteWords = newFavoriteWords.filter((favoriteWord: DictionaryItem["id"]) => favoriteWord !== id);
		} else {
			newFavoriteWords.push(id);
		}

		setFavoriteWords(newFavoriteWords);
	}

	return (
		<Modal {...{ open, onClose }} title="dictionary">
			<Checkbox
				id="filter"
				name="filter"
				label="favourites only"
				checked={favoriteWordsFilterActive}
				onChange={onFilterCheckboxClick}
			/>
			<table className="text-orange-100">
				<thead className="hidden">
					<tr>
						<th>favorite</th>
						<th>word</th>
						<th>translation</th>
					</tr>
				</thead>
				<tbody>
					{dictionary.map(({ id, nadsat, english }: DictionaryItem) =>
						favoriteWordsFilterActive === false || favoriteWords.includes(id) ? (
							<tr
								key={id}
								className={
									"align-middle hover:underline" +
									(favoriteWords.includes(id) ? " text-orange-500" : "")
								}
							>
								<td>
									<Checkbox
										{...{ id }}
										name={id}
										checked={favoriteWords.includes(id)}
										onChange={() => onFavoriteCheckboxClick(id)}
									/>
								</td>
								<td className="px-4">{nadsat}</td>
								<td>{english}</td>
							</tr>
						) : null
					)}
				</tbody>
			</table>
		</Modal>
	);
}
