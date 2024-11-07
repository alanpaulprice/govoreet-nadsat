import { MouseEvent, ReactNode, useRef } from "react";

type ModalProps = {
	open: boolean;
	onClose: () => void;
	closeOnOverlayClick?: boolean;
	title: string;
	children: ReactNode;
};

export function Modal({ open, onClose, closeOnOverlayClick, title, children }: ModalProps) {
	const overlayRef = useRef(null);

	function onOverlayClick(event: MouseEvent<HTMLDivElement>) {
		if (event.target === overlayRef.current && closeOnOverlayClick !== false) onClose();
	}

	if (open)
		return (
			<div
				className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 backdrop-blur-sm"
				ref={overlayRef}
				onClick={onOverlayClick}
			>
				<div
					className="relative flex max-h-svh flex-col gap-4 border-2 border-orange-800 bg-neutral-900 p-8"
					aria-modal="true"
					role="dialog"
				>
					<header className="flex items-start justify-between">
						<h1 className="text-center text-3xl font-bold">{title}</h1>
						<button
							className="mr-1 mt-1 flex items-center justify-center p-2 font-bold leading-3 text-orange-100 hover:text-orange-800"
							type="button"
							onClick={onClose}
							aria-label="Close modal"
						>
							close
						</button>
					</header>
					<div className="flex flex-col gap-2">{children}</div>
				</div>
			</div>
		);
}
