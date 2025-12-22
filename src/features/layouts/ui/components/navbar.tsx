import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { useCallback } from "react";
import { Link } from "react-router";
import { useAdapters } from "@/shared/adapters/core/app";
import { RouteName } from "@/shared/adapters/navigation/domain";
import { Logo } from "@/shared/components";
import { MoonIcon, SunIcon } from "@/shared/icons";

export function Navbar() {
	const { navigationAdapter, themeAdapter } = useAdapters();

	const onSwitchTheme = useCallback(() => {
		themeAdapter.setTheme(themeAdapter.theme === "light" ? "dark" : "light");
	}, [themeAdapter]);

	return (
		<div
			style={{
				backgroundColor: "var(--accent-1)",
				borderBottom: "1px solid var(--gray-6)",
			}}
		>
			<Flex p="3" justify="between">
				<Link
					className="clean-link"
					to={navigationAdapter.generateRoute({ name: RouteName.HOME })}
				>
					<Logo />
				</Link>
				<Flex align="center">
					<Tooltip content="Toggle Theme">
						<IconButton onClick={onSwitchTheme} variant="ghost">
							{themeAdapter.theme === "dark" ? (
								<SunIcon height={24} width={24} />
							) : (
								<MoonIcon height={24} width={24} />
							)}
						</IconButton>
					</Tooltip>
				</Flex>
			</Flex>
		</div>
	);
}
