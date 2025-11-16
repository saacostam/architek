import { Heading, type HeadingProps } from "@radix-ui/themes";

export type HeaderProps = HeadingProps;

export function Header(props: HeaderProps) {
	const { style, ...rest } = props;

	return (
		<Heading
			size="6"
			{...rest}
			style={{ color: "var(--accent-11)", ...style }}
		/>
	);
}

export function SubHeader(props: HeaderProps) {
	const { style, ...rest } = props;

	return (
		<Heading
			size="5"
			{...rest}
			style={{ color: "var(--accent-11)", ...style }}
		/>
	);
}
