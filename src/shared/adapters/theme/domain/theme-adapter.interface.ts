export type ITheme = "dark" | "light";

export interface IThemeAdapter {
	theme: ITheme;
	setTheme: (them: ITheme) => void;
}
