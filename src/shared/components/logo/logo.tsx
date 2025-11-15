import { Flex, Heading } from "@radix-ui/themes";

export function Logo() {
	return (
		<Flex align="center" direction="row" gap="2">
			<img src="icon-192.png" height="24" width="24" alt="Logo" />
			<Heading style={{ color: "var(--accent-11)" }}>Architek</Heading>
		</Flex>
	);
}
