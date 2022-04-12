import { useEffect } from "react";

const useOnClickOutside = (
	ref: any,
	toggler: Function,
	excepnClassName?: String
) => {
	useEffect(() => {
		const listener = (event: any) => {
			console.log();
			if (
				!ref.current ||
				ref.current.contains(event.target) ||
				event.target.className === excepnClassName ||
				event.target.className.animVal === excepnClassName
			) {
				return;
			}
			toggler(false);
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, toggler]);
};

export default useOnClickOutside;
