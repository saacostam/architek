import { Container, Flex } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";
import { Navbar } from "./navbar";

export function AppLayout({
    children,
}: PropsWithChildren) {
    return <Flex direction="column" gap="4">
        <Navbar />
        <Container>
            {children}
        </Container>
    </Flex>
}
