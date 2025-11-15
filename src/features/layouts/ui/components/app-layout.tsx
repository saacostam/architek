import { useAdapters } from "@/shared/adapters/core/app";
import { RouteName } from "@/shared/adapters/navigation/domain";
import { Logo } from "@/shared/components";
import { Container, Flex } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";
import { Link } from "react-router";

export function AppLayout({
    children,
}: PropsWithChildren) {
    const { navigationAdapter } = useAdapters();

    return <Flex direction="column" gap="4">
        <Container p="4">
            <Flex>
                <Link className="clean-link" to={navigationAdapter.generateRoute({ name: RouteName.HOME })}>
                    <Logo />
                </Link>
            </Flex>
        </Container>
        <Container>
            {children}
        </Container>
    </Flex>
}
