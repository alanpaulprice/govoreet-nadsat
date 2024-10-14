import { Checkbox, Modal } from "@components";

import { useLocalStorage } from "@hooks";

import { DictionaryEntry } from "@types";

type DictionaryProps = {
	open: boolean;
	onClose: () => void;
	dictionary: DictionaryEntry[];
	favoriteDictionaryEntries: Array<DictionaryEntry["id"]>;
	setFavoriteDictionaryEntries: (value: Array<DictionaryEntry["id"]>) => void;
};

export function Dictionary({
	open,
	onClose,
	dictionary,
	favoriteDictionaryEntries,
	setFavoriteDictionaryEntries,
}: DictionaryProps) {
	const [favoriteDictionaryEntriesFilterActive, setFavoriteDictionaryEntriesFilterActive] = useLocalStorage<boolean>(
		"favoriteDictionaryEntriesFilterActive",
		false
	);

	function onFilterCheckboxClick() {
		setFavoriteDictionaryEntriesFilterActive(!favoriteDictionaryEntriesFilterActive);
	}

	function onFavoriteCheckboxClick(id: DictionaryEntry["id"]) {
		let newFavoriteDictionaryEntries = [...favoriteDictionaryEntries];

		if (favoriteDictionaryEntries.includes(id)) {
			newFavoriteDictionaryEntries = newFavoriteDictionaryEntries.filter(
				(dictionaryEntryId: DictionaryEntry["id"]) => dictionaryEntryId !== id
			);
		} else {
			newFavoriteDictionaryEntries.push(id);
		}

		setFavoriteDictionaryEntries(newFavoriteDictionaryEntries);
	}

	return (
		<Modal {...{ open, onClose }} title="dictionary">
			<Checkbox
				className="my-4"
				id="favourites-only"
				name="favourites-only"
				label="favourites only"
				checked={favoriteDictionaryEntriesFilterActive}
				onChange={onFilterCheckboxClick}
			/>
			<table className="text-orange-100">
				<thead className="hidden">
					<tr>
						<th>favorite</th>
						<th>nadsat</th>
						<th>translation</th>
					</tr>
				</thead>
				<tbody>
					{dictionary.map(({ id, nadsat, english }: DictionaryEntry) =>
						favoriteDictionaryEntriesFilterActive === false || favoriteDictionaryEntries.includes(id) ? (
							<tr
								key={id}
								className={
									"align-middle hover:underline" +
									(favoriteDictionaryEntries.includes(id) ? " text-orange-500" : "")
								}
							>
								<td>
									<Checkbox
										{...{ id }}
										name={id}
										checked={favoriteDictionaryEntries.includes(id)}
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
