import { Flex, Skeleton } from "@radix-ui/themes";

export function GenericScreenSkeleton() {
	return (
		<Flex direction="column" gap="4" data-testid="generic-screen-skeleton">
			<Skeleton height="32px" width="256px" mx="auto" />
			<Skeleton height="128px" width="100%" />
			<Skeleton height="64px" width="100%" />
			<Skeleton height="128px" width="100%" />
		</Flex>
	);
}
