import { useAdapters } from "@/shared/adapters/core/app";
import { RouteName } from "@/shared/adapters/navigation/domain";
import { Logo } from "@/shared/components";
import { Flex } from "@radix-ui/themes";
import { Link } from "react-router";

export function Navbar() {
    const { navigationAdapter } = useAdapters();

    return <div style={{ backgroundColor: "var(--accent-3)", borderBottom: "1px solid var(--accent-6)" }}>
        <Flex p="4">
            <Link className="clean-link" to={navigationAdapter.generateRoute({ name: RouteName.HOME })}>
                <Logo />
            </Link>
        </Flex>
    </div>
}
