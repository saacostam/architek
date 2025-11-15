import { useAdapters } from "@/shared/adapters/core/app";
import { RouteName } from "@/shared/adapters/navigation/domain";
import { Logo } from "@/shared/components";
import { MoonIcon, SunIcon } from "@/shared/icons";
import { Flex, IconButton } from "@radix-ui/themes";
import { useCallback } from "react";
import { Link } from "react-router";

export function Navbar() {
    const { navigationAdapter, themeAdapter } = useAdapters();

    const onSwitchTheme = useCallback(() => {
        themeAdapter.setTheme(
            themeAdapter.theme === "light" ? "dark" : "light",
        )
    }, [themeAdapter]);

    return <div style={{ backgroundColor: "var(--accent-1)", borderBottom: "1px solid var(--gray-6)" }}>
        <Flex p="4" justify="between">
            <Link className="clean-link" to={navigationAdapter.generateRoute({ name: RouteName.HOME })}>
                <Logo />
            </Link>
            <Flex align="center">
                <IconButton
                    onClick={onSwitchTheme}
                    variant="ghost"
                >
                    {
                        themeAdapter.theme === "light"
                            ? <SunIcon height={24} width={24}/>
                            : <MoonIcon height={24} width={24}/>
                    }
                </IconButton>
            </Flex>
        </Flex>
    </div>
}
