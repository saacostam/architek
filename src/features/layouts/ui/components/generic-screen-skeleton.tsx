import { Flex, Skeleton } from "@radix-ui/themes";

export function GenericScreenSkeleton() {
    return <Flex direction="column" gap="4">
        <Skeleton height="32px" width="256px"/>
        <Skeleton height="128px" width="100%"/>
        <Skeleton height="64px" width="100%"/>
        <Skeleton height="128px" width="100%"/>
    </Flex>
}
