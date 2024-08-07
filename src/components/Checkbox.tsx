import { ChangeEvent } from "react";

type CheckboxProps = {
	id: string;
	name: string;
	label?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	className?: string;
};

export function Checkbox({ id, name, label, checked, onChange, className = "" }: CheckboxProps) {
	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		onChange(event.target.checked);
	}

	return (
		<div className={`flex items-center gap-2 ${className}`}>
			<input className="hidden" type="checkbox" {...{ id, name }} checked={checked} onChange={handleChange} />
			<label
				className="block h-4 w-4 cursor-pointer overflow-hidden border border-current bg-transparent"
				htmlFor={id}
			>
				{checked && (
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
			{label && (
				<label className="cursor-pointer" htmlFor={id}>
					{label}
				</label>
			)}
		</div>
	);
}
