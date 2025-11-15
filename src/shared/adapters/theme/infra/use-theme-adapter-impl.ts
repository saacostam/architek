import { useEffect, useMemo, useState } from "react";
import type { IThemeAdapter } from "../domain";

const KEY = "my-theme-mode";

function loadStoredTheme(): IThemeAdapter["theme"] {
	if (typeof window === "undefined") return "light";
	const saved = localStorage.getItem(KEY);
	return saved === "light" || saved === "dark" ? saved : "light";
}

function storeTheme(theme: IThemeAdapter["theme"]) {
	try {
		localStorage.setItem(KEY, theme);
	} catch {
		// continue
	}
}

export function useThemeAdapterImpl(): IThemeAdapter {
	const [theme, setTheme] = useState<IThemeAdapter["theme"]>(() =>
		loadStoredTheme(),
	);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		storeTheme(theme);
	}, [theme]);

	return useMemo(() => ({ theme, setTheme }), [theme]);
}
