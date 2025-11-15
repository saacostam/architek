import { Container, Flex } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";
import { Navbar } from "./navbar";

export function AppLayout({
    children,
}: PropsWithChildren) {
    return <Flex direction="column" gap="4" style={{ backgroundColor: "var(--accent-2)", minHeight: "100vh" }}>
        <Navbar />
        <Container px="4">
            {children}
        </Container>
    </Flex>
}
