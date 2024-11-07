import { APP_NAME } from "@constants";

type HeaderProps = {
	onDictionaryButtonClick: () => void;
};

export function Header({ onDictionaryButtonClick }: HeaderProps) {
	return (
		<header className="flex items-center justify-between border-b-2 border-orange-800 p-4">
			<span className="flex items-center gap-4">
				<svg
					className="fill-current"
					width="32"
					height="32"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-label="Logo"
				>
					<rect width="100%" height="100%" />
				</svg>
				<h1 className="text-3xl">{APP_NAME}</h1>
			</span>
			<button className="hover:underline" type="button" onClick={onDictionaryButtonClick}>
				dictionary
			</button>
		</header>
	);
}
